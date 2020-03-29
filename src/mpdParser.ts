type TagInfo = {
  tagName?: string,
  attrs?: any,
  closed?: boolean
}

const PREFIX_LINE_PATTERN = /\s*(<\/?[^>]+>)/;
const TAG_ATTR_PATTERN = /\s*(?:<\/?)?([^\s>]+)\s*([^>]+)*(?:\/?>)?/
const ATTR_PAIR_PATTERN = /\s*([^=]+)="([^"]+)"/g

function parseTag(tagStr) : TagInfo {
  let matched = tagStr.match(TAG_ATTR_PATTERN)
  let tag: TagInfo = {}

  // tag with attr or self closed tag
  if (matched && matched[2]) {
    let ret;
    let attrs = {};
    while ((ret = ATTR_PAIR_PATTERN.exec(matched[2])) != null) {
      attrs[ret[1]] = ret[2];
    }
    tag['tagName'] = matched[1];
    tag['attrs'] = attrs;
    tag['closed'] = /\/$/.test(matched[2]); // is self closed?
    return tag
  }

  if (!matched) 
    return null;
  
  if (/^<\//.test(matched[0])) {
    // closed tag
    tag['tagName'] = matched[1];
    tag['closed'] = true;
    return tag;
  }

  if (/^<(?!\/)/.test(matched[0])) {
    // start tag without attr
    tag['tagName'] = matched[1];
    return tag
  }

  // pure value
  tag['tageName'] = 'pureValue';
  tag['attrs'] = {
    value: matched[1]
  }
  tag['closed'] = true;
  return tag;
}

function mpdParser(text) {
  const tagList = text
    .split(PREFIX_LINE_PATTERN)
    .filter(Boolean)
    .map(tagStr => parseTag(tagStr))
    .filter(Boolean)
    .forEach(x => {
      console.log(x);
    });
}

export default mpdParser;

/**
 *
 * AdaptationSet
 * Representation
 * SegmentTemplate
 * ContentProtection
 * mspr:pro
 * ContentProtection
 * Test
 * Test1
 * lllll
 * ContentProtection
 */