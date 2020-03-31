// https://tools.ietf.org/html/rfc8216

export const m3u1 = `
#EXTM3U
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-TARGETDURATION:10
#EXT-X-VERSION:3
#EXTINF:9
http://media.example.com/first.ts
#EXTINF:9
http://media.example.com/second.ts
#EXTINF:3,
http://media.example.com/third.ts
#EXT-X-ENDLIST
`;

export const m3u2 = `
#EXTM3U
#EXT-X-TARGETDURATION:10
#EXT-X-VERSION:3
#EXTINF:9,humaninfo
http://media.example.com/1.ts
#EXTINF:9,
http://media.example.com/2.ts
EXT-X-DISCONTINUITY
#EXTINF:9,
http://media.example.com/3.ts
#EXTINF:9,
http://media.example.com/4.ts
EXT-X-DISCONTINUITY
#EXTINF:9,
http://media.example.com/5.ts
#EXT-X-ENDLIST
`;

export const m3u3 = `
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:8
#EXT-X-MEDIA-SEQUENCE:2680
#EXT-X-START:20
#EXTINF:7,
https://priv.example.com/fileSequence2680.ts
#EXTINF:7,
https://priv.example.com/fileSequence2681.ts
#EXTINF:7,
https://priv.example.com/fileSequence2682.ts
`;

export const m3u4 = `
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:8
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-START:20
#EXTINF:7,
/b/c/1.ts
#EXTINF:7,
/c/2.ts
#EXTINF:7,
3.ts
#EXT-X-ENDLIST
`;

export const m3u5 = `
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:7794
#EXT-X-TARGETDURATION:15

#EXT-X-KEY:METHOD=AES-128,URI="key.key"

#EXTINF:2.833,
http://media.example.com/fileSequence52-A.ts
#EXTINF:15.0,
http://media.example.com/fileSequence52-B.ts
#EXTINF:13.333,
http://media.example.com/fileSequence52-C.ts

#EXT-X-KEY:METHOD=AES-128,URI="key1.key"

#EXTINF:15.0,
http://media.example.com/fileSequence53-A.ts
#EXT-X-ENDLIST
`;

export const m3u6 = `
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:7794
#EXT-X-TARGETDURATION:15

#EXT-X-KEY:METHOD=AES-128,URI="key.key"

#EXTINF:2.833,
http://media.example.com/fileSequence52-A.ts
#EXTINF:15.0,
http://media.example.com/fileSequence52-B.ts
#EXTINF:13.333,
http://media.example.com/fileSequence52-C.ts

#EXT-X-KEY:METHOD=SAMPLE-AES,URI="data:text/plain;base64,AAAASnBzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAACoSEJ7zznHou8m2HbJCHvWfK10SEJ7zznHou8m2HbJCHvWfK11I88aJmwY=",KEYID=0x9EF3CE71E8BBC9B61DB2421EF59F2B5D,IV=0x6EEF9FC1130C50AAC78FA573C9117C5C,KEYFORMATVERSIONS="1",KEYFORMAT="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"

#EXTINF:15.0,
http://media.example.com/fileSequence53-A.ts
#EXT-X-ENDLIST
`;

export const m3u7 = `
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=1280000,AVERAGE-BANDWIDTH=1000000
http://example.com/low.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2560000,AVERAGE-BANDWIDTH=2000000
http://example.com/mid.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=7680000,AVERAGE-BANDWIDTH=6000000
http://example.com/hi.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=65000,CODECS="mp4a.40.5"
http://example.com/audio-only.m3u8
`;

export const m3u8 = `
#EXTM3U
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="aac",NAME="English", \
    DEFAULT=YES,AUTOSELECT=YES,LANGUAGE="en", \
    URI="main/english-audio.m3u8"
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="aac",NAME="Deutsch", \
    DEFAULT=NO,AUTOSELECT=YES,LANGUAGE="de", \
    URI="main/german-audio.m3u8"
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="aac",NAME="Commentary", \
    DEFAULT=NO,AUTOSELECT=NO,LANGUAGE="en", \
    URI="commentary/audio-only.m3u8"
#EXT-X-STREAM-INF:BANDWIDTH=1280000,CODECS="...",AUDIO="aac"
low/video-only.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2560000,CODECS="...",AUDIO="aac"
mid/video-only.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=7680000,CODECS="...",AUDIO="aac"
hi/video-only.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=65000,CODECS="mp4a.40.5",AUDIO="aac"
main/english-audio.m3u8
`;

export const m3u9 = `
#EXTM3U
#EXT-X-VERSION:6
## Generated with https://github.com/google/shaka-packager version 5d80895-release
#EXT-X-TARGETDURATION:11
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-MAP:URI="http://media.example.com/video_init.mp4"
#EXTINF:10.000,
http://media.example.com/1.mp4
#EXTINF:10.000,
http://media.example.com/2.mp4
#EXTINF:10.000,
http://media.example.com/3.mp4
#EXT-X-KEY:METHOD=SAMPLE-AES,URI="data:text/plain;base64,AAAASnBzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAACoSEJ7zznHou8m2HbJCHvWfK10SEJ7zznHou8m2HbJCHvWfK11I88aJmwY=",KEYID=0x9EF3CE71E8BBC9B61DB2421EF59F2B5D,IV=0x6EEF9FC1130C50AAC78FA573C9117C5C,KEYFORMATVERSIONS="1",KEYFORMAT="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"
#EXT-X-KEY:METHOD=SAMPLE-AES,URI="skd://9ef3ce71e8bbc9b61db2421ef59f2b5d",KEYFORMATVERSIONS="1",KEYFORMAT="com.apple.streamingkeydelivery"
#EXTINF:10.000,
http://media.example.com/4.mp4
#EXT-X-ENDLIST
`;
