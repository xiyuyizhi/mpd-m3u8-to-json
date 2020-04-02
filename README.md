# mpd-m3u8-to-json

## install

```js

<script src="https://cdn.jsdelivr.net/npm/mpd-m3u8-to-json@0.1.2/libs/vparser.min.js"></script>
<script>
  VParser.m3u8Parser();
  VParser.mpdParser();
</script>

or

npm install mpd-m3u8-to-json
import {m3u8Parser,mpdParser} from "mpd-m3u8-to-json"

```

## m3u8Parser [test](./test/m3u8.spec.ts)

```ts
type AttrInfo = string | number | Array < string | number > | Object;

type TagInfo = {
  [propName : string]: AttrInfo;
  url?: string
}

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

type PostHooks = (x : TagInfo, y : M3u8JSON) => M3u8JSON

m3u8Parser(text : string, m3u8Url : string, postHooks?: PostHooks) : M3u8JSON

const m3u8 =`
#EXTM3U
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-TARGETDURATION:10
#EXT-X-VERSION:3
#EXTINF:9
1.ts
#EXTINF:9
2.ts
EXT-X-DISCONTINUITY
#EXTINF:3,
3.ts
#EXT-X-ENDLIST
`

m3u8Parser(m3u8,'https://a.b.c.com')

m3u8Parser(m3u8,'https://a.b.c.com',(tagInfo,result)=>{
  // do something with current parsed tag
  console.log(tagInfo);
  return result; // must return
})

```

## mpdParser [test](./test/dash.spec.ts)

```ts
type TagAttrs = {
  [PropName: string]: any
}

type TagInfo = {
  tagName?: string;
  attrs?: TagAttrs;
  closed?: boolean;
};

type MPDJSON = {
  [TagName: string]: any
}

type PostHooks = (tagName: string, attrs: TagAttrs) => TagAttrs

mpdParser(text: string, postHooks?: PostHooks): MPDJSON

const mpd = `
<AdaptationSet mimeType="video/mp4" scanType="progressive" segmentAlignment="true" startWithSAP="1">
      <SegmentTemplate duration="1968" initialization="$RepresentationID$/video/1/init.mp4" media="$RepresentationID$/video/1/seg-$Number$.m4f" startNumber="0" timescale="1000"></SegmentTemplate>
      <Representation bandwidth="1518664" codecs="avc1.4d401f" frameRate="30000/1001" height="540" id="800" width="960">
        <SegmentList timescale="90000" duration="69043">
          <Initialization sourceURL="bipbop_videoinit.mp4"/>
          <SegmentURL media="bipbop_video1.m4s"/>
          <SegmentURL media="bipbop_video2.m4s"/>
        </SegmentList>
      </Representation>
      <Representation bandwidth="1911775" codecs="avc1.4d401f" frameRate="30000/1001" height="576" id="1000" width="1024"></Representation>
      <Representation bandwidth="2295158" codecs="avc1.4d401f" frameRate="30000/1001" height="576" id="1200" width="1024"></Representation>
      <Representation bandwidth="2780732" codecs="avc1.4d401f" frameRate="30000/1001" height="720" id="1500" width="1280"></Representation>
    </AdaptationSet>
`

mpdParser(mpd);

mpdParser(mpd,(tagName,attrs)=>{
    if(tagName === 'segmentTemplate'){
        attrs.duration = parseFloat(attrs.duration)
    }
    if(tagName === 'xxxx'){
      //
    }
    return attrs // must return
})
```
