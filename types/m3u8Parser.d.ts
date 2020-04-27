declare type AttrInfo = string | number | Array<string | number> | Object;
declare type TagInfo = {
    [propName: string]: AttrInfo;
    url?: string;
};
declare type Segment = {
    start: number;
    end: number;
    duration: number;
    url: string;
    cc: number;
    sn: number;
    keyIndex?: number;
};
declare type LevelM3u8 = {
    master: boolean;
    m3u8Url: string;
    duration: number;
    segments: Array<Segment>;
    startSN: number;
    endSN: number;
    live: boolean;
    key?: Array<any>;
};
declare type Level = {
    m3u8Url: string;
    levelId: number;
    brandwidth?: number;
    codecs?: string;
    audio?: string;
    details?: LevelM3u8;
};
declare type MasterM3u8 = {
    master: boolean;
    m3u8Url: string;
    medias: Array<any>;
    levels: Array<Level>;
    map?: {
        url: string;
    };
};
declare type M3u8JSON = MasterM3u8 | LevelM3u8 | {
    error: 1;
    msg: string;
};
declare type PostHooks = (x: TagInfo, y: M3u8JSON) => M3u8JSON;
declare function m3u8Parser(text: string, m3u8Url: string, postHooks?: PostHooks): M3u8JSON;
export default m3u8Parser;
