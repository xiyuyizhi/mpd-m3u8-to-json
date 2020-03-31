export const dash1 = `
<?xml version="1.0" encoding="UTF-8"?>
<MPD xmlns="urn:mpeg:dash:schema:mpd:2011" \
 profiles="urn:mpeg:dash:profile:isoff-live:2011" \ 
 type="static" mediaPresentationDuration="PT6M16S" \ 
 minBufferTime="PT1.97S">
  <Period>
    <AdaptationSet mimeType="audio/mp4" segmentAlignment="true" startWithSAP="1" lang="und">
      <ContentProtection cenc:default_KID="08e36702-8f33-436c-a5dd-60ffe5571e60" schemeIdUri="urn:mpeg:dash:mp4protection:2011" value="cenc" xmlns:cenc="urn:mpeg:cenc:2013"></ContentProtection>
      <ContentProtection schemeIdUri="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed">
        <Test>
          <Test1>lllll</Test1>
        </Test>
      </ContentProtection>
      <ContentProtection schemeIdUri="urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95">
        <mspr:pro>mgIAAAEAAQCQAjwAVwBSAE0ASABFAEEARABFAFIAIAB4AG0AbABuAHMAPQAiAGgAdAB0AHAAOgAvAC8AcwBjAGgAZQBtAGEAcwAuAG0AaQBjAHIAbwBzAG8AZgB0AC4AYwBvAG0ALwBEAFIATQAvADIAMAAwADcALwAwADMALwBQAGwAYQB5AFIAZQBhAGQAeQBIAGUAYQBkAGUAcgAiACAAdgBlAHIAcwBpAG8AbgA9ACIANAAuADAALgAwAC4AMAAiAD4APABEAEEAVABBAD4APABQAFIATwBUAEUAQwBUAEkATgBGAE8APgA8AEsARQBZAEwARQBOAD4AMQA2ADwALwBLAEUAWQBMAEUATgA+ADwAQQBMAEcASQBEAD4AQQBFAFMAQwBUAFIAPAAvAEEATABHAEkARAA+ADwALwBQAFIATwBUAEUAQwBUAEkATgBGAE8APgA8AEsASQBEAD4AQQBtAGYAagBDAFQATwBQAGIARQBPAGwAMwBXAEQALwA1AG0AYwBlAGMAQQA9AD0APAAvAEsASQBEAD4APABDAEgARQBDAEsAUwBVAE0APgBCAEcAdwAxAGEAWQBaADEAWQBYAE0APQA8AC8AQwBIAEUAQwBLAFMAVQBNAD4APABMAEEAXwBVAFIATAA+AGgAdAB0AHAAOgAvAC8AcABsAGEAeQByAGUAYQBkAHkALgBkAGkAcgBlAGMAdAB0AGEAcABzAC4AbgBlAHQALwBwAHIALwBzAHYAYwAvAHIAaQBnAGgAdABzAG0AYQBuAGEAZwBlAHIALgBhAHMAbQB4ADwALwBMAEEAXwBVAFIATAA+ADwALwBEAEEAVABBAD4APAAvAFcAUgBNAEgARQBBAEQARQBSAD4A</mspr:pro>
      </ContentProtection>
      <SegmentTemplate duration="1968" initialization="$RepresentationID$/audio/en/init.mp4" media="$RepresentationID$/audio/en/seg-$Number$.m4f" startNumber="0" timescale="1000"></SegmentTemplate>
      <Representation audioSamplingRate="44100" bandwidth="67095" codecs="mp4a.40.2" id="800"></Representation>
    </AdaptationSet>
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
    <AdaptationSet mimeType="text/vtt" lang="en">
      <Representation bandwidth="256" id="subtitle_en">
        <BaseURL>http://example.com/content/sintel/subtitles/subtitles_en.vtt</BaseURL>
      </Representation>
    </AdaptationSet>
  </Period>
</MPD>
`;

export const dash2 = `
<?xml version="1.0"?>
<MPD xmlns="urn:mpeg:dash:schema:mpd:2011" minBufferTime="PT1.500000S" type="static" mediaPresentationDuration="PT0H0M9.98S" profiles="urn:mpeg:dash:profile:full:2011">
 <ProgramInformation moreInformationURL="http://gpac.sourceforge.net">
  <Title>bipbop_dash.mpd handcrafted by JYA</Title>
 </ProgramInformation>
 <Period duration="PT0H0M9.98S">
  <AdaptationSet segmentAlignment="true" maxWidth="400" maxHeight="300" maxFrameRate="90000" par="4:3" lang="und">
   <Representation id="1" mimeType="video/mp4" codecs="avc1.4d4015" width="400" height="300" frameRate="90000" sar="1:1" startWithSAP="1" bandwidth="226425">
    <SegmentList timescale="90000" duration="69043">
     <Initialization sourceURL="bipbop_videoinit.mp4"/>
     <SegmentURL media="bipbop_video1.m4s"/>
     <SegmentURL media="bipbop_video2.m4s"/>
     <SegmentURL media="bipbop_video3.m4s"/>
     <SegmentURL media="bipbop_video4.m4s"/>
     <SegmentURL media="bipbop_video5.m4s"/>
     <SegmentURL media="bipbop_video6.m4s"/>
     <SegmentURL media="bipbop_video7.m4s"/>
     <SegmentURL media="bipbop_video8.m4s"/>
     <SegmentURL media="bipbop_video9.m4s"/>
     <SegmentURL media="bipbop_video10.m4s"/>
    </SegmentList>
   </Representation>
  </AdaptationSet>
  <AdaptationSet segmentAlignment="true" lang="und">
   <Representation id="1" mimeType="audio/mp4" codecs="mp4a.40.2" audioSamplingRate="22050" startWithSAP="1" bandwidth="7206">
    <AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2"/>
    <SegmentList timescale="22050" duration="20101">
     <Initialization sourceURL="bipbop_audioinit.mp4"/>
     <SegmentURL media="bipbop_audio1.m4s"/>
     <SegmentURL media="bipbop_audio2.m4s"/>
     <SegmentURL media="bipbop_audio3.m4s"/>
     <SegmentURL media="bipbop_audio4.m4s"/>
     <SegmentURL media="bipbop_audio5.m4s"/>
     <SegmentURL media="bipbop_audio6.m4s"/>
     <SegmentURL media="bipbop_audio7.m4s"/>
     <SegmentURL media="bipbop_audio8.m4s"/>
     <SegmentURL media="bipbop_audio9.m4s"/>
     <SegmentURL media="bipbop_audio10.m4s"/>
    </SegmentList>
   </Representation>
  </AdaptationSet>
 </Period>
</MPD>
`;

export const dash3 = `
<?xml version="1.0" encoding="utf-8"?>
<MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="urn:mpeg:dash:schema:mpd:2011"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xsi:schemaLocation="urn:mpeg:DASH:schema:MPD:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd"
	profiles="urn:mpeg:dash:profile:isoff-live:2011"
	type="static"
	mediaPresentationDuration="PT1H27M58.1S"
	minBufferTime="PT20.0S">
	<ProgramInformation>
	</ProgramInformation>
	<Period id="0" start="PT0.0S">
		<AdaptationSet id="0" contentType="video" segmentAlignment="true" bitstreamSwitching="true">
			<Representation id="0" mimeType="video/webm" codecs="vp09.00.40.08" bandwidth="2126100" width="1920" height="1080" frameRate="25/1">
				<BaseURL>chunk_stream0.webm</BaseURL>
				<SegmentList timescale="1000000" duration="10000000" startNumber="1">
					<Initialization range="0-482" />
					<SegmentURL mediaRange="483-2658107" t="60" d="10000" />
					<SegmentURL mediaRange="2658108-5233361" t="10060" d="10000" />
					<SegmentURL mediaRange="5233362-6525831" t="20060" d="10000" />
					<SegmentURL mediaRange="6525832-8867613" t="30060" d="10000" />
					<SegmentURL mediaRange="8867614-10494783" t="40060" d="10000" />
					<SegmentURL mediaRange="10494784-12009170" t="50060" d="10000" />
					<SegmentURL mediaRange="617078146-617885199" t="5270060" d="8160" />
				</SegmentList>
			</Representation>
		</AdaptationSet>
		<AdaptationSet id="1" contentType="audio" segmentAlignment="true" bitstreamSwitching="true" lang="und">
			<Representation id="1" mimeType="audio/mp4" codecs="mp4a.40.2" bandwidth="124316" audioSamplingRate="44100">
				<AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2" />
				<BaseURL>chunk_stream1.mp4</BaseURL>
				<SegmentList timescale="1000000" duration="10000000" startNumber="1">
					<Initialization range="0-740" />
					<SegmentURL mediaRange="741-158013" t="0" d="444416" />
					<SegmentURL mediaRange="158014-314694" indexRange="158014-158065" t="444416" d="440320" />
					<SegmentURL mediaRange="314695-427735" t="884736" d="441344" />
					<SegmentURL mediaRange="427736-584059" indexRange="427736-427787" t="1326080" d="441344" />
					<SegmentURL mediaRange="584060-741264" t="1767424" d="440320" />
					<SegmentURL mediaRange="741265-898117" indexRange="741265-741316" t="2207744" d="441344" />
					<SegmentURL mediaRange="898118-1056429" indexRange="898118-898169" t="2649088" d="441344" />
					<SegmentURL mediaRange="1056430-1214383" t="3090432" d="440320" />
					<SegmentURL mediaRange="1214384-1374227" indexRange="1214384-1214435" t="3530752" d="441344" />
					<SegmentURL mediaRange="1374228-1532927" t="3972096" d="441344" />
					<SegmentURL mediaRange="1532928-1689029" indexRange="1532928-1532979" t="4413440" d="440320" />
					<SegmentURL mediaRange="1689030-1845997" indexRange="1689030-1689081" t="4853760" d="441344" />
					<SegmentURL mediaRange="1845998-2005168" t="5295104" d="441344" />
					<SegmentURL mediaRange="82893509-83017637" t="232410112" d="361485" />
				</SegmentList>
			</Representation>
		</AdaptationSet>
	</Period>

	<clip_list>
		<clip>
			<start_ts_in_ms>60</start_ts_in_ms>
			<name>/data/tmp/beba3542d88c4a168931b6cbae612de2/28d24945fd4b6e4bf3c8397711e5104d.webm</name>
			<BaseURL>chunk_stream0.webm</BaseURL>
			<duration_in_ms>360000</duration_in_ms>
			<remote_path>http://data.video.com/videos/v0/20200203/d4/af/28d24945fd4b6e4bf3c8397711e5104d.webm?m=v&amp;dis_src=vrs&amp;rj=1&amp;qd_tvid=498189700&amp;qd_uid=1232334240&amp;qd_vip=1&amp;qd_src=01080031010000000000&amp;qd_tm=1585122151352&amp;qd_p=0&amp;qd_k=365199f4807a279e33875be41258492f&amp;ve=&amp;sgti=14_9c2cf25d9d5cc1d7793dc94de2ff9898_1585121365658&amp;dfp=&amp;qd_sc=1dc21865b919a7a45c3a880f924eb2cb</remote_path>
			<start_pos>0</start_pos>
			<end_pos>48177080</end_pos>
			<type>video</type>
			<size>48177081</size>
		</clip>
		<clip>
			<start_ts_in_ms>360060</start_ts_in_ms>
			<name>/data/tmp/beba3542d88c4a168931b6cbae612de2/c6ca764b050a50ac25178b5a3a44fe8c.webm</name>
			<BaseURL>chunk_stream0.webm</BaseURL>
			<duration_in_ms>360000</duration_in_ms>
			<remote_path>http://data.video.com/videos/v0/20200203/d4/af/c6ca764b050a50ac25178b5a3a44fe8c.webm?m=v&amp;dis_src=vrs&amp;rj=1&amp;qd_tvid=498189700&amp;qd_uid=1232334240&amp;qd_vip=1&amp;qd_src=01080031010000000000&amp;qd_tm=1585122151352&amp;qd_p=0&amp;qd_k=365199f4807a279e33875be41258492f&amp;ve=&amp;sgti=14_9c2cf25d9d5cc1d7793dc94de2ff9898_1585121365658&amp;dfp=&amp;qd_sc=797293d6667dd583eaa91b6bf27707ac</remote_path>
			<start_pos>48177081</start_pos>
			<end_pos>88974963</end_pos>
			<type>video</type>
			<size>40797883</size>
		</clip>
		<clip>
			<start_ts_in_ms>720060</start_ts_in_ms>
			<name>/data/tmp/beba3542d88c4a168931b6cbae612de2/619b40d6c3706766e5d1299f85b7f57a.webm</name>
			<BaseURL>chunk_stream0.webm</BaseURL>
			<duration_in_ms>360000</duration_in_ms>
			<remote_path>http://data.video.com/videos/v0/20200203/d4/af/619b40d6c3706766e5d1299f85b7f57a.webm?m=v&amp;dis_src=vrs&amp;rj=1&amp;qd_tvid=498189700&amp;qd_uid=1232334240&amp;qd_vip=1&amp;qd_src=01080031010000000000&amp;qd_tm=1585122151352&amp;qd_p=0&amp;qd_k=365199f4807a279e33875be41258492f&amp;ve=&amp;sgti=14_9c2cf25d9d5cc1d7793dc94de2ff9898_1585121365658&amp;dfp=&amp;qd_sc=c302fda938c8b6c023798c16352738c1</remote_path>
			<start_pos>88974964</start_pos>
			<end_pos>123885181</end_pos>
			<type>video</type>
			<size>34910218</size>
		</clip>
		<clip>
			<start_ts_in_ms>0</start_ts_in_ms>
			<name>/data/tmp/beba3542d88c4a168931b6cbae612de2/39e0840640d67c347e93db66430cf663.mp4</name>
			<BaseURL>chunk_stream1.mp4</BaseURL>
			<duration_in_ms>5278266</duration_in_ms>
			<remote_path>http://data.video.com/videos/v0/20200203/d4/af/39e0840640d67c347e93db66430cf663.mp4?m=v&amp;dis_src=vrs&amp;rj=1&amp;qd_tvid=498189700&amp;qd_uid=1232334240&amp;qd_vip=1&amp;qd_src=01080031010000000000&amp;qd_tm=1585122151352&amp;qd_p=0&amp;qd_k=365199f4807a279e33875be41258492f&amp;ve=&amp;sgti=14_9c2cf25d9d5cc1d7793dc94de2ff9898_1585121365658&amp;dfp=&amp;qd_sc=f6a6d924b9c58a7359f68b02c41c9419</remote_path>
			<start_pos>0</start_pos>
			<end_pos>83017637</end_pos>
			<type>audio</type>
			<size>83017638</size>
		</clip>
	</clip_list>
</MPD>
`;
