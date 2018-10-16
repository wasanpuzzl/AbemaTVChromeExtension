//AbemaTVのページからなにか情報を取得する系の寄せ集め
import * as $ from "jquery";
import "./jquery-lib";

//URL判定
export const URL_SLOTPAGE = 0; //番組個別ページ
export const URL_DATETABLE = 1; //日付別番組表
export const URL_CHANNELTABLE = 2; //チャンネル別番組表
export const URL_ONAIR = 3; //放送ページ
export const URL_SEARCH = 4; //番組検索結果(未来)
export const URL_RESERVATION = 5; //公式の視聴予約一覧
export const URL_OTHER = -1; //その他

export function determineUrl(url?: string){
    url = url || location.href;
    if (/https:\/\/abema.tv\/channels\/[-a-z0-9]+\/slots\/[a-zA-Z\d]+/.test(url)) return URL_SLOTPAGE;
    else if (/^https:\/\/abema.tv\/timetable(?:$|\/dates\/.*)/.test(url)) return URL_DATETABLE;
    else if (/^https:\/\/abema.tv\/timetable\/channels\/.*/.test(url)) return URL_CHANNELTABLE;
    else if (/^https:\/\/abema.tv\/now-on-air\/.*/.test(url)) return URL_ONAIR;
    else if (/^https:\/\/abema.tv\/search\?q=.+/.test(url)) return URL_SEARCH;
    else if (/^https:\/\/abema.tv\/my\/lists\/reservation/.test(url)) return URL_RESERVATION;
    else return URL_OTHER;
}

//放送画面urlからチャンネル取得
export function getChannelByURL(url?: string) {
    return ((url||location.href).match(/https:\/\/abema\.tv\/now-on-air\/([-\w]+)/) || [null, null])[1];
}