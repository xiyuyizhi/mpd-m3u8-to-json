type TagInfo = {
  tagName?: string;
  attrs?: any;
  closed?: boolean;
};

const PREFIX_LINE_PATTERN = /\s*(<\/?[^>]+>)/;
const TAG_ATTR_PATTERN = /\s*(?:<\/?([^\s>]+))?\s*([^>]+)*(?:\/?>)?/;

const ATTR_PAIR_PATTERN = /\s*([^=]+)="([^"]+)"/g;

const formatName = tagName => {
  if (!tagName) return '';
  return tagName.charAt(0).toLowerCase() + tagName.slice(1);
};

function parseTag(tagStr): TagInfo {
  const matched = tagStr.match(TAG_ATTR_PATTERN);
  const tag: TagInfo = {};

  const tagName = formatName(matched && matched[1]);

  // tag or self closed tag that with attr
  if (matched && matched[1] && matched[2]) {
    let ret;
    let attrs = {};
    while ((ret = ATTR_PAIR_PATTERN.exec(matched[2])) != null) {
      attrs[ret[1]] = ret[2];
    }
    if (tagName === '?xml') return null;
    tag['tagName'] = tagName;
    tag['attrs'] = attrs;
    tag['closed'] = /\/$/.test(matched[2]); // is self closed?
    return tag;
  }

  if (!matched) return null;

  if (/^<\//.test(matched[0])) {
    // closed tag
    tag['tagName'] = tagName;
    tag['closed'] = true;
    return tag;
  }

  if (/^<(?!\/)/.test(matched[0])) {
    // start tag without attr
    tag['tagName'] = tagName;
    tag['attrs'] = {};
    return tag;
  }

  // pure value
  tag['tageName'] = 'pureValue';
  tag['attrs'] = {
    value: matched[2]
  };
  tag['closed'] = true;
  return tag;
}

function mergeTags(tagList) {
  const stack = [];
  const len = tagList.length;
  let current: TagInfo;
  let last: TagInfo;
  let lastPre: TagInfo;

  for (let i = 0; i < len; i++) {
    current = tagList[i];

    // start tag
    if (!current['closed']) {
      stack.push(current);
      continue;
    }

    last = stack.pop();

    if (current['tagName'] === 'pureValue') {
      last['attrs']
        ? (last['attrs']['value'] = current['attrs']['value'])
        : (last['attrs'] = current['attrs']);
      stack.push(last);
      continue;
    }

    if (last && last['tagName'] === current['tagName']) {
      lastPre = stack.pop();
    } else {
      // self closed tag
      lastPre = last;
      last = current;
    }

    if (!lastPre) {
      stack.push(last);
      break;
    }

    const { tagName, attrs } = last;
    const prop = lastPre['attrs'][tagName];

    if (prop) {
      lastPre['attrs'][tagName] = Array.isArray(prop)
        ? prop.concat(attrs)
        : [prop, attrs];
    } else {
      lastPre['attrs'][tagName] = attrs;
    }
    stack.push(lastPre);
  }

  let v = stack[0];

  if (!v) return null;

  if (v['tagName'] != 'undefined') {
    return {
      [v['tagName']]: v['attrs']
    };
  }

  return v['tagName'];
}

function mpdParser(text) {
  if (!text) {
    return { error: 1, msg: 'invalid input' };
  }

  try {
    return mergeTags(
      text
        .split(PREFIX_LINE_PATTERN)
        .filter(Boolean)
        .map(x => parseTag(x))
        .filter(Boolean)
    );
  } catch (e) {
    return { error: 1, msg: e.message };
  }
}

export default mpdParser;
