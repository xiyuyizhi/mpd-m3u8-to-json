type AttrInfo = string | number | Array < any > | Object;

type TagInfo = {
  [propName : string]: AttrInfo;
  url?: string
}

type PostHooks = Partial < {
  targetDuration: Function,
  mediaSequence: Function,
  inf: Function,
  streamInf: Function,
  url: Function,
  key: Function,
  media: Function,
  map: Function,
  discontinuity: Function,
  start: Function
} >;

type Segment = {
  start: number,
  end: number,
  duration: number,
  url: string,
  cc: number,
  sn: number,
  keyIndex?: number
}

type LevelM3u8 = {
  master: boolean,
  m3u8Url: string,
  duration: number,
  segments: Array < Segment >,
  startSN: number,
  endSN: number,
  live: boolean,
  key?: Array < any >
}

type Level = {
  m3u8Url: string,
  levelId: number,
  brandwidth?: number,
  codecs?: string,
  audio?: string,
  details?: LevelM3u8
}

type MasterM3u8 = {
  master: boolean,
  m3u8Url: string,
  medias: Array < any >,
  levels: Array < Level >,
  map?: {
    url: string
  }
}

type M3u8JSON = MasterM3u8 | LevelM3u8 | {
  error: 1,
  msg: string
};

const PREFIX_TAG_PATTERN = /EXT(?:-X-)?([^:]+):?(.*)$/;
const TAG_PAIR_SPLIT_PATTERN = /([^,="]+)((="[^"]+")|(=[^,]+))*/g;

function formatNameToCamel(str) {
  return str
    .split('-')
    .reduce((all, c) => {
      if (!all) {
        all += c.toLowerCase();
        return all;
      }

      all += c.charAt(0) + c
        .slice(1)
        .toLowerCase();

      return all;
    }, '')
}

function parseTag(tagStr, postHooks) : TagInfo {
  if(!(/^#EXT/.test(tagStr) || !(/^\s*#/.test(tagStr)))) 
    return null;
  
  let tagName;
  let attr;
  let matched = PREFIX_TAG_PATTERN.exec(tagStr);

  if (matched) {
    tagName = formatNameToCamel(matched[1]);
    attr = parseTagAttr(matched[2]);
  } else {
    tagName = 'url';
    attr = tagStr;
  }

  attr = postHooks && postHooks[tagName]
    ? postHooks[tagName](attr)
    : attr;

  return {[tagName]: attr}

}

function parseTagAttr(attrStr) : AttrInfo {
  if(!attrStr) 
    return null;
  
  let attrList = attrStr
    .match(TAG_PAIR_SPLIT_PATTERN)
    .map(pairStr => parseTagAttrPairs(pairStr))

    // tag with only one attr
    if (attrList.length === 1) 
      return attrList[0]

      // tag with multi not key=value attrs
    if (attrList.filter(x => typeof x === 'object').length === 0) {
      return attrList;
    }

    // tag with attrs that  format like key=value
    return attrList
    .reduce((all, c) => {
      return {
        ...all,
        ...c
      }
    }, {})

}

function parseTagAttrPairs(attrPairStr) : AttrInfo {
  /**
   * 15.0
   * METHOD=AES-128
   * URI="https://priv.example.com/key.php?r=52"
   * URI="data:text/plain;base64,AAAASnBzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAACoSEJ7zznHou8m2HbJCHvWfK10SEJ7zznHou8m2HbJCHvWfK11I88aJmwY="
   */

  let attrPairs = attrPairStr
    .trim()
    .replace('=', '|')
    .split('|');
  if (attrPairs.length == 2) {
    let key = formatNameToCamel(attrPairs[0])
    return {
      [key]: attrPairs[1].replace(/("|')/g, '')
    }
  }
  let v = parseFloat(attrPairs[0]);
  return Number.isNaN(v)
    ? attrPairs[0]
    : v;
}

function geneAbsUrl(url, base) {
  if (/^https?/.test(url) || /^data:/.test(url) || /^sdk:/.test(url)) {
    return url;
  }

  base = base
    .split("/")
    .slice(0, -1)

  url = url.split("/");
  while (url.length) {
    let c = url.shift();
    if (base.indexOf(c) == -1) {
      base.push(c)
    }
  }
  return base.join("/");
}

function mergeTags(tagList, result) {
  let master = result.master;
  let len = tagList.length;
  let cc = 0;
  let duration = 0;
  let startSN = 0;
  let segCount = 0;
  let levelCount = 0;
  let keyIndex = -1;

  for (let i = 0; i < len; i++) {
    let tagInfo = tagList[i];

    for (let key in tagInfo) {
      let v = tagInfo[key];
      if (v && v['uri']) {
        v['url'] = geneAbsUrl(v['uri'], result['m3u8Url']);
      }
      switch (key) {
        case "inf":
          // if contains human info?
          let segment = {
            start: duration,
            end: duration + (Array.isArray(v)
              ? v[0]
              : v),
            cc,
            sn: startSN + segCount
          };
          if (keyIndex >= 0) {
            segment['keyIndex'] = keyIndex;
          }
          segCount++;
          duration += v;
          result['segments'].push(segment);
          break;
        case "start":
          duration = v;
          break;
        case "discontinuity":
          cc++;
          break;
        case "mediaSequence":
          startSN = v;
          break;
        case "streamInf":
          levelCount++;
          v['levelId'] = levelCount;
          result['levels'].push(v);
          break;
        case "media":
          result['medias'].push(v);
          break;
        case "endlist":
          result['live'] = false;
          break;
        case "key":
          keyIndex++;
          if (result['key']) {
            result['key'].push(v);
          } else {
            result['key'] = [v];
          }
          break;
        case "url":
          let list = master
            ? result['levels']
            : result['segments'];

          if (!list.length) {
            throw new Error('invalid m3u8');
          }

          if (master) {
            list[levelCount - 1].url = geneAbsUrl(v, result['m3u8Url']);
          } else {
            list[segCount - 1].url = geneAbsUrl(v, result['m3u8Url'])
          }
          break;
        default:
          if (v) {
            result[key] = v;
          }
      }
    }

  }

  if (!master) {
    result['startSN'] = startSN;
    result['endSN'] = startSN + segCount - 1;
    result['duration'] = duration;
  }

  return result;

}

function m3u8Parser(text : string, m3u8Url : string, postHooks?: PostHooks | null) : M3u8JSON {
  if(!text || !m3u8Url) {
    return {error: 1, msg: "invalid input"}
  }

  const tagList = text
    .split("\n")
    .filter(Boolean)
    .map((x) => parseTag(x, postHooks))
    .filter(Boolean);

  if (!tagList.length) {
    return {error: 1, msg: "invalid m3u8"}
  }

  const isMaster = tagList
    .filter(x => !!x['streamInf'])
    .length !== 0;

  let result: M3u8JSON;

  if (isMaster) {
    result = {
      master: true,
      m3u8Url,
      levels: [],
      medias: []
    }
  } else {
    result = {
      master: false,
      m3u8Url,
      duration: 0,
      startSN: 0,
      endSN: 0,
      segments: [],
      live: true
    }
  }

  try {
    result = mergeTags(tagList, result);
  } catch (e) {
    return {error: 1, msg: e.message}
  }
  return result;
}

export default m3u8Parser;
