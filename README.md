# mpd-m3u8-to-json

## Usage

```js

<script src="https://cdn.jsdelivr.net/npm/mpd-m3u8-to-json@latest/libs/vparser.min.js"></script>

<script>
  window.VParser.m3u8Parser();
  window.VParser.mpdParser();
</script>

or

npm install mpd-m3u8-to-json
import {m3u8Parser,mpdParser} from "mpd-m3u8-to-json"

const ret = m3u8Parser(m3u8Text,m3u8Url,(tagInfo,result)=>{
    // options
    // do something with current parsing tag
    // xxxxxxx
    return result;
})

const ret = mpdParser(mpdText)

```
