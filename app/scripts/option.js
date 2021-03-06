'use strict';
// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

import * as $ from 'jquery';
import * as settings from './lib/settings';
import * as settingHtml from './lib/settingHtml';

// edge対応
if (
    (typeof chrome === 'undefined' || !chrome.extension) &&
    typeof browser !== 'undefined'
) {
    this.chrome = chrome || browser;
}
const descImageDir = '/images/settings/';
$(function() {
    $('#settingsArea').html(settingHtml.generateOptionHTML(true));
    $('.inputWrapper')
        .mouseover(function() {
            const name = this.id.match(/(.+)-wrapper/)[1];
            const wrapper = this.closest('.settingWrapper');
            if (!wrapper) return;
            const descImage = wrapper.getElementsByClassName('descImage')[0];
            if (
                !descImage ||
                !name ||
                !settings.flatSettings[name].hasDescImage
            )
                return;
            const src = descImageDir + name + '.png';
            descImage.setAttribute('src', src);
        })
        .mouseleave(function() {
            const name = this.id.match(/(.+)-wrapper/)[1];
            const wrapper = this.closest('.settingWrapper');
            if (!wrapper) return;
            const descImage = wrapper.getElementsByClassName('descImage')[0];
            if (
                !descImage ||
                !name ||
                !settings.flatSettings[name].hasDescImage
            )
                return;
            const src = descImageDir + name + '.png';
            if (descImage.getAttribute('src') === src)
                descImage.setAttribute('src', descImageDir + '1x1.png');
        });
    $('#CommentMukouSettings').hide();
    $('#CommentColorSettings')
        .css('width', '600px')
        .css('background-color', 'darkgreen')
        .css('padding', '8px')
        .children('div')
        .css('clear', 'both')
        .children('span.desc')
        .css('padding', '0px 4px')
        .next('span.prop')
        .css('background-color', 'white')
        .css('padding', '0px 4px')
        .next('input[type="range"]')
        .css('float', 'right');
    $('#itimePosition')
        .insertAfter('#isTimeVisible-switch+*')
        .css('border', 'black solid 1px')
        .css('margin-left', '16px')
        .css('display', 'flex')
        .css('flex-direction', 'column')
        .children()
        .css('display', 'flex')
        .css('flex-direction', 'row')
        .css('margin', '1px 0px')
        .children()
        .css('margin-left', '4px');
    $('#iprotitlePosition')
        .insertAfter('#isProtitleVisible-switch+*')
        .css('border', 'black solid 1px')
        .css('margin-left', '16px')
        .css('display', 'flex')
        .css('flex-direction', 'column')
        .children()
        .css('display', 'flex')
        .css('flex-direction', 'row')
        .css('margin', '1px 0px')
        .children()
        .css('margin-left', '4px');
    $('#iproSamePosition')
        .insertBefore('#isProtitleVisible-switch')
        .css('border', 'black solid 1px')
        .children()
        .css('display', 'flex')
        .css('flex-direction', 'row')
        .css('margin', '1px 0px')
        .children()
        .css('margin-left', '4px');
    $('<span style="margin-left:4px;">↑と↓が同じ位置の場合: </span>').prependTo(
        '#iproSamePosition>*'
    );
    if ($('#CommentMukouSettings .setTables').length == 0) {
        $('#CommentMukouSettings').wrapInner('<div id="ComeMukouD">');
        $(
            '<div id="ComeMukouO" class="setTables">コメント数が表示されないとき</div>'
        ).prependTo('#CommentMukouSettings');
        $('#ComeMukouO')
            .css('margin-top', '8px')
            .css('padding', '8px')
            .css('border', '1px solid black');
        $('<table id="setTable">').appendTo('#ComeMukouO');
        $('#setTable').css('border-collapse', 'collapse');
        $(
            '<tr><th></th><th colspan=2>画面真っ黒</th><th>画面縮小</th><th colspan=2>音量ミュート</th></tr>'
        ).appendTo('#setTable');
        $(
            '<tr><td>適用</td><td></td><td></td><td></td><td></td><td></td></tr>'
        ).appendTo('#setTable');
        $(
            '<tr><td>画面クリックで<br>解除・再適用</td><td colspan=2></td><td></td><td colspan=2></td></tr>'
        ).appendTo('#setTable');

        $('#isCMBlack').appendTo('#setTable tr:eq(1)>td:eq(1)');
        $('#isCMBkTrans')
            .appendTo('#setTable tr:eq(1)>td:eq(1)')
            .css('display', 'none');
        $('<input type="radio" name="cmbktype" value=0>')
            .appendTo('#setTable tr:eq(1)>td:eq(2)')
            .after('全面真黒<br>');
        $('<input type="radio" name="cmbktype" value=1>')
            .appendTo('#setTable tr:eq(1)>td:eq(2)')
            .after('下半透明');
        $('#setTable input[type="radio"][name="cmbktype"]').change(
            setCMBKChangedR
        );

        $('#CMsmall')
            .appendTo('#setTable tr:eq(1)>td:eq(3)')
            .after('％')
            .css('text-align', 'right')
            .css('width', '4em');

        $('#isCMsoundoff').appendTo('#setTable tr:eq(1)>td:eq(4)');
        $('#isTabSoundplay')
            .appendTo('#setTable tr:eq(1)>td:eq(4)')
            .css('display', 'none');
        $('<input type="radio" name="cmsotype" value=0>')
            .appendTo('#setTable tr:eq(1)>td:eq(5)')
            .after('プレイヤー<br>');
        $('<input type="radio" name="cmsotype" value=1>')
            .appendTo('#setTable tr:eq(1)>td:eq(5)')
            .after('タブ設定');
        $('#setTable input[type="radio"][name="cmsotype"]').change(
            setCMsoundChangedR
        );

        $('#setTable #isCMBlack').change(setCMBKChangedB);
        $('#setTable #CMsmall').change(setCMzoomChangedR);
        $('#setTable #isCMsoundoff').change(setCMsoundChangedB);
        $('#isCMBkR').appendTo('#setTable tr:eq(2)>td:eq(1)');
        $('#isCMsmlR').appendTo('#setTable tr:eq(2)>td:eq(2)');
        $('#isCMsoundR').appendTo('#setTable tr:eq(2)>td:eq(3)');
        $('#setTable td')
            .css('border', '1px solid black')
            .css('text-align', 'center')
            .css('padding', '3px');
        $('#setTable tr:eq(1)>td:eq(1)').css('border-right', 'none');
        $('#setTable tr:eq(1)>td:eq(2)')
            .css('border-left', 'none')
            .css('text-align', 'left');
        $('#setTable tr:eq(1)>td:eq(4)').css('border-right', 'none');
        $('#setTable tr:eq(1)>td:eq(5)')
            .css('border-left', 'none')
            .css('text-align', 'left');

        $(
            '<div id="ComeMukouW" class="setTables">↑の実行待機(秒)</div>'
        ).insertAfter('#ComeMukouO');
        $('#ComeMukouW')
            .css('margin-top', '8px')
            .css('padding', '8px')
            .css('border', '1px solid black');
        $('#beforeCMWait')
            .appendTo('#ComeMukouW')
            .before('　開始後');
        $('#afterCMWait')
            .appendTo('#ComeMukouW')
            .before('　終了後')
            .after(
                '<br>待機時間中、押している間は実行せず、離すと即実行するキー<br>'
            );
        $('#isManualKeyCtrlL')
            .appendTo('#ComeMukouW')
            .after('左ctrl');
        $('#isManualKeyCtrlR')
            .appendTo('#ComeMukouW')
            .after('右ctrl');
        $('#isManualMouseBR')
            .appendTo('#ComeMukouW')
            .before(
                '<br>待機時間中、カーソルを1秒以上連続で合わせている間は実行せず、外すと即実行する場所<br>'
            )
            .after('右下のコメント数表示部');
        $('<div id="ComeMukouN" class="setTables"></div>').insertAfter(
            '#ComeMukouW'
        );
        $('#ComeMukouN')
            .css('margin-top', '8px')
            .css('padding', '8px')
            .css('border', '1px solid black');
        $('#useEyecatch')
            .appendTo('#ComeMukouN')
            .after('左上ロゴのタイミングも利用する<br>');
        $('#isHidePopTL')
            .appendTo('#ComeMukouN')
            .after('左上ロゴを非表示<br>');
        $('#isHidePopBL')
            .appendTo('#ComeMukouN')
            .after('左下の通知を非表示<br>');
        $('#isHidePopFresh')
            .appendTo('#ComeMukouN')
            .after('左下のFreshの通知を非表示');
        $('#ComeMukouD').remove();
    }
    if ($('#panelCustom').length == 0) {
        $(
            '<fieldset><legend>黒帯パネル開閉設定</legend><div id="panelCustom""></div></fieldset>'
        ).insertBefore('#CommentMukouSettings');
        $('#panelCustom')
            .css('margin-top', '8px')
            .css('padding', '8px');
        //.css("border","1px solid black")

        // $('#isAlwaysShowPanel').appendTo('#panelCustom').prop("disabled",true).before("旧");
        // $('<input type="button" id="alwaysShowPanelB" value="下表に適用">').insertAfter('#isAlwaysShowPanel').before("常に黒帯パネルを表示する");
        // $('#isOpenPanelwCome').appendTo('#panelCustom').prop("disabled",true).before("<br>旧");
        // $('<input type="button" id="openPanelwComeB" value="下表に適用">').insertAfter('#isOpenPanelwCome').before("コメント欄を開いていても黒帯パネル等を表示できるようにする");
        //$('<br><span>※以上の古いオプションは以下の新オプションに統合され、適当な経過期間の後に削除予定</span>').appendTo('#panelCustom');
        $('#ipanelopenset')
            .appendTo('#panelCustom')
            .children()
            .css('display', 'flex')
            .css('flex-direction', 'row');
        $('<table id="panelcustomTable">').appendTo('#panelCustom');
        $('#panelcustomTable').css('border-collapse', 'collapse');
        $(
            '<tr><th></th><th>上のメニュー</th><th>下のバー</th><th>右のボタン</th></tr>'
        ).appendTo('#panelcustomTable');
        $('<tr><td>基本</td><td></td><td></td><td></td></tr>').appendTo(
            '#panelcustomTable'
        );
        $(
            '<tr><td>番組情報<br>表示時</td><td></td><td></td><td></td></tr>'
        ).appendTo('#panelcustomTable');
        $(
            '<tr><td>放送中一覧<br>表示時</td><td></td><td></td><td></td></tr>'
        ).appendTo('#panelcustomTable');
        $(
            '<tr><td>コメント<br>表示時</td><td></td><td></td><td></td></tr>'
        ).appendTo('#panelcustomTable');
        var rd = ['非表示<br>', 'マウス反応<br>', '常に表示'];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    $(
                        '<input type="radio" name="d' +
                            i +
                            '' +
                            j +
                            '" value="' +
                            k +
                            '" id="radio-d' +
                            i +
                            j +
                            '-' +
                            k +
                            '">'
                    )
                        .appendTo(
                            '#panelcustomTable tr:eq(' +
                                (i + 1) +
                                ')>td:eq(' +
                                (j + 1) +
                                ')'
                        )
                        .after(
                            '<label for="radio-d' +
                                i +
                                j +
                                '-' +
                                k +
                                '">' +
                                rd[k] +
                                '</label>'
                        );
                }
            }
        }
        $('#panelcustomTable td')
            .css('border', '1px solid black')
            .css('text-align', 'left')
            .css('padding', '3px');
        $('#panelcustomTable td:first-child').css('text-align', 'center');
    }
    /*$('#ihighlightNewCome')
        .insertBefore('#isCommentWide-switch')
        .css('border', 'black solid 1px')
        .children()
        .css('display', 'flex')
        .css('flex-direction', 'row')
        .css('margin', '1px 0px')
        .css('padding-left', '8px')
        .children()
        .css('margin-left', '4px')
        .first()
        .before('新着コメントを少し強調する');
    $('#ihighlightComeColor')
        .insertBefore('#isCommentWide-switch')
        .css('border', 'black solid 1px')
        .children()
        .css('display', 'flex')
        .css('flex-direction', 'row')
        .css('margin', '1px 0px')
        .css('padding-left', '8px')
        .children()
        .css('margin-left', '4px')
        .first()
        .before('↑の色');
    var c = $('#highlightComePower')
        .parent()
        .contents();
    var jo = $('#highlightComePower');
    var i = c.index(jo);
    c.slice(i - 2, i).remove();
    $('#highlightComePower')
        .appendTo(
            $('#ihighlightComeColor')
                .children()
                .first()
        )
        .prop('type', 'range')
        .prop('max', '100')
        .prop('min', '0');
    $(
        '<span id="highlightPdesc" style="margin-right:4px;margin-left:12px;">背景濃さ: </span>'
    ).insertBefore('#highlightComePower');*/
    $('#changeMaxVolume')
        .prop('max', '100')
        .prop('min', '0');
    $('#sureReadRefreshx').prop('min', '101');
    $('#movingCommentSecond').prop('min', '1');
    $('#movingCommentLimit').prop('min', '0');
    $('#comeFontsize')
        .prop('max', '99')
        .prop('min', '1');
    $('#notifySeconds').prop('min', '0');
    $('#CMsmall')
        .prop('max', '100')
        .prop('min', '5');
    $('#beforeCMWait').prop('min', '0');
    $('#afterCMWait').prop('min', '0');

    settings.getSettings().then(function(value) {
        var isCMBlack = value.CMBlack;
        var isCMBkTrans = value.CMBkTrans;
        var isCMsoundoff = value.CMsoundoff;
        var commentBackColor = value.commentBackColor;
        var commentBackTrans = value.commentBackTrans;
        var commentTextColor = value.commentTextColor;
        var commentTextTrans = value.commentTextTrans;
        var isTabSoundplay = value.tabSoundplay;
        var panelopenset = value.panelopenset;
        console.log(panelopenset);

        settingHtml.setSettingInputValue(value, true);

        var bc =
            'rgba(' +
            commentBackColor +
            ',' +
            commentBackColor +
            ',' +
            commentBackColor +
            ',' +
            commentBackTrans / 255 +
            ')';
        var tc =
            'rgba(' +
            commentTextColor +
            ',' +
            commentTextColor +
            ',' +
            commentTextColor +
            ',' +
            commentTextTrans / 255 +
            ')';
        $('#CommentColorSettings span.desc')
            .css('background-color', bc)
            .css('color', tc);

        $('#settingsArea input[type="radio"][name="cmbktype"]')
            .prop('disabled', !isCMBlack)
            .val([isCMBkTrans ? 1 : 0]);
        $('#settingsArea input[type="radio"][name="cmsotype"]')
            .prop('disabled', !isCMsoundoff)
            .val([isTabSoundplay ? 1 : 0]);
        if (
            $(
                '#ipanelopenset [type="radio"][name="panelopenset"][value=' +
                    panelopenset +
                    ']'
            ).length > 0
        ) {
            $('#ipanelopenset [type="radio"][name="panelopenset"]').val([
                panelopenset
            ]);
        } else {
            $('#ipanelopenset [type="radio"][name="panelopenset"]').val([
                531441
            ]);
        }

        isCMSettingsEnabled =
            value.isCMBlack ||
            value.isCMsoundoff ||
            value.CMsmall != 100 ||
            value.isHidePopTL ||
            value.isHidePopBL ||
            value.isHidePopFresh;
    });
    $('#saveBtn').click(function() {
        const saveSettings = settingHtml.getSettingInputValue(true);
        Object.assign(saveSettings, {
            isCMBkR:
                $('#isCMBkR').prop('checked') &&
                $('#isCMBlack').prop('checked'),
            isCMsoundR:
                $('#isCMsoundR').prop('checked') &&
                $('#isCMsoundoff').prop('checked'),
            isCMsmlR:
                $('#isCMsmlR').prop('checked') &&
                parseInt($('#CMsmall').val()) != 100
        });
        // isなしを削除
        settings.setStorage(saveSettings).then(function() {
            $('#info')
                .show()
                .text('設定保存しました')
                .fadeOut(4000);
            settings.deleteNoIs();
        });
    });
    settingHtml.setRangeNumberDisplayer();
    $('#CommentColorSettings').change(function() {
        var p = [];
        var jo = $('#CommentColorSettings input[type="range"]');
        for (var i = 0; i < jo.length; i++) {
            p[i] = jo.eq(i).val();
        }
        $('#CommentColorSettings span.desc')
            .css(
                'background-color',
                'rgba(' +
                    p[0] +
                    ',' +
                    p[0] +
                    ',' +
                    p[0] +
                    ',' +
                    p[1] / 255 +
                    ')'
            )
            .css(
                'color',
                'rgba(' +
                    p[2] +
                    ',' +
                    p[2] +
                    ',' +
                    p[2] +
                    ',' +
                    p[3] / 255 +
                    ')'
            );
    });
    //$('#alwaysShowPanelB').on("click",panelTableUpdateA);
    //$('#openPanelwComeB').on("click",panelTableUpdateO);
    $('#ipanelopenset').change(panelTableUpdateS);
    $('#panelcustomTable').change(panelTableUpdateT);
    //クリアボタン
    $('#resetSettingsBtn').click(function() {
        if (window.confirm('設定をすべて削除しますか？')) {
            settings.resetSettings(function() {
                window.alert('設定をリセットしました。');
                location.reload();
            });
        }
    });
    $('#resetCMSettingsBtn').click(function() {
        settings.resetCMSettings(function() {
            window.alert('コメント無効時の情報をリセットしました。');
            location.reload();
        });
    });
    //通知登録番組一覧リンク書き換え
    $('#prognotifiesLink').attr(
        'href',
        chrome.extension.getURL('/pages/notifylist.html')
    );

    chrome.storage.local.get(function(value) {
        //不具合報告フォーム
        $('#reportBugFormBtn').click(function() {
            var sendVal = {};
            for (var key in value) {
                if (key.indexOf('progNotify') < 0) {
                    //通知登録データは除外
                    sendVal[key] = value[key];
                    if (key == 'mastodonToken') {
                        sendVal[key] = value[key].replace(/./g, '*'); //Mastodonトークンは*に置き換え
                    } else if (
                        key == 'notifyMailAddress' ||
                        key == 'notifyLNtoken' ||
                        key == 'notifyPostUrl'
                    ) {
                        sendVal[key] = value[key]
                            .replace(/[a-z]/g, 'a')
                            .replace(/[A-Z]/g, 'A')
                            .replace(/\d/g, '0');
                    } else if (key == 'fullNg') {
                        sendVal[key] =
                            'ngword-count-' + value[key].split('\n').length;
                    } else if (key == 'userNg') {
                        sendVal[key] =
                            'nguserid-count-' + value[key].split('\n').length;
                    }
                }
            }

            var sendInfo = '***設定***\n';
            sendInfo += JSON.stringify(sendVal, null, 4);
            sendInfo += '\n***UserAgent***\n';
            sendInfo += window.navigator.userAgent;
            sendInfo += '\n***画面***\n';
            sendInfo +=
                'スクリーン w:' +
                window.parent.screen.width +
                ',h:' +
                window.parent.screen.height;
            sendInfo +=
                '\nウィンドウ(設定画面) w:' +
                window.innerWidth +
                ',h:' +
                window.innerHeight;
            sendInfo += '\n***拡張機能バージョン***\n';
            sendInfo += chrome.runtime.getManifest().version;
            sendInfo += '\n***ここまで***';
            $('#atachedInfo').val(sendInfo);
            //$('#reportBugForm').submit();
            var submitjs =
                'window.addEventListener("load",function(){document.getElementById("reportForm").submit();});';
            var jsblob = new Blob([submitjs], { type: 'text/javascript' });
            var dataform =
                '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><script type="text/javascript" src="' +
                window.URL.createObjectURL(jsblob) +
                '"></script></head><body><form method="POST" action="https://abema.nakayuki.net/abema-ext/report.php" id="reportForm"><input type="hidden" name="info" value="';
            dataform += sendInfo.replace(/[&'`"<>]/g, function(match) {
                return {
                    '&': '&amp;',
                    "'": '&#x27;',
                    '`': '&#x60;',
                    '"': '&quot;',
                    '<': '&lt;',
                    '>': '&gt;'
                }[match];
            });
            dataform +=
                '"><input type="submit" value="画面が切り替わらない場合はクリックして続行"></form></body></html>';
            var blob = new Blob([dataform], { type: 'text/html' });
            window.open(window.URL.createObjectURL(blob));
        });

        //バージョンによる拡張機能の動作停止
        var disableExtVersion = value.disableExtVersion || '';
        var currentVer = chrome.runtime.getManifest().version;
        function changeDisableExtBtnVal() {
            if (disableExtVersion == currentVer) {
                $('#disableExtensionBtn').val(
                    '現在のバージョンで拡張機能の動作を再開(停止中)'
                );
            } else {
                $('#disableExtensionBtn').val(
                    '現在のバージョンで拡張機能の動作を停止'
                );
            }
        }
        changeDisableExtBtnVal();
        $('#disableExtensionBtn').click(function() {
            if (disableExtVersion == currentVer) {
                disableExtVersion = '';
                chrome.storage.local.set(
                    { disableExtVersion: '' },
                    changeDisableExtBtnVal
                );
            } else {
                disableExtVersion = currentVer;
                chrome.storage.local.set(
                    { disableExtVersion: currentVer },
                    changeDisableExtBtnVal
                );
            }
        });
    });
    //});
    //設定をエクスポート
    $('#exportBtn').click(function() {
        chrome.storage.local.get(function(value) {
            var exportVal = {};
            for (var key in value) {
                if (key.indexOf('progNotify') < 0 && key != 'updateNotifyVer') {
                    //通知登録データとアップデート情報verは除外
                    exportVal[key] = value[key];
                }
            }
            if (isCMSettingsEnabled) {
                $('#exportInfo').text(
                    '※表示されている設定のみエクスポートされます'
                );
            }
            if (!isCMSettingsShow) {
                exportVal = settings.removeCMsettings(exportVal);
            }
            var exportJson = JSON.stringify(exportVal, null, 4);
            $('#inexportArea').val(exportJson);
        });
    });
    //設定をインポート
    $('#inportBtn').click(function() {
        var inportVal = JSON.parse($('#inexportArea').val());
        var saveVal = {};
        for (var key in inportVal) {
            if (key.indexOf('progNotify') < 0 && key != 'updateNotifyVer') {
                //通知登録データとアップデート情報verは除外
                saveVal[key] = inportVal[key];
            }
        }
        chrome.storage.local.set(saveVal, function() {
            location.reload();
        });
    });
    //通知登録をエクスポート
    $('#progExportBtn').click(function() {
        chrome.storage.local.get(function(value) {
            var exportVal = {};
            for (var key in value) {
                if (key.indexOf('progNotify') == 0) {
                    //通知登録データのみ
                    exportVal[key] = value[key];
                }
            }
            var exportJson = JSON.stringify(exportVal, null, 4);
            $('#inexportArea').val(exportJson);
        });
    });
    //通知登録をインポート
    $('#progInportBtn').click(function() {
        var inportVal = JSON.parse($('#inexportArea').val());
        chrome.storage.local.get(function(existVal) {
            for (var key in inportVal) {
                if (key.indexOf('progNotify') == 0) {
                    //通知登録データのみ
                    if (!existVal[key]) {
                        //登録されてなければここで追加
                        chrome.runtime.sendMessage(
                            {
                                type: 'addProgramNotifyAlarm',
                                channel: inportVal[key].channel,
                                channelName: inportVal[key].channelName,
                                notifyTime: inportVal[key].notifyTime,
                                programID: inportVal[key].programID,
                                programTime: inportVal[key].programTime,
                                programTitle: inportVal[key].programTitle
                            },
                            function(res) {
                                if (res.result == 'added') {
                                    console.log(
                                        'add program notify by import: ' + key
                                    );
                                } else {
                                    console.log(
                                        'add program notify by import error:' +
                                            key +
                                            ', ' +
                                            res.result
                                    );
                                }
                            }
                        );
                    } else {
                        console.log(key);
                    }
                }
            }
        });
    });
    //Mastodon token取得
    $('#getMastodonTokenBtn').click(function() {
        var instance = $('#mastodonInstance').val();
        var baseUrl = 'https://' + instance + '/';
        if (!instance) {
            alert('インスタンスのホストを入力してください');
            return;
        }
        getMastodonToken(baseUrl);
        /*chrome.permissions.contains({origins: [baseUrl]}, function(res){
            if(res){
                getMastodonToken(baseUrl);
            }else{
                chrome.permissions.request({origins: [baseUrl]}, function(granted){
                    if(granted){
                        getMastodonToken(baseUrl);
                    }else{
                        alert(instance+'へのアクセスが許可されませんでした');
                    }
                });
            }
        });*/
    });
});
var keyinput = [];
var keyCodes = '38,38,40,40,37,39,37,39,66,65';
var isCMSettingsEnabled = false;
var isCMSettingsShow = false;
$(window).keyup(function(e) {
    keyinput.push(e.keyCode);
    if (keyinput.toString().indexOf(keyCodes) == 0) {
        $('#CommentMukouSettings').show();
        isCMSettingsShow = true;
        keyinput = [];
    } else {
        while (
            keyinput.length > 0 &&
            keyCodes.indexOf(keyinput.toString()) != 0
        ) {
            if (keyinput.length > 1) {
                keyinput.shift();
            } else {
                keyinput = [];
            }
        }
    }
});
function setCMzoomChangedR() {
    var jo = $('#settingsArea #isCMsmlR');
    if (parseInt($('#CMsmall').val()) == 100) {
        jo.prop('checked', false).prop('disabled', true);
    } else {
        jo.prop('disabled', false);
    }
}
function setCMsoundChangedB() {
    $('#settingsArea input[type="radio"][name="cmsotype"]').prop(
        'disabled',
        !$('#isCMsoundoff').prop('checked')
    );
    $('#settingsArea #isCMsoundR')
        .prop('checked', false)
        .prop('disabled', !$('#isCMsoundoff').prop('checked'));
}
function setCMBKChangedB() {
    $('#settingsArea input[type="radio"][name="cmbktype"]').prop(
        'disabled',
        !$('#isCMBlack').prop('checked')
    );
    $('#settingsArea #isCMBkR')
        .prop('checked', false)
        .prop('disabled', !$('#isCMBlack').prop('checked'));
}
function setCMBKChangedR() {
    $('#settingsArea #isCMBkTrans').prop(
        'checked',
        $('#settingsArea input[type="radio"][name="cmbktype"]:checked').val() ==
            1
            ? true
            : false
    );
}
function setCMsoundChangedR() {
    $('#settingsArea #isTabSoundplay').prop(
        'checked',
        $('#settingsArea input[type="radio"][name="cmsotype"]:checked').val() ==
            1
            ? true
            : false
    );
}
//function panelTableUpdateA(){
//    $('#panelcustomTable [type="radio"]').val([2]);
//}
//function panelTableUpdateO(){
//    $('#panelcustomTable [type="radio"][name^="d3"]').val([1]);
//}
function panelTableUpdateS() {
    var jo = $('#panelcustomTable [type="radio"]');
    var jv = parseInt(
        $('#ipanelopenset [type="radio"][name="panelopenset"]:checked').val()
    );
    if (jv >= Math.pow(3, 12)) return;
    for (var i = 0; i < 4; i++) {
        for (var j = 0, m, d; j < 3; j++) {
            m = Math.pow(3, (3 - i) * 3 + (2 - j));
            d = 0;
            while (m <= jv) {
                jv -= m;
                d++;
            }
            if (d < 3) jo.filter('[name^="d' + i + '' + j + '"]').val([d]);
        }
    }
}
function panelTableUpdateT() {
    $('#ipanelopenset [type="radio"][name="panelopenset"]').val([531441]);
}
//Mastodon token取得 インスタンスホストに対する許可を得た後
function getMastodonToken(baseUrl) {
    var APIbase = baseUrl + 'api/v1/';
    //app 登録
    $.post(
        APIbase + 'apps',
        {
            client_name: 'AbemaTVChromeExtension',
            redirect_uris: 'urn:ietf:wg:oauth:2.0:oob',
            scopes: 'write'
        },
        function(data) {
            var client_id = data.client_id;
            var client_secret = data.client_secret;
            //$('#getMastodonTokenBtn').hide();
            $('#authCodeArea').html(
                '→Mastodon認証画面が開きますので、承認して表示される英数字のコードを貼り付けて確定を押してください<input type="text" id="authCodeInput" placeholder="認証画面のコードをここにコピペ"><input type="button" id="authCodeBtn" value="確定">'
            );
            var authUrl =
                baseUrl +
                'oauth/authorize?client_id=' +
                client_id +
                '&redirect_uri=' +
                'urn:ietf:wg:oauth:2.0:oob' +
                '&response_type=code&scope=write';
            window.open(authUrl);
            $('#authCodeBtn').click(function() {
                var authcode = $('#authCodeInput').val();
                if (!authcode) {
                    alert('認証コードを貼り付けてください');
                    return;
                }
                //トークン取得
                $.post(
                    baseUrl + 'oauth/token',
                    {
                        grant_type: 'authorization_code',
                        redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
                        client_id: client_id,
                        client_secret: client_secret,
                        code: authcode
                    },
                    function(tokenData) {
                        var accessToken = tokenData.access_token;
                        if (!accessToken) {
                            alert('トークンが取得できませんでした');
                            return;
                        }
                        $('#mastodonToken').val(accessToken);
                        alert(
                            'トークンを取得しました。設定を保存してください。'
                        );
                        $('#authCodeArea').html('');
                    },
                    'json'
                );
            });
        },
        'json'
    );
}
