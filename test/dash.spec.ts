const chai = require('chai');
import {mpdParser} from '../src/index';
import {dash1} from "./mocks/dash.data"
chai.should();

describe('#mpdParser', function () {

  const TAG_ATTR_PATTERN = /\s*(?:<\/?)?([^\s>]+)\s*([^>]+)*(?:\/?>)?/

  it("test tag_attr_pattern", () => {

    let text1 = `<MPD xmlns="urn:mpeg:dash:schema:mpd:2011" \
    profiles="urn:mpeg:dash:profile:isoff-live:2011" \ 
    type="static" mediaPresentationDuration="PT6M16S" \ 
    minBufferTime="PT1.97S">`
    let text2 = `</Period>`
    let text3 = `<mspr:pro>`
    let text4 = `<SegmentTemplate duration="1968" initialization="$RepresentationID$/video/1/init.mp4" media="$RepresentationID$/video/1/seg-$Number$.m4f" startNumber="0" timescale="1000">`
    let text5 = `<ProgramInformation moreInformationURL="http://gpac.sourceforge.net">`
    let text6 = `http://example.com/content/sintel/subtitles/subtitles_en.vtt`
    let text7 = `<SegmentURL mediaRange="2658108-5233361" t="10060" d="10000" />`
    let text8 = `/data/tmp/123.webm
    `

    let m1 = text1.match(TAG_ATTR_PATTERN);
    m1[1]['should']['be'].equal("MPD");

    let m2 = text2.match(TAG_ATTR_PATTERN);
    m2[1]['should']['be'].equal("Period");
    chai
      .should()
      .not
      .exist(m2[2]);

    let m3 = text3.match(TAG_ATTR_PATTERN);
    m3[1]['should']['be'].equal("mspr:pro");
    chai
      .should()
      .not
      .exist(m3[2]);

    let m4 = text4.match(TAG_ATTR_PATTERN);
    m4[1]['should']['be'].equal("SegmentTemplate")
    m4[2]['should']['be'].equal('duration="1968" initialization="$RepresentationID$/video/1/init.mp4" media="$Rep' +
        'resentationID$/video/1/seg-$Number$.m4f" startNumber="0" timescale="1000"')

    let m5 = text5.match(TAG_ATTR_PATTERN);
    m5[1]['should']['be'].equal("ProgramInformation")
    m5[2]['should']['be'].equal('moreInformationURL="http://gpac.sourceforge.net"')

    let m6 = text6.match(TAG_ATTR_PATTERN);
    m6[1]['should']['be'].equal('http://example.com/content/sintel/subtitles/subtitles_en.vtt')
    chai
      .should()
      .not
      .exist(m6[2]);

    let m7 = text7.match(TAG_ATTR_PATTERN);
    m7[1]['should']['be'].equal('SegmentURL')
    let len = m7[2].length;
    m7[2]
      .charAt(len - 1)
      .should
      .be
      .equal('/')

    let m8 = text8.match(TAG_ATTR_PATTERN);
    m8[1]['should']['be'].equal('/data/tmp/123.webm')
    chai
      .should()
      .not
      .exist(m8[2]);

  })

  it('test base parse', () => {

    mpdParser(dash1)

  });
});
