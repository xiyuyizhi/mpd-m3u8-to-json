const chai = require('chai');
import {m3u8Parser} from '../src/index';
import {
  m3u1,
  m3u2,
  m3u3,
  m3u4,
  m3u5,
  m3u6,
  m3u7,
  m3u8,
  m3u9
} from './mocks/hls.data';

chai.should();

describe('#m3u8Parser', function () {

  let ret;

  it('test base parse', () => {
    ret = m3u8Parser(m3u1, 'http://a.b.com/index.m3u8')

    ret['master']['should']['be'].equal(false)
    ret['live']['should']['be'].equal(false)
    ret['segments']['length']['should']['be'].equal(3)
    ret['endSN']['should']['be'].equal(2)
    ret['duration']['should']['be'].equal(21)

  });

  it('test bad case', () => {

    ret = m3u8Parser("123", 'http://a.b.com/index.m3u8');
    ret['error']
      .should
      .be
      .equal(1);

    ret = m3u8Parser("#123", '');
    ret['msg']
      .should
      .be
      .equal('invalid input');

    ret = m3u8Parser("#123 \n ##ffff \n 123", 'http://a.b.com/index.m3u8')
    ret['msg']
      .should
      .be
      .equal('invalid m3u8');
  })

  it('test with discontinuity tag', () => {
    ret = m3u8Parser(m3u2, 'http://a.b.com/index.m3u8')

    ret['duration']['should']['be'].equal(45)
    ret['segments']['length']['should']['be'].equal(5)
    ret['segments']['1']['cc']['should']['be'].equal(0)
    ret['segments']['2']['cc']['should']['be'].equal(1)
    ret['segments']['3']['cc']['should']['be'].equal(1)
    ret['segments']['4']['cc']['should']['be'].equal(2)
  })

  it('test live parse', () => {
    ret = m3u8Parser(m3u3, 'http://a.b.com/index.m3u8')

    ret['live']['should']['be'].equal(true)
    ret['startSN']['should']['be'].equal(2680)
    ret['segments'][0]['start']['should']['be'].equal(20)
    ret['duration']['should']['be'].equal(41)

  })

  it('test segment with relative url', () => {
    ret = m3u8Parser(m3u4, 'http://a.b.com/a/b/c/index.m3u8')
    ret['segments'][0]['url']['should']['be'].equal('http://a.b.com/a/b/c/1.ts')
    ret['segments'][1]['url']['should']['be'].equal('http://a.b.com/a/b/c/2.ts')
    ret['segments'][2]['url']['should']['be'].equal('http://a.b.com/a/b/c/3.ts')
  })

  it('test m3u8 encryted with aes-128', () => {
    ret = m3u8Parser(m3u5, 'http://a.b.com/index.m3u8');
    ret['should']['have'].property("key")
    ret['key']['length']['should']['be'].equal(2)
    ret['key'][0]['url']['should']['be'].equal('http://a.b.com/key.key')
    ret['key'][1]['url']['should']['be'].equal('http://a.b.com/key1.key')
    ret['segments'][2]['keyIndex']['should']['be'].equal(0)
    ret['segments'][3]['keyIndex']['should']['be'].equal(1)
  })

  it('test m3u8 encryted with sample-aes', () => {
    ret = m3u8Parser(m3u6, 'http://a.b.com/index.m3u8')
    ret['key']['length']['should']['be'].equal(2)
  })

  it('test base master m3u8', () => {
    ret = m3u8Parser(m3u7, 'http://a.b.com/index.m3u8')
    ret['medias']['length']['should']['be'].equal(0)
    ret['levels']['length']['should']['be'].equal(4)

  })

  it('test master m3u8 with alter media track', () => {
    ret = m3u8Parser(m3u8, 'http://a.b.com/index.m3u8')
    ret['medias']['length']['should']['be'].equal(3)
  })

  it('test m3u8 with init metadata info', () => {
    ret = m3u8Parser(m3u9, 'http://a.b.com/index.m3u8')
    ret['should']['have'].property("map")
  })

});
