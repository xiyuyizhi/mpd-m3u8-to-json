const chai = require('chai');
import { mpdParser } from '../src/index';
import { dash1, dash2, dash3 } from './mocks/dash.data';
chai.should();

describe('#mpdParser', function() {
  const TAG_ATTR_PATTERN = /\s*(?:<\/?([^\s>]+))?\s*([^>]+)*(?:\/?>)?/;

  it('test tag attr parse', () => {
    let text1 = `<MPD xmlns="urn:mpeg:dash:schema:mpd:2011" \
    profiles="urn:mpeg:dash:profile:isoff-live:2011" \ 
    type="static" mediaPresentationDuration="PT6M16S" \ 
    minBufferTime="PT1.97S">`;
    let text2 = `</Period>`;
    let text3 = `<mspr:pro>`;
    let text4 = `<SegmentTemplate duration="1968" initialization="$RepresentationID$/video/1/init.mp4" media="$RepresentationID$/video/1/seg-$Number$.m4f" startNumber="0" timescale="1000">`;
    let text5 = `<ProgramInformation moreInformationURL="http://gpac.sourceforge.net">`;
    let text6 = `http://example.com/content/sintel/subtitles/subtitles_en.vtt`;
    let text7 = `<SegmentURL mediaRange="2658108-5233361" t="10060" d="10000" />`;
    let text8 = `/data/tm p/123.webm`;

    let m1 = text1.match(TAG_ATTR_PATTERN);
    m1[1]['should']['be'].equal('MPD');

    let m2 = text2.match(TAG_ATTR_PATTERN);
    m2[1]['should']['be'].equal('Period');
    chai.should().not.exist(m2[2]);

    let m3 = text3.match(TAG_ATTR_PATTERN);
    m3[1]['should']['be'].equal('mspr:pro');
    chai.should().not.exist(m3[2]);

    let m4 = text4.match(TAG_ATTR_PATTERN);
    m4[1]['should']['be'].equal('SegmentTemplate');
    m4[2]['should']['be'].equal(
      'duration="1968" initialization="$RepresentationID$/video/1/init.mp4" media="$Rep' +
        'resentationID$/video/1/seg-$Number$.m4f" startNumber="0" timescale="1000"'
    );

    let m5 = text5.match(TAG_ATTR_PATTERN);
    m5[1]['should']['be'].equal('ProgramInformation');
    m5[2]['should']['be'].equal(
      'moreInformationURL="http://gpac.sourceforge.net"'
    );

    let m6 = text6.match(TAG_ATTR_PATTERN);
    m6[2]['should']['be'].equal(
      'http://example.com/content/sintel/subtitles/subtitles_en.vtt'
    );
    chai.should().not.exist(m6[1]);

    let m7 = text7.match(TAG_ATTR_PATTERN);
    m7[1]['should']['be'].equal('SegmentURL');
    let len = m7[2].length;
    m7[2].charAt(len - 1).should.be.equal('/');

    let m8 = text8.match(TAG_ATTR_PATTERN);
    m8[2]['should']['be'].equal('/data/tm p/123.webm');
    chai.should().not.exist(m8[1]);
  });

  it('test partail tags merge', () => {
    let text = `<AdaptationSet mimeType="audio/mp4" segmentAlignment="true" startWithSAP="1" lang="und">
    <ContentProtection cenc:default_KID="08e36702-8f33-436c-a5dd-60ffe5571e60" schemeIdUri="urn:mpeg:dash:mp4protection:2011" value="cenc" xmlns:cenc="urn:mpeg:cenc:2013"></ContentProtection>
    <ContentProtection schemeIdUri="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed">
      <Test>
        <Test1>lllll</Test1>
      </Test>
    </ContentProtection>
    <SegmentTemplate duration="1968" initialization="$RepresentationID$/audio/en/init.mp4" media="$RepresentationID$/audio/en/seg-$Number$.m4f" startNumber="0" timescale="1000"></SegmentTemplate>
    <Representation audioSamplingRate="44100" bandwidth="67095" codecs="mp4a.40.2" id="800"></Representation>
  </AdaptationSet>`;

    let ret = mpdParser(text);

    ret['should']['have'].property('adaptationSet');
    ret['adaptationSet']['should']['have']
      .property('contentProtection')
      .length(2);
    ret['adaptationSet']['should']['have'].property('segmentTemplate');
    ret['adaptationSet']['should']['have'].property('representation');
  });

  it('test contains self closed tags', () => {
    let text = `
    <AdaptationSet mimeType="video/mp4" scanType="progressive" segmentAlignment="true" startWithSAP="1">
      <ContentProtection cenc:default_KID="08e36702-8f33-436c-a5dd-60ffe5571e60" schemeIdUri="urn:mpeg:dash:mp4protection:2011" value="cenc" xmlns:cenc="urn:mpeg:cenc:2013"></ContentProtection>
      <ContentProtection schemeIdUri="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"></ContentProtection>
      <ContentProtection schemeIdUri="urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95">
        <mspr:pro>mgIAAAEAAQCQAjwAVwBSAE0ASABFAEEARABFAFIAIAB4AG0AbABuAHMAPQAiAGgAdAB0AHAAOgAvAC8AcwBjAGgAZQBtAGEAcwAuAG0AaQBjAHIAbwBzAG8AZgB0AC4AYwBvAG0ALwBEAFIATQAvADIAMAAwADcALwAwADMALwBQAGwAYQB5AFIAZQBhAGQAeQBIAGUAYQBkAGUAcgAiACAAdgBlAHIAcwBpAG8AbgA9ACIANAAuADAALgAwAC4AMAAiAD4APABEAEEAVABBAD4APABQAFIATwBUAEUAQwBUAEkATgBGAE8APgA8AEsARQBZAEwARQBOAD4AMQA2ADwALwBLAEUAWQBMAEUATgA+ADwAQQBMAEcASQBEAD4AQQBFAFMAQwBUAFIAPAAvAEEATABHAEkARAA+ADwALwBQAFIATwBUAEUAQwBUAEkATgBGAE8APgA8AEsASQBEAD4AQQBtAGYAagBDAFQATwBQAGIARQBPAGwAMwBXAEQALwA1AG0AYwBlAGMAQQA9AD0APAAvAEsASQBEAD4APABDAEgARQBDAEsAUwBVAE0APgBCAEcAdwAxAGEAWQBaADEAWQBYAE0APQA8AC8AQwBIAEUAQwBLAFMAVQBNAD4APABMAEEAXwBVAFIATAA+AGgAdAB0AHAAOgAvAC8AcABsAGEAeQByAGUAYQBkAHkALgBkAGkAcgBlAGMAdAB0AGEAcABzAC4AbgBlAHQALwBwAHIALwBzAHYAYwAvAHIAaQBnAGgAdABzAG0AYQBuAGEAZwBlAHIALgBhAHMAbQB4ADwALwBMAEEAXwBVAFIATAA+ADwALwBEAEEAVABBAD4APAAvAFcAUgBNAEgARQBBAEQARQBSAD4A</mspr:pro>
      </ContentProtection>
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
    `;

    let ret = mpdParser(text);

    ret['should']['have'].property('adaptationSet');
    ret['adaptationSet']['should']['have']
      .property('contentProtection')
      .length(3);
    ret['adaptationSet']['should']['have'].property('representation').length(4);
    ret['adaptationSet']['representation'][0]['should']['have'].property(
      'segmentList'
    );
    ret['adaptationSet']['representation'][0]['segmentList']['should']['have']
      .property('segmentURL')
      .length(2);
    ret[
      'adaptationSet'
    ].representation[0].segmentList.segmentURL[0].media.should.be.equal(
      'bipbop_video1.m4s'
    );
  });

  it('test parse', () => {
    let ret = mpdParser(dash1);
    let ret2 = mpdParser(dash2);
    let ret3 = mpdParser(dash3);
    ret['mPD']['period']['should']['have'].property('adaptationSet').length(3);
    ret2['mPD']['period']['should']['have'].property('adaptationSet').length(2);
    ret2['mPD']['period']['adaptationSet'][0]['representation']['segmentList'][
      'should'
    ]['have']
      .property('segmentURL')
      .length(10);
    ret3['mPD']['clip_list']['should']['have'].property('clip').length(4);
  });
});
