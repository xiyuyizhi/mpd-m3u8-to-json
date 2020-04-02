type TagAttrs = {
  [PropName: string]: any;
};

type TagInfo = {
  tagName?: string;
  attrs?: TagAttrs;
  closed?: boolean;
};

type MPDJSON = {
  [TagName: string]: any;
};

type PostHooks = (tagName: string, attrs: TagAttrs) => TagAttrs;

const PREFIX_LINE_PATTERN = /\s*(<\/?[^>]+>)/;
const TAG_ATTR_PATTERN = /\s*(?:<\/?([^\s>]+))?\s*([^>]+)*(?:\/?>)?/;

const ATTR_PAIR_PATTERN = /\s*([^=]+)="([^"]+)"/g;

const formatName = tagName => {
  if (!tagName) return '';

  return tagName.split('_').reduce((all, c) => {
    if (!all) {
      all = c.charAt(0).toLowerCase() + c.slice(1);
      return all;
    }
    all += c.charAt(0).toUpperCase() + c.slice(1);
    return all;
  }, '');
};

function parseTag(tagStr): TagInfo {
  const matched = tagStr.match(TAG_ATTR_PATTERN);
  const tag: TagInfo = {};

  const tagName = formatName(matched && matched[1]);

  // <TagName xx=xx xxx=xxx>
  // <TagName xx=xxx xx=xxx />
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

  // </TagName>
  if (/^<\//.test(matched[0])) {
    tag['tagName'] = tagName;
    tag['closed'] = true;
    return tag;
  }

  // <TagName>
  if (/^</.test(matched[0])) {
    tag['tagName'] = tagName;
    tag['attrs'] = {};
    return tag;
  }

  // pure value
  tag['tagName'] = 'pureValue';
  tag['attrs'] = {
    value: matched[2]
  };
  tag['closed'] = true;
  return tag;
}

function mergeTags(tagList, postHooks: PostHooks) {
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

    let { tagName, attrs } = last;
    const prop = lastPre['attrs'][tagName];

    // custom handler
    if (postHooks) {
      attrs = postHooks(tagName, attrs);
    }

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

function mpdParser(text: string, postHooks?: PostHooks): MPDJSON {
  if (!text) {
    return { error: 1, msg: 'invalid input' };
  }

  try {
    return mergeTags(
      text
        .split(PREFIX_LINE_PATTERN)
        .filter(Boolean)
        .map(x => parseTag(x))
        .filter(Boolean),
      postHooks
    );
  } catch (e) {
    return { error: 1, msg: e.message };
  }
}

export default mpdParser;
