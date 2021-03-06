// 拡張機能の設定一覧
// ここのsettingsに設定を追加するだけで設定画面、contentScriptでの設定の読み込み、一時設定時の値反映は自動でやってくれる。
// (settingsへの値の反映以外の反映処理は要実装) あとTS用にSettingItemsに型を追記必要

interface BasicSetting {
    name: string;
    title?: string;
    description?: string;
    instantDescription?: string;
    type:
        | 'boolean'
        | 'number'
        | 'range'
        | 'text'
        | 'textarea'
        | 'select'
        | 'radio';
    default: boolean | string | number;
    isInstantChangable: boolean;
    range?: number[];
    selections?: { value: string | number; string: string }[];
    hasDescImage?: boolean;
}

interface BooleanSetting extends BasicSetting {
    type: 'boolean';
    default: boolean;
}
interface NumberSetting extends BasicSetting {
    type: 'number';
    default: number;
    range?: number[];
}
interface RangeSetting extends BasicSetting {
    type: 'range';
    default: number;
    range: number[];
}
interface TextSetting extends BasicSetting {
    type: 'text';
    default: string;
}
interface TextareaSetting extends BasicSetting {
    type: 'textarea';
    default: string;
}
interface SelectSetting extends BasicSetting {
    type: 'select';
    default: string | number;
    selections: { value: string | number; string: string }[];
}
interface RadioSetting extends BasicSetting {
    type: 'radio';
    default: string | number;
    selections: { value: string | number; string: string }[];
}
export type Setting =
    | BooleanSetting
    | NumberSetting
    | RangeSetting
    | TextSetting
    | TextareaSetting
    | SelectSetting
    | RadioSetting;
// interface Setting {
//         name: string;
//         title?: string;
//         description?: string;
//         instantDescription?: string;
//         type:
//             | 'boolean'
//             | 'number'
//             | 'range'
//             | 'text'
//             | 'textarea'
//             | 'select'
//             | 'radio';
//         default: Setting extends {type: 'boolean'; } ? boolean :
//         Setting extends {type: 'number'; }|{type: 'range'} ? number: string;
//         isInstantChangable: boolean;
//         range?: number[];
//         selections?: { value: string | number; string: string }[];
//         hasDescImage?: boolean;
//     }
export interface SettingList {
    description: string;
    isShowImage?: boolean;
    header?: string;
    footer?: string;
    instantHeader?: string;
    instantFooter?: string;
    settings: Setting[];
}
// SettingItems one liner
// logEval('window.slm=_settings__WEBPACK_IMPORTED_MODULE_2__')
// t='';slm.settingsList.map(v=>v.settings).flat().map(a=>[a.name,a.type.replace(/range/,'number').replace(/text(area)?/,'string')]).forEach(a=>{t+=`    ${a[0]}: ${a[1]};\n`});t
export interface SettingItems {
    isResizeScreen: boolean;
    isDAR43: boolean;
    isMovieSpacingZeroTop: boolean;
    isResizeSpacing: boolean;
    isMovieSpacingZeroLeft: boolean;
    isDblFullscreen: boolean;
    isCancelWheel: boolean;
    isVolumeWheel: boolean;
    changeMaxVolume: number;
    isHideButtons: boolean;
    isHideVoting: boolean;
    isStoreViewCounter: boolean;
    panelOpacity: number;
    audibleReloadWait: number;
    isHideReplayCommentButton: boolean;
    minResolution: number;
    maxResolution: number;
    isHideOldComment: boolean;
    isCustomPostWin: boolean;
    isSureReadComment: boolean;
    isCommentFormWithSide: boolean;
    isComeTriming: boolean;
    sureReadRefreshx: number;
    isCommentPadZero: boolean;
    isCommentTBorder: boolean;
    isCommentWide: boolean;
    isDelTime: boolean;
    highlightNewCome: number;
    highlightComeColor: number;
    highlightComePower: number;
    isUserHighlight: boolean;
    isMovingComment: boolean;
    movingCommentSecond: number;
    movingCommentLimit: number;
    kakikomiwait: number;
    comeMovingAreaTrim: boolean;
    comeFontsize: number;
    comeFontsizeV: boolean;
    isComeNg: boolean;
    isDeleteStrangeCaps: boolean;
    isComeDel: boolean;
    fullNg: string;
    isUserDel: boolean;
    userNg: string;
    isShareNGword: boolean;
    isShareNGuser: boolean;
    isComelistClickNG: boolean;
    isComeClickNGautoClose: boolean;
    mastodonInstance: string;
    mastodonToken: string;
    mastodonFormat: string;
    isTimeVisible: boolean;
    isProtitleVisible: boolean;
    isProTextLarge: boolean;
    proTitleFontC: boolean;
    notifySeconds: number;
    isNotifyAndOpen: boolean;
    isNaOinActive: boolean;
    isNotifyRemain: boolean;
    isNotifySound: boolean;
    isNotifyOnline: boolean;
    notifyOnlineMinutes: number;
    notifyMailAddress: string;
    notifyLNtoken: string;
    notifyPostUrl: string;
    isChTimetableBreak: boolean;
    isChTimetableWeekend: boolean;
    isChTimetablePlaybutton: boolean;
    timetableScroll: string;
    allowChannelNames: string;
    isExpandLastItem: boolean;
    isExpandFewChannels: boolean;
    isHideArrowButton: boolean;
    isPutSideDetailHighlight: boolean;
    isReplaceIcons: boolean;
    isHideTwitterPanel: boolean;
    isHideTodayHighlight: boolean;
    isInpWinBottom: boolean;
    isDelOldTime: boolean;
    // ComeColorSettings
    commentBackColor: number;
    commentBackTrans: number;
    commentTextColor: number;
    commentTextTrans: number;
    // radioSettings
    timePosition: string;
    protitlePosition: string;
    proSamePosition: string;
    panelopenset: number;
    // CMSettings
    isCMBlack: boolean;
    isCMBkTrans: boolean;
    isCMBkR: boolean;
    isCMsoundoff: boolean;
    isTabSoundplay: boolean;
    isCMsoundR: boolean;
    CMsmall: number;
    isCMsmlR: boolean;
    beforeCMWait: number;
    afterCMWait: number;
    isManualKeyCtrlR: boolean;
    isManualKeyCtrlL: boolean;
    isManualMouseBR: boolean;
    useEyecatch: boolean;
    isHidePopTL: boolean;
    isHidePopBL: boolean;
    isHidePopFresh: boolean;
}

export const settings: SettingList[] = [
    {
        description: '映像・表示・操作関連設定',
        isShowImage: true,
        settings: [
            {
                name: 'isResizeScreen',
                //        "description": "ウィンドウサイズに合わせて映像の端が切れないようにリサイズ(コメ欄開いた時映像の大きさは変わらずコメ欄にかぶります。)",
                //                "description": "映像をウィンドウに合わせてリサイズ、映像の位置を上に詰める (映像がウィンドウ外にはみ出なくなり、コメ欄などを開いても映像の大きさは変わらず映像の上に重なります。)",
                description:
                    '映像をウィンドウに合わせてリサイズし、縮小させない (コメ欄などを開いても映像が縮まず、映像の上に重なります。) ◆',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isDAR43',
                description:
                    '映像4:3用の処理を使用する(左右の黒帯部分を無視して映像の最大化を行います)',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isMovieSpacingZeroTop',
                description: '映像の上下位置を上に詰める',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isResizeSpacing',
                description:
                    '映像の上下位置を上に詰めるが、メニューの分だけ少し空ける',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isMovieSpacingZeroLeft',
                description:
                    '映像の左右位置を左に詰める(「映像をウィンドウに合わせてリサイズ」でコメントを映像にかぶせたくないときに便利です。)',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isDblFullscreen',
                description:
                    'ダブルクリックで全画面表示に切り替え＆全画面ボタンをF11相当のフルスクリーンに割り当て(コメント欄を表示したまま全画面にできます。)◆',
                // "instantDescription": "ダブルクリックで全画面表示に切り替え",
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'isCancelWheel',
                //        "description": "マウスホイールによる番組移動を禁止する",
                description: '上下矢印キーによる番組移動を無効化する',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'isVolumeWheel',
                //        "description": "マウスホイールによる番組移動を音量操作へ変更する",
                description:
                    'マウスホイールで音量を操作する（&番組移動無効化）',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'changeMaxVolume',
                description: '音量が最大(100)の場合は以下へ自動変更する',
                type: 'number',
                isInstantChangable: true,
                default: 100,
                range: [0, 100]
            },
            {
                name: 'isHideButtons',
                description: '全画面ボタンと音量ボタンを非表示',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isHideVoting',
                description: 'アンケート(投票機能)を非表示',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isStoreViewCounter',
                description:
                    'コメント欄開閉ボタンのコメント数の上に視聴数をコピーする',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'panelOpacity',
                description: '上下黒帯パネルの透過度(完全透明0～255不透明)',
                type: 'range',
                isInstantChangable: true,
                default: 127,
                range: [0, 255],
                hasDescImage: true
            },
            {
                name: 'audibleReloadWait',
                description:
                    '音声の再生が停止してから自動的にタブを更新するまでの秒数(3秒以上)',
                type: 'number',
                isInstantChangable: true,
                default: 20,
                range: [3]
            },
            {
                name: 'isHideReplayCommentButton',
                description:
                    '見逃し視聴でコメント数ボタンを隠す(見逃しコメント欄が開けなくなります。見逃し視聴時にコメントを絶対見ない場合に有効にしてください。)',
                type: 'boolean',
                isInstantChangable: false,
                default: false
            }
        ]
    },
    {
        description: '映像解像度設定(実験的)(現在無効)',
        header:
            'AbemaTVの仕様変更に対応できておらず、映像が映らなくなるため現在この設定は無効です。<br>この設定はabemaの映像取得に介入して無理やり解像度を変えるため不具合が生じる可能性があり、あまり推奨できません。もし映像が映らなくなったり不具合が生じればこの設定をデフォルト(最小0最大2160)に戻してみてください。CM時に止まりやすいです。<br>',
        footer:
            'デフォルトの最小=0,最大=2160に設定すると解像度変更は動作しません。映像が映らなくなったらデフォルトに戻してください。',
        settings: [
            {
                name: 'minResolution',
                description: '最小解像度',
                type: 'select',
                selections: [
                    { value: 0, string: '0' },
                    { value: 180, string: '180' },
                    { value: 240, string: '240' },
                    { value: 360, string: '360' },
                    { value: 480, string: '480' }
                ],
                isInstantChangable: true,
                default: 0
            },
            {
                name: 'maxResolution',
                description: '最大解像度',
                type: 'select',
                selections: [
                    { value: 0, string: '0' },
                    { value: 180, string: '180' },
                    { value: 240, string: '240' },
                    { value: 360, string: '360' },
                    { value: 480, string: '480' },
                    { value: 720, string: '720' },
                    { value: 1080, string: '1080' },
                    { value: 2160, string: '2160' }
                ],
                isInstantChangable: true,
                default: 2160
            }
        ]
    },
    {
        description: 'コメント欄関連設定',
        isShowImage: true,
        settings: [
            {
                name: 'isHideOldComment',
                description: 'コメント欄のスクロールバーを非表示にする',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isCustomPostWin',
                //        "description": "投稿ボタン削除・入力欄1行化",
                description: '投稿ボタン等を非表示',
                type: 'boolean',
                //        "isInstantChangable": false
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isSureReadComment',
                //        "description": "常にコメント欄を表示する",
                description:
                    '常にコメント欄を開こうとする(開閉が制限されている時は開けません)(設定時に右下のコメント数クリックで入力欄を残してコメント欄を閉じれます) ◇★',
                type: 'boolean',
                //        "isInstantChangable": false
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isCommentFormWithSide',
                description:
                    '↑有効時にコメント入力欄を右のボタンと連動して非表示(画面右のボタンがマウス無操作時に非表示になる場合、合わせて入力欄も非表示になります。この設定と併せて黒帯パネル開閉設定でコメント表示時に右のボタンをマウス反応で表示に設定してください。)',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isComeTriming',
                description:
                    '↑常にコメント欄を表示するような場合にコメント欄が上下に縮まないように上下黒帯を横に縮める',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isCommentPadZero',
                description: 'コメントの縦の隙間を詰める',
                instantDescription: 'コメントの縦の隙間を詰める',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isCommentTBorder',
                description: 'コメントの区切り線を付ける',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isCommentWide',
                description: 'コメントを横にほんの少し広げる',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isDelTime',
                description: '各コメントの投稿時刻を全て非表示にする。',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            },
            {
                name: 'highlightNewCome',
                description: '新着コメントを少し強調する',
                isInstantChangable: true,
                type: 'radio',
                selections: [
                    { value: 0, string: 'なし' },
                    { value: 1, string: '先頭マーク' },
                    { value: 2, string: '背景着色' },
                    { value: 3, string: '両方' }
                ],
                default: 0,
                hasDescImage: true
            },
            {
                name: 'highlightComeColor',
                description: '↑新着コメントの強調色',
                type: 'radio',
                isInstantChangable: true,
                default: 0,
                selections: [
                    { value: 0, string: '黄' },
                    { value: 1, string: '橙' },
                    { value: 2, string: '赤' },
                    { value: 3, string: '桃' },
                    { value: 4, string: '紫' },
                    { value: 5, string: '青' },
                    { value: 6, string: '水' },
                    { value: 7, string: '緑' },
                    { value: 8, string: '白' },
                    { value: 9, string: '黒' }
                ]
            },
            {
                name: 'highlightComePower',
                description: '↑新着コメントの背景着色の濃さ',
                type: 'range',
                isInstantChangable: true,
                default: 30,
                range: [0, 100]
            },
            {
                name: 'isUserHighlight',
                description:
                    'コメントにマウスオーバーで同一ユーザーのコメントの背景を黄色くする(同一人物のコメントを見分けるのに便利です。)',
                type: 'boolean',
                isInstantChangable: true,
                default: false,
                hasDescImage: true
            }
        ]
    },
    {
        description: 'コメント流し関連設定',
        isShowImage: false,
        settings: [
            {
                name: 'isMovingComment',
                description:
                    '新着コメントをあの動画サイトのように横に流す(コメント欄を開いているときのみ有効、コメント欄関連設定の「常にコメント欄を開こうとする」を同時に有効にすると常にコメントが流れるのでおすすめです。) ◇★(重くなることがあります)',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'movingCommentSecond',
                description:
                    '↑のコメントの速さ(コメントが画面を流れる秒数、小さいほど速い)',
                type: 'number',
                isInstantChangable: true,
                default: 8,
                range: [1]
            },
            {
                name: 'movingCommentLimit',
                description: '↑のコメントの同時表示上限',
                type: 'number',
                isInstantChangable: true,
                default: 50,
                range: [0]
            },
            {
                name: 'kakikomiwait',
                description:
                    '自分のコメントを流すまでの待ち時間(秒)マイナスだと流れない',
                type: 'number',
                isInstantChangable: true,
                default: 0
            },
            {
                name: 'comeMovingAreaTrim',
                description:
                    'コメントを流す領域の横幅を、ウィンドウ全体でなく映像の横幅に合わせる',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'comeFontsize',
                description: '流れるコメントの文字の大きさ(px)',
                type: 'number',
                isInstantChangable: true,
                default: 32,
                range: [1, 99]
            },
            {
                name: 'comeFontsizeV',
                description:
                    '流れるコメントの文字の大きさをウィンドウ縦長さに追従させる',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            }
        ]
    },
    {
        description: 'コメントNG関連設定',
        isShowImage: false,
        header:
            'コメントのワードNG、ユーザーNGを利用したいときはそれぞれ「指定した〜流さない」を有効にしてください。ユーザーNG追加には「コメント一覧クリックでNG追加欄を表示」も必要です。<br>',
        settings: [
            {
                name: 'isComeNg',
                description:
                    '流れるコメントから規定の単語を除去(顔文字,連続する単語など)',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'isDeleteStrangeCaps',
                description:
                    '↑に加えて、一般的な文字以外を全て削除する(英数字や漢字、ひらがな、一部の記号などは削除されません)',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'isComeDel',
                description:
                    '指定した単語が含まれるコメントは流さない(ワードNG)(「NG設定をコメント一覧にも適用する」も有効にしないとコメント欄には反映されません) ◇☆',
                type: 'boolean',
                isInstantChangable: true,
                default: true
            },
            {
                name: 'fullNg',
                description: 'NGワード(1行1つ、/正規表現/も可、//コメント)',
                type: 'textarea',
                isInstantChangable: true,
                default: ''
            },
            {
                name: 'isUserDel',
                description:
                    '指定したユーザーIDのコメントを流さない(ユーザーNG)(「NG設定をコメント一覧にも適用する」も有効にしないとコメント欄には反映されません。それと同時に「コメント一覧クリックでNG追加欄を表示」を有効にするとコメント欄からNG登録できます。) ◇☆',
                type: 'boolean',
                isInstantChangable: true,
                default: true
            },
            {
                name: 'userNg',
                description: '流さないユーザーID(1行1つ)',
                type: 'textarea',
                isInstantChangable: true,
                default: ''
            },
            {
                name: 'isShareNGword',
                description:
                    '<a href=\'https://abema.nakayuki.net/ngshare/\' target=\'_blank\'>共有NGワード</a>を有効にする(実験的)(追加したNGワードがサーバーに送信され、追加数の多いワードが自動で一時的なNGワードに設定されます。)',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'isShareNGuser',
                description:
                    '共有NGユーザーを有効にする(実験的)(追加したNGユーザーIDがサーバーに送信され、追加数の多いIDが自動で一時的なNGユーザーに設定されます。)',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'isComelistClickNG',
                //                "description": "コメント一覧クリックでNG追加欄を表示(このNG追加欄による保存は一時的です。永久保存は設定画面へ。)",
                description:
                    'コメント一覧クリックでNG追加欄を表示(NGボタン1回クリックで一時保存(黄色)、短時間で2回クリックすると永久保存(赤色)になります。)',
                type: 'boolean',
                isInstantChangable: true,
                default: true
            },
            {
                name: 'isComeClickNGautoClose',
                description: '↑でNG登録後、自動的にNG追加欄を閉じる',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            }
        ]
    },
    {
        description: 'コメントのMastodon投稿設定',
        header:
            'ホストとトークンを設定するとコメント欄の投稿ボタンの横にMastodonアイコンが追加されます。そのアイコンをクリックして切り替えてください。コメント欄関連設定で「投稿ボタン等を非表示」にしているとアイコンが表示されませんのでMastodon投稿を有効にできません。<br>',
        footer:
            '<input type=\'button\' id=\'getMastodonTokenBtn\' value=\'認証してトークンを取得\'><span id=\'authCodeArea\'></span>',
        instantHeader: '',
        settings: [
            {
                name: 'mastodonInstance',
                description:
                    'Mastodonインスタンスのホスト(mstdn.jpやpawoo.netやfriends.nicoなど)',
                type: 'text',
                default: '',
                isInstantChangable: false
            },
            {
                name: 'mastodonToken',
                description:
                    'Mastodon APIトークン(ホストを入力後下のボタンから取得できます、認証後画面のコードとは別物です)',
                instantDescription: 'Mastodon APIトークン',
                type: 'text',
                default: '',
                isInstantChangable: false
            },
            {
                name: 'mastodonFormat',
                description:
                    'トゥート内容フォーマット({comment}はコメント本文、{onairpage}は放送ページのURL、\\nは改行)',
                type: 'text',
                default: '{comment}\\n#AbemaTV\\n{onairpage}',
                isInstantChangable: true
            }
        ]
    },
    {
        description: '番組時間・タイトル表示関連設定',
        isShowImage: false,
        settings: [
            {
                name: 'isTimeVisible',
                //        "description": "コメント入力欄の近くに番組残り時間を表示",
                //        "description": "画面右上に番組残り時間を表示",
                description:
                    '番組残り時間を表示(AbemaTVの仕様上、一旦番組詳細パネルを開かないと取得できません) ',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'isProtitleVisible',
                description:
                    '番組タイトルを表示(AbemaTVの仕様上、一旦番組詳細パネルを開かないと取得できません)  ',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'isProTextLarge',
                description: '番組残り時間・タイトルの文字を大きくする',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'proTitleFontC',
                description:
                    '表示位置がコメント入力欄周辺の場合、番組残り時間・タイトルの文字色と残り時間バーの色をコメント欄に合わせる(現在この設定関係なく適用中)',
                type: 'boolean',
                isInstantChangable: true,
                default: true
            }
        ]
    },
    {
        description: '番組通知関連設定',
        isShowImage: false,
        settings: [
            {
                name: 'notifySeconds',
                description:
                    '番組通知を番組開始の何秒前にするか(番組表の番組ページから番組開始前の通知を設定できます。)',
                type: 'number',
                isInstantChangable: false,
                default: 60
            },
            {
                name: 'isNotifyAndOpen',
                description: '番組通知時に自動で新しいタブで放送画面を開く ◆',
                type: 'boolean',
                isInstantChangable: false,
                default: false
            },
            {
                name: 'isNaOinActive',
                description:
                    '↑既に開いている放送画面があれば新しいタブを開かずそのタブを切り替える(アクティブなタブ優先)',
                type: 'boolean',
                isInstantChangable: false,
                default: false
            },
            {
                name: 'isNotifyRemain',
                description:
                    '通知を自動で消さない(消すかクリックするまで通知ポップアップが消えないようにする)',
                type: 'boolean',
                isInstantChangable: false,
                default: false
            },
            {
                name: 'isNotifySound',
                description: '通知時に音を鳴らす',
                type: 'boolean',
                isInstantChangable: false,
                default: false
            },
            {
                name: 'isNotifyOnline',
                description:
                    '<a href=\'https://abema.nakayuki.net/notify/\' target=\'_blank\'>メールやLINE Notify等による通知</a>を有効にする(実験的)(ブラウザを起動していない時に便利です。以下をいずれか設定した内容が通知登録時にサーバーに送信されます。)',
                type: 'boolean',
                isInstantChangable: false,
                default: false
            },
            {
                name: 'notifyOnlineMinutes', // これ関係の設定はonairpage.jsでは変数代入も含めて完全ノータッチ
                description: '↑を番組開始の何分前に通知するか',
                type: 'number',
                isInstantChangable: false,
                default: 5
            },
            {
                name: 'notifyMailAddress',
                description: '↑の通知先メールアドレス',
                type: 'text',
                default: '',
                isInstantChangable: false
            },
            {
                name: 'notifyLNtoken',
                description:
                    '↑の通知先LINE Notifyのトークン <a href=\'https://abema.nakayuki.net/notify/#getLNtoken\' target=\'_blank\'>取得方法</a>',
                type: 'text',
                default: '',
                isInstantChangable: false
            },
            {
                name: 'notifyPostUrl',
                description:
                    '↑の通知POST先URL (slackのincoming webhookも設定可)',
                type: 'text',
                default: '',
                isInstantChangable: false
            }
        ],
        footer:
            '上の3つの通知先の内、必要分を設定してください。正しく設定されていないと通知登録に失敗します。新しい設定は設定変更後の通知登録から反映されます。'
    },
    {
        description: '番組表関連設定',
        isShowImage: true,
        settings: [
            {
                name: 'isChTimetableBreak',
                //                "description": "チャンネル別番組表ページにて、番組タイトルの改行位置を変更する (2桁の話数が改行よって数字1字ずつに分かれたりするのを防止)",
                description:
                    '番組表ページにて、番組タイトルの改行位置を変更する (2桁の話数が改行よって数字1字ずつに分かれたりするのを防止)',
                type: 'boolean',
                isInstantChangable: false,
                default: false
            },
            {
                name: 'isChTimetableWeekend',
                description:
                    'チャンネル別番組表ページにて、土曜を青、日曜を赤に着色する',
                type: 'boolean',
                isInstantChangable: false,
                default: true,
                hasDescImage: true
            },
            {
                name: 'isChTimetablePlaybutton',
                description:
                    '各番組表ページの放送中番組に放送画面へ移動するボタンを追加◆',
                type: 'boolean',
                isInstantChangable: false,
                default: true,
                hasDescImage: true
            },
            {
                name: 'timetableScroll',
                description:
                    '番組表を開いたときに指定したチャンネルまで自動スクロール(abema-news、drama、abema-animeなどのurl中のチャンネル名を一つ指定)',
                type: 'text',
                default: '',
                isInstantChangable: false,
                hasDescImage: true
            },
            {
                name: 'allowChannelNames',
                description:
                    '番組表で表示するチャンネル名を半角カンマ区切りで指定(番組表を指定したチャンネルのみの表示にできます)(番組表で各チャンネルリンクの右クリックメニューやチャンネル一覧のチェックボックスから切替可)',
                type: 'text',
                default: '',
                isInstantChangable: false,
                hasDescImage: true
            },
            {
                name: 'isExpandLastItem',
                description:
                    '番組表の一番下(日付変更付近)の細いマスを縦に少し伸ばしてちゃんと見えるようにする',
                type: 'boolean',
                isInstantChangable: false,
                default: false
            },
            {
                name: 'isExpandFewChannels',
                description:
                    '番組表に左右余白がある場合、各チャンネル列を横に伸ばす',
                type: 'boolean',
                isInstantChangable: false,
                default: false
            },
            {
                name: 'isHideArrowButton',
                description: '番組表の横移動ボタンを非表示',
                type: 'boolean',
                isInstantChangable: false,
                default: false,
                hasDescImage: true
            },
            {
                name: 'isPutSideDetailHighlight',
                description:
                    '番組表の右枠に詳細文を追加する(番組表本体の枠内に記載がある場合のみ、現在は記載がないことが多いようです。)',
                type: 'boolean',
                isInstantChangable: false,
                default: true
            },
            {
                name: 'isReplaceIcons',
                description:
                    '番組表のタイトルに付いているアイコンを開始時刻(分)の下へ移動(現在機能しないようです。)',
                type: 'boolean',
                isInstantChangable: false,
                default: false
            }
        ]
    },
    {
        description: '廃止予定の設定',
        settings: [
            {
                name: 'isHideTwitterPanel',
                description:
                    'パネル「twitterで通知を受け取る」を非表示(最近出現していないので廃止検討中)',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'isHideTodayHighlight',
                description:
                    '右上の「今日のみどころ」を放送中画面で非表示(このオプションはトップページには効きません)(最近出現していないので廃止検討中)',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'isInpWinBottom',
                description:
                    '<s>コメント入力欄を下へ(コメント一覧は逆順・下スクロール)</s>公式で最新コメントが下に来るようになったのでこの設定は無視されます。(廃止予定)',
                type: 'boolean',
                isInstantChangable: false, // 無視するためにfalse
                default: false
            },
            {
                name: 'isDelOldTime',
                description:
                    '<s>古いコメントの投稿時刻の表示を非表示にする。</s>現在機能しません。(実装が難しく需要が少なそうなので廃止検討中)',
                type: 'boolean',
                isInstantChangable: true,
                default: false
            },
            {
                name: 'sureReadRefreshx',
                //        "description": "読込済コメント数がx(101以上)を超えた時にコメ欄を閉じる(再度開く時に100以降の古いコメントが破棄される)",
                //        "description": "常にコメント欄を表示する場合で、読込済コメント数がx(101以上)を超えた時にコメ欄を閉じる(再度開く時に100以降の古いコメントが破棄される)",
                description:
                    '公式で表示コメント数に上限ができたので現在無効<s>読込済コメント数がx(101以上)を超えた時にコメ欄を閉じる(直ちに開き直され、古いコメントが破棄されることで動作が軽くなります。重いときは少なくすると軽くなります。コメント欄の開き直しによるカクつき・ちらつきが気になる場合は多くしてください。)</s>',
                type: 'number',
                isInstantChangable: true,
                default: 500,
                range: [101],
                hasDescImage: true
            }
        ]
    }
];
export const comeColorSettings: Setting[] = [
    {
        name: 'commentBackColor',
        description: 'コメント一覧の背景色(黒0～灰～255白)',
        type: 'range',
        isInstantChangable: true,
        default: 20,
        range: [0, 255]
    },
    {
        name: 'commentBackTrans',
        description: 'コメント一覧の背景の透明度(完全透明0～255不透明)',
        type: 'range',
        isInstantChangable: true,
        default: 191,
        range: [0, 255]
    },
    {
        name: 'commentTextColor',
        description: 'コメントの文字色(黒0～灰～255白)',
        type: 'range',
        isInstantChangable: true,
        default: 255,
        range: [0, 255]
    },
    {
        name: 'commentTextTrans',
        description: 'コメントの文字の透明度(完全透明0～255不透明)',
        type: 'range',
        isInstantChangable: true,
        default: 255,
        range: [0, 255]
    }
];
export interface RadioBlockSetting {
    name: string;
    type: string;
    list: (string | number)[][][];
    default: string | number;
    range?: any; // エラー押さえ込み
    isInstantChangable: boolean;
}
export const radioSettings: RadioBlockSetting[] = [
    {
        name: 'timePosition',
        type: 'radioblock',
        list: [
            [['windowtop', 'ウィンドウの右上（常時表示）']],
            [['windowbottom', 'ウィンドウの右下（常時表示）']],
            [['commentinputtop', 'コメント入力の右上']],
            [['commentinputbottom', 'コメント入力の右下']],
            [['header', '右上のメニューの上']],
            [['footer', '右下のコメント数の下']]
        ],
        default: 'windowtop',
        isInstantChangable: true
    },
    {
        name: 'protitlePosition',
        type: 'radioblock',
        list: [
            [
                ['windowtopleft', 'ウィンドウの左上（常時表示）'],
                ['windowtopright', 'ウィンドウの右上（常時表示）']
            ],
            [
                ['windowbottomleft', 'ウィンドウの左下（常時表示）'],
                ['windowbottomright', 'ウィンドウの右下（常時表示）']
            ],
            [
                ['commentinputtopleft', 'コメント入力の左上'],
                ['commentinputtopright', 'コメント入力の右上']
            ],
            [
                ['commentinputbottomleft', 'コメント入力の左下'],
                ['commentinputbottomright', 'コメント入力の右下']
            ],
            [
                ['headerleft', '左上のアイコンの上'],
                ['headerright', '右上のメニューの上']
            ],
            [
                ['footerleft', '左下のアイコンの下'],
                ['footerright', '右下のコメント数の下']
            ]
        ],
        default: 'windowtopleft',
        isInstantChangable: true
    },
    {
        name: 'proSamePosition',
        type: 'radioblock',
        list: [
            [
                ['over', '重ねる'],
                ['vertical', '縦'],
                ['horizontal', '横(コメ欄周辺で無効)'],
                ['horizshort', 'タイトルを少し左へ']
            ]
        ],
        default: 'over',
        isInstantChangable: true
    },
    {
        name: 'panelopenset',
        type: 'panelopenset',
        list: [
            [
                [255879, 'デフォルト'],
                [255892, '拡張機能おすすめ'],
                [531440, '常に表示'],
                [531441, 'カスタム']
            ]
        ],
        default: 255892,
        isInstantChangable: true
    }
];
export const CMSettings: Setting[] = [
    {
        name: 'isCMBlack',
        description: 'コメント数が表示されないとき画面真っ黒',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'isCMBkTrans',
        description: '↑を下半分だけ少し透かす',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'isCMBkR',
        description: '↑を映像クリックで解除・再適用する',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'isCMsoundoff',
        //            "description": "コメント数が表示されないとき音量ミュート",
        description: 'コメント数が表示されないときプレイヤーの音量ミュート',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'isTabSoundplay',
        description: '↑をプレイヤーでなくchromeタブ設定でミュートにする',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'isCMsoundR',
        description: '↑を映像クリックで解除・再適用する',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'CMsmall',
        //            "description": "コメント数が表示されないとき映像部分を1/xに縮小する",
        description:
            'コメント数が表示されないとき映像部分を100%(縮小なし)～5%に縮小する',
        type: 'number',
        isInstantChangable: true,
        default: 100
    },
    {
        name: 'isCMsmlR',
        description: '↑を映像クリックで解除・再適用する',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'beforeCMWait',
        description: 'コメント数が表示されなくなってから↑実行までの待機時間',
        type: 'number',
        isInstantChangable: true,
        default: 0
    },
    {
        name: 'afterCMWait',
        description: 'コメント数が表示されてから↑解除までの待機時間',
        type: 'number',
        isInstantChangable: true,
        default: 0
    },
    {
        name: 'isManualKeyCtrlR',
        description:
            '↑の待機中、右ctrlを押している間は実行しない（離すと即実行）',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'isManualKeyCtrlL',
        description:
            '↑の待機中、左ctrlを押している間は実行しない（離すと即実行）',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'isManualMouseBR',
        description:
            '↑の待機中、画面右下のコメ数表示部に1.2秒以上連続でカーソルを合わせている間は実行しない（カーソルを外すと即実行）',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'useEyecatch',
        description: '左上ロゴのタイミングに合わせる',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'isHidePopTL',
        description: '左上に出てくるロゴを非表示',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'isHidePopBL',
        description: '左下に出てくる通知を非表示',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    },
    {
        name: 'isHidePopFresh',
        description: '左下に出てくるFresh告知を非表示',
        type: 'boolean',
        isInstantChangable: true,
        default: false
    }
];
