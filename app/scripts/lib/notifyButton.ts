//通知ボタン関連
//このファイルはまだ不完全で未使用(移行準備中)
import * as dl from './dom-lib';
import * as gl from './generic-lib';
import * as gdl from './generic-dom-lib';
import * as getInfo from './getAbemaInfo';

let notifyButtonData: {[key: string]: {
    channel: string,
    channelName: string,
    programID: string,
    programTitle: string,
    programTime: number,
    notifyTime: number,
    type?: string
}} = {}; //通知登録ボタンの番組情報格納

//拡張機能通知登録済みの番組に背景をつける
export function setRegistProgsBackground(){
    gl.getStorage(null, function(values){
        var programIDs: string[] = [];
        for (var key in values) {
            if (key.indexOf("progNotify")==0) {//通知登録データ
                programIDs.push(values[key].programID);
                //登録済みなのでclass追加
                $('#'+values[key].programID).closest('article').addClass('registeredProgs');
            }
        }
        //登録されてないのに背景がついてる番組のclass解除
        $('.registeredProgs').each(function(){
            var article = $(this);
            var progID = article.find('input[type=checkbox]').attr('id');
            if(!gl.hasArray(programIDs, progID)){
                article.removeClass('registeredProgs');
            }
        });
    });
}
function putNotifyButtonElement(channel: string, channelName: string, programID: string, programTitle: string, programTime: Date, notifyButParent: JQuery, notifySeconds: number) {
    var notifyTime = programTime.getTime() - notifySeconds * 1000;
    var now = new Date();
    if (notifyTime > now.getTime()) {
        var progNotifyName = "progNotify_" + channel + "_" + programID;
        notifyButParent.children('.addNotify').remove();
        var notifyButton = $('<div class="addNotify" data-prognotifyname="' + progNotifyName + '" data-registered="false"></div>').prependTo(notifyButParent);        
        gl.getStorage(progNotifyName, function (notifyData) {
            //console.log(notifyData, progNotifyName)
            notifyButtonData[progNotifyName] = {
                channel: channel,
                channelName: channelName,
                programID: programID,
                programTitle: programTitle,
                programTime: programTime.getTime(),//dateを数字に
                notifyTime: notifyTime
            };
            if (!notifyData[progNotifyName]) {
                //未登録
                notifyButton.text("拡張機能の通知登録").css('background-color', '#fff').attr('data-registered', 'false').click(function (e) {
                    var clickedButton = $(e.target);
                    var request = notifyButtonData[clickedButton.attr("data-prognotifyname")||''];
                    request.type = "addProgramNotifyAlarm";
                    chrome.runtime.sendMessage(request, function (response) {
                        if (response.result === "added") {
                            gdl.toast("通知登録しました<br>番組開始" + notifySeconds + "秒前にポップアップで通知します。設定されていた場合は自動で放送画面を開きます。通知設定やChromeが立ち上がってないなどにより通知されない場合があります。Chromeが起動していればAbemaTVを開いてなくても通知されます。");
                            var clickedButtonParent = clickedButton.parent();
                            clickedButton.remove();
                            putNotifyButtonElement(request.channel, request.channelName, request.programID, request.programTitle, new Date(request.programTime), clickedButtonParent, notifySeconds);
                            if(getInfo.determineUrl() == 1 || getInfo.determineUrl() == 2){setRegistProgsBackground();}
                        } else if (response.result === "notificationDined") {
                            gdl.toast("拡張機能からの通知が拒否されているので通知できません");
                        } else if (response.result === "pastTimeError") {
                            gdl.toast("既に開始された番組です");
                        }
                    });
                });
            } else {
                //登録済み
                notifyButton.text("拡張機能の通知登録解除").css('background-color', '#feb').attr('data-registered', 'true').click(function (e) {
                    var clickedButton = $(e.target);
                    var progData = notifyButtonData[clickedButton.attr("data-prognotifyname")||''];
                    chrome.runtime.sendMessage({ type: "removeProgramNotifyAlarm", progNotifyName: clickedButton.attr("data-prognotifyname") }, function (response) {
                        if (response.result === "removed") {
                            gdl.toast("通知解除しました");
                            var clickedButtonParent = clickedButton.parent();
                            clickedButton.remove();
                            putNotifyButtonElement(progData.channel, progData.channelName, progData.programID, progData.programTitle, new Date(progData.programTime), clickedButtonParent, notifySeconds);
                            if(getInfo.determineUrl() == 1 || getInfo.determineUrl() == 2){setRegistProgsBackground();}
                        }
                    });
                });
            }
        });
    } else {
        notifyButParent.children('.addNotify').remove();
    }
}
function programTimeStrToTime(programTimeStr: string) {
    var programTimeArray = programTimeStr.match(/(\d+)月(\d+)日[（\(][^ ~]+[）\)]\s*(\d+):(\d+)/);
    if(programTimeArray===null){console.warn('programTimeStrToTime("'+programTimeStr+'") not match'); return new Date(0);}
    var now = new Date();
    var programYear = now.getFullYear();
    var programMonthNum = parseInt(programTimeArray[1]) - 1;
    var programDate = parseInt(programTimeArray[2]);
    var programHour = parseInt(programTimeArray[3]);
    var programMinute = parseInt(programTimeArray[4]);
    if (now.getMonth() === 11 && programMonthNum === 0) {programYear++;} //現在12月なら1月は来年とする
    var programTime = new Date(programYear, programMonthNum, programDate, programHour, programMinute, 0, 0);
    return programTime;
}
export function putNotifyButton(notifySeconds: number, url: string) {
    if (getInfo.determineUrl() != getInfo.URL_SLOTPAGE) return;
    const detailContainer = dl.last(dl.filter(document.getElementsByTagName('div'),{top14u:true,width12b:true,height12b:true, notBodyParent:true,notMatchSelector:'#main>*',filters:[e=>e.childElementCount==2]}));
    const buttonContainer = detailContainer&&dl.parentsFilterLastByArray(detailContainer.getElementsByTagName('button'),{height14s:true,filters:[e=>e.childElementCount>2]});
    const header = detailContainer.getElementsByTagName('header');

    var titleElement = $(header).find('h1').eq(0);
    if (titleElement.text() == ""||!buttonContainer) { setTimeout(function () { putNotifyButton(notifySeconds, url); }, 1000); console.log("putNotifyButton wait"); return; }
    var urlarray = url.substring(17).split("/");
    var channel = urlarray[1];
    var channelName = titleElement.next().text();
    var programID = urlarray[3];
    if(programID.indexOf('?')>=0){
        programID = programID.slice(0,programID.indexOf('?'));
    }
    var programTitle = titleElement.text();
    var programTimeStr = titleElement.nextAll().eq(1).text();
    console.log(programID, programTitle, channel, channelName, programTimeStr, urlarray);
    var programTime = programTimeStrToTime(programTimeStr);
    //console.log(programTime)
    var butParent = $('<div class="addNotifyWrapper slotpage"></span>').appendTo(buttonContainer);
    putNotifyButtonElement(channel, channelName, programID, programTitle, programTime, butParent, notifySeconds);
    const observer = new MutationObserver(r=>{
        console.log(r);
        observer.disconnect();
        var butParent = $('<div class="addNotifyWrapper slotpage"></span>').appendTo(buttonContainer);
        putNotifyButtonElement(channel, channelName, programID, programTitle, programTime, butParent, notifySeconds);

    });
    observer.observe(buttonContainer,{childList:true});
}
export function putSerachNotifyButtons(notifySeconds: number) {
    if (getInfo.determineUrl() != getInfo.URL_SEARCH) return;
    const h1=Array.from(document.getElementsByTagName('h1')).filter(e=>e.innerText.includes('放送予定'))[0];
    if(!h1||!h1.nextElementSibling){setTimeout(putSerachNotifyButtons,500, notifySeconds);console.log('putSerachNotifyButtons wait: h1');return;}  
    var listWrapper = $(h1.nextElementSibling.querySelector('div[role=list]')||[]);
    var listItems = listWrapper.find('a[role=listitem]');
    var noContentText = '該当する放送予定の番組はありませんでした';
    var noContentMessage = $('p').filter(function(i,e){return e.innerHTML.includes(noContentText);});
    if (listItems.length == 0 && noContentMessage.length == 0) { setTimeout(function () { putSerachNotifyButtons(notifySeconds); }, 1000); console.log("putSerachNotifyButtons wait"); return; }
    listItems.each(function (i: number, elem: HTMLElement) {
        var linkArea = $(elem);
        var spans = linkArea.children().eq(0).children().eq(1).children('span');
        if(spans.length<3)return;
        if($(elem).next('.listAddNotifyWrapper').length>0){return;}
        var butParent = $('<span class="listAddNotifyWrapper"></span>').insertAfter(elem);
        linkArea.children().css('border-bottom','none');
        var progUrl = linkArea.attr('href')||'';
        var urlarray = progUrl.substring(1).split("/");
        //console.log(urlarray);
        var channel = urlarray[1];
        var channelNameElem = spans.eq(1);
        var channelName = channelNameElem.text();
        var programID = urlarray[3];
        var programTitle = spans.eq(0).text();
        var programTime = programTimeStrToTime(spans.eq(2).text());
        //console.log(linkArea, channel, channelName, programID, programTitle, programTime, butParent);
        putNotifyButtonElement(channel, channelName, programID, programTitle, programTime, butParent, notifySeconds);
    });
    //もっとみるボタンに対応
    var moreBtn = listWrapper.next('button');
    moreBtn.click(function(){
        setTimeout(putSerachNotifyButtons, 500, notifySeconds);
    });
}
export function putReminderNotifyButtons(notifySeconds: number) {
    if (getInfo.determineUrl() != getInfo.URL_RESERVATION) return;
    var listWrapper = $('div[role=list]');
    var listItems = $('a[role=listitem]');
    var featureText = '見たい番組を見逃さないためには';//公式通知登録一覧で何も登録してないときの機能紹介文
    var featureMessage = $('p').filter(function(i,e){return e.innerHTML.includes(featureText);});
    if (listItems.length == 0 && featureMessage.length == 0) { setTimeout(function () { putReminderNotifyButtons(notifySeconds); }, 1000); console.log("putReminderNotifyButtons wait"); return; }
    listItems.each(function (i, elem) {
        var linkArea = $(elem);
        var spans = linkArea.children().eq(1).find('span');
        var butParent;
        if(linkArea.next().is('.listAddNotifyWrapper')){
            butParent = linkArea.next();
        }else{
            butParent = $('<span class="listAddNotifyWrapper"></span>').insertAfter(elem);
            linkArea.css('border-bottom','none');
        }
        var progUrl = linkArea.attr('href')||'';
        var urlarray = progUrl.substring(1).split("/");
        //console.log(urlarray);
        var channel = urlarray[1];
        var titleElem = spans.eq(0);
        var channelName = spans.eq(1).text();
        var programID = urlarray[3];
        var programTitle = spans.eq(0).text();
        var programTime = programTimeStrToTime(spans.eq(2).text());
        putNotifyButtonElement(channel, channelName, programID, programTitle, programTime, butParent, notifySeconds);
    });
    //一括登録ボタン
    if(listItems.length>1&&$('.addAllNotifyButton').length<1){
        $('<div class="addAllNotifyButton" >以上の番組を全て拡張機能の通知登録する</div>').insertAfter(listWrapper).click(function(){
            $('.addNotify[data-registered="false"]').trigger('click');
        });
    }
}
export function putSideDetailNotifyButton(notifySeconds: number, EXTTsideL: HTMLElement, EXTTsideR: HTMLElement){
    console.log('putSideDetailNotifyButton()');
    var sideDetailWrapper = $(EXTTsideR);
    //console.log('put side notify button', sideDetailWrapper);
    if (sideDetailWrapper.length == 0) {
        setTimeout(putSideDetailNotifyButton, 500, notifySeconds, EXTTsideL, EXTTsideR);
        console.log('retry putSideDetailNotifyButton (sideDetailWrapper==0)');
    }
    //console.log(sideDetailWrapper.offset(),window.innerWidth - 50);
    const offset = sideDetailWrapper.offset();
    if (offset&&offset.left > window.innerWidth - 50) {// sideDetailWrapperが右画面外ならリトライ
        setTimeout(putSideDetailNotifyButton, 1000, notifySeconds, EXTTsideL, EXTTsideR);
        console.log('retry putSideDetailNotifyButton (left>window.innerWidth-50)');
        return;
    }
    var fp=sideDetailWrapper.find('p');//番組詳細,タイトル,日時,見逃し云々?
    var progTitle;
    var progTime = programTimeStrToTime(fp.eq(2).text());
    if(fp.length>=3){
        progTitle = fp.eq(1).text();
        progTime = programTimeStrToTime(fp.eq(2).text());
    }else{
        progTitle=$('zo_bq').text();
        progTime = programTimeStrToTime($('.zo_hs').text()); //todo
    }
    var fa = sideDetailWrapper.find('a').filter(function (i, e) { return (e.textContent||'').indexOf("詳細") == 0;});//a 放送中なら放送画面リンク,詳細をもっとみる
    var progLinkArr;
    if(fa.length>0) progLinkArr = (fa.first().attr("href")||'').split('/');
    else progLinkArr=($('.zo_zu').attr("href")||'').split('/'); //todo
//    var channel = progLinkArr[2];
    var urlchan = progLinkArr.indexOf("channels");
    //console.log(fa,progLinkArr)
    if (urlchan < 0) return;
    var channel = progLinkArr[urlchan + 1];
    var channelName = getInfo.getChannelNameOnTimetable(channel, EXTTsideL);
//    var progID = progLinkArr[4];
    var progID = progLinkArr[urlchan + 3];
    var notifyButParent;
    if(fp.length>=3&&fa.length>0&&fp.eq(2).next("div").is(fa.first().prev("div")))//fp2のすぐ下かつfa0のすぐ上のやつ
        notifyButParent=fp.eq(2).next("div").children("div").first();
    else notifyButParent=sideDetailWrapper.find('.zo_zw>div'); //todo
    console.log(progTitle,progTime,channel,channelName,progID,notifyButParent);
    putNotifyButtonElement(channel, channelName, progID, progTitle, progTime, notifyButParent, notifySeconds);
}