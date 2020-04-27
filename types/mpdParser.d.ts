declare type TagAttrs = {
    [PropName: string]: any;
};
declare type MPDJSON = {
    [TagName: string]: any;
};
declare type PostHooks = (tagName: string, attrs: TagAttrs) => TagAttrs;
declare function mpdParser(text: string, postHooks?: PostHooks): MPDJSON;
export default mpdParser;
