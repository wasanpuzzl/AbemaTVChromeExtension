# AbemaTVを少しだけ見やすくするChrome拡張

## 概要
これはChromeでAbemaTVを視聴しやすくする拡張機能です。主に以下のような機能があります。多くの機能はデフォルトで無効なため、使用するためには拡張機能の設定で有効にする必要があります。
- 上下の黒帯パネルを透明化
- コメント等を開いても映像を縮小させない、左寄せ
- コメント欄の透過度や色、表示スタイルのカスタマイズ、常時表示、新着強調表示
- コメントのワードNGやユーザーNG、共有NG
- あの動画サイトのように新着コメントを流す
- 番組開始通知(設定により自動で放送画面を開いたりメールやLINE notify等に通知も可能)
- 音量、全画面表示ボタンを非表示やマウスホイールで音量調整
- 番組タイトルや残り時間ゲージを画面上に表示
- 番組表の改善(番組タイトルの表示調節、週末青赤着色、放送画面へのリンク設置、拡張機能の通知登録)
- 「Twitterで通知を受け取る」パネル、放送画面の「今日のみどころ」など非表示
- コメントのMastodon投稿
- 解像度調整(実験的、不具合が発生する可能性大)
- 特定のときに画面を真っ黒にしたりミュートにする機能は設定画面から非表示にしました。

<!--
コメント数無効関連は非表示、オプション画面でuuddlrlrba  
仕様変更により挙動がやや不安定です。
- (設定で有効)コメント数無効時に画面真っ黒(下半分だけ透かすことも可)
- (設定で有効)コメント数無効時にミュート
-->

設定画面には上記に挙げた以外にも多くの設定項目があります。文字ばかりですが、説明を見ながら自由にカスタマイズしてください。  
AbemaTV公式の仕様変更や個々の環境や設定の組み合わせによって不具合が生じることがあります。その場合は設定画面の下から不具合報告フォームに飛んで報告お願いします。
バージョン番号は基本的にウェブストア版を更新するときに増え、そうでないときはそのままです。
改造、修正など煮るなり焼くなり公式に取り入れるなり自由にどうぞ。
Linux上のChromiumで確認しながら実装しています。

## これから目指す目標(TODO)
- Webpackによるファイルの分割やTypeScriptによる近代的な構成
- AbemaTVの仕様に依存する部分との疎結合
- シンプルな使用感
- 他のツールとの競合に配慮

### 規定のNG処理について
過度な期待は禁物
- (´･ω･｀)などの顔文字は可能な限り除去（不完全です）←このようなカッコを除去せず残すため
- twitterの#ハッシュタグや@宛先のようなものは除去
- ttp://URLは除去.net
- 同同同じ文字の繰り返しは3文字に短縮
- 同じ単語の繰り返しは2回に短縮短縮
- その他、改行や伸ば～～～し棒などに規定の処理があります。onairpage.js内の関数comeNGを参照。

### 自由入力欄の書式について
- 全ての行を1行ずつ処理していきます。改行は単語の区切りとなります。
- 通常の単語はそのまま記述してください。💦などの絵文字も扱えるはず。
- /(a|b|c)/iのように半角スラッシュで挟むと、正規表現として処理しようとします。
- /(a|b|c/igiのように正規表現に失敗すると、通常の単語として扱います。
- 行頭または文中の半角スラッシュ2回//以降の文字列はコメントとして扱います。/&#042;この形式&#042;/は現在非対応

## インストール方法
Chromeウェブストアに公開しました。[_bem_tv ext](https://chrome.google.com/webstore/detail/bemtv-ext/jgbkfdjdcbohgenpccfgldadaofnfknl?hl=ja&gl=JP) からインストールできます。インストール後、拡張機能のオプション画面で必要な機能を有効にしてください。

## 開発時の読み込み方法  
- node.jsやnpmが使える環境を整える
- ファイル一式をダウンロードする(git cloneなど)
- `$ npm install`する
- `$ npm run dev`する(ファイルの変更を監視して自動で更新します)
- Chromeのその他のツール→拡張機能を開く
- 右上のデベロッパーモードをチェックする
- `$ npm run dev`している状態で「パッケージ化されていない拡張機能を読み込む」をクリックし`dist`ディレクトリを選ぶ
- ファイルを変更するたびにdistディレクトリが更新され、同時に拡張機能も再読込されるので円滑に開発ができます。

注：拡張機能が機能していないようであればAbemaTVを再読み込みしてください。また、危害を与える恐れがある云々とデベロッパーモードに関する警告が出ることがあります。(この拡張機能を信頼して使用する場合はキャンセルを押せばOKです)  
Firefox対応のため、拡張機能を読み込んだときにオレンジのエラーが出ます。気にしないでください。

放送画面右の設定ボタン、または番組残り時間をクリックすると設定ウィンドウが表示されますが、
このウィンドウでの設定は一時的なものであり、他のタブには反映されないし、このタブを閉じると全て破棄されます。
自由入力欄のNG単語なども失われますのでご注意ください。
永続的な設定はChromeの拡張機能のオプション画面でのみ行います。

## Firefox対応
Firefoxへの対応を目指して実験的にfirefoxでも読み込めるようにしています。そのためWebExtensionに対応したfirefoxでも一応使用できます。  
Firefoxではオプション画面へのアクセス手段がないのでAbemaTVのページの黒帯右上のその他のメニューか一時設定画面にあるリンクからオプション画面を開いてください。  
この拡張機能はChrome前提で作られているのでFirefoxではうまく動かない可能性が大きいです。コメント流しなど主要な機能を簡単に確認しただけなのでバグが多いと思われます。  
Firefox版は署名済みのものが[このページ](https://www.nakayuki.net/abema-ext/)からダウンロードできます。WebExtension非対応のFirefoxでは壊れたアドオンとみなされるので注意してください。Mozillaの公式アドオンサイトには審査に時間がかかるので掲載しない予定です。  

<!--firefoxで読み込む際は元からあるChrome用のmanigest.jsonは使用せず、manifest-fx.jsonをmanifest.jsonにリネームして使用してください。  
firefoxでabout:debuggingを開けば一時的に拡張機能を読み込むことができます。(このフォルダの(↑でリネームした)manifest.jsonを選択)firefoxを起動している間だけ使用できます。(一旦閉じると拡張が消えてしまいます。)  
Firefox Developer Edition と Firefox Nightlyでは野良拡張の読み込みも可能です。about:configを開きxpinstall.signatures.requiredをfalseに設定の上で、manifest.jsonをfirefox用のに置き換えた上でこの拡張機能のファイル一式をzipで固め、拡張子を.xpiに変更しアドオンページからインストールできます。-->

## アップデート方法
ウェブストアから入れた場合はある程度更新がまとまったらウェブストア版も更新されますが、ウェブストアに最新版が公開されてから手元の拡張機能が最新になるまで時間がかかります。その場合は、Chromeの拡張機能の画面でデベロッパーモードにして「拡張機能を今すぐ更新」をクリックすればすぐ最新版になります。
デベロッパーモードからインストールした場合、既存の拡張機能を削除して入れ直すか、既存のフォルダ内を全部新版に置き換えて拡張機能の再読み込みをしてください。

## 更新履歴
Githubに公開以降はコミット履歴が残るので、原則としてこの更新履歴は更新しません。  
04/23 - 初版公開  
04/25 - abematv側の仕様変更で使えなくなったので修正、映像サイズ変更をデフォルト無効、jQueryを使用  
04/27 - 他の方の改造版の機能も含め機能追加、オプション設定画面追加  
04/27 - 整理してgithubへ  
05/03 - NG処理など追加  
05/08 - 一部機能を設定画面から非表示に  
05/09 - Chromeウェブストア公開

## 開発
この拡張機能の開発はgithubで行っています。プルリク等してもらえたらマージしていきます。
現在、webpack等によるファイル分割化とtypescriptへの移行を少しずつ進めていく予定です。

Chromeウェブストアへ公開しました。
正規な視聴をより快適にする目的でDOM操作とCSSの追加をしているだけですので大目に見てください。
データや映像の取得やその手助けするような機能は一切ありません。
もし何か問題がありましたら設定画面の不具合報告報告フォームからお願いします。(設定内容等が同時に送信されるので検証がしやすいです。)2ch.netのAbemaTVスレッド(アベマ板の技術部スレやYouTube板)などで情報交換されたりしました。


## ↓以下はgenerator-chrome-extension-kickstart-typescriptが生成した説明を訳したもの
## 依存モジュールのインストール

	$ npm install

## 開発時の使用法

`$ gulp --watch` を実行して `dist`ディレクトリをChromeで読み込む

## 基軸になるファイル(バンドル)

バンドルを生成する２つの基軸になるファイルがあります

1. 全てのtsファイルの根底は`./app/scripts`ディレクトリ
2. 全てのcss,scss,lessファイルの根底は`./app/styles`ディレクトリ

## タスク

### ビルド

    $ gulp


| オプション       | 説明                                                                                                                                                   |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | 全てのassetを監視して活性読み込みサーバーを起動する. <br>拡張機能の変更時に読み込むために`livereload.js`をインクルードすること.                                     |
| `--production` | 全てのassetをminifyする.                                                                                                                               |
| `--verbose`    | コンソールに追加のデータをログする.                                                                                                                        |
| `--vendor`     | 違うベンダ(chrome, firefox, opera, edge)用に拡張機能をコンパイル.  デフォルト: chrome                                                                    |
| `--sourcemaps` | ソースマップの生成を強制.  デフォルト: !production                                                                                               |


### パッケージ化

`dist`ディレクトリを圧縮して`packages`ディレクトリに保存します.

    $ gulp pack --vendor=firefox

### バージョン

`manifest.json`と`package.json`のバージョン番号を上げて、
変更をgitにコミットしタグをつけます.


    $ gulp patch      // => 0.0.X

or

    $ gulp feature    // => 0.X.0

or

    $ gulp release    // => X.0.0


## グローバル変数

ビルドツールはまた、スクリプト内の`process.env.NODE_ENV`という変数を定義します. `--production`オプションを使わない限り`development`がセットされます.


**例:** `./app/background.ts`

```typescript
if(process.env.NODE_ENV === 'development'){
  console.log('開発モードだよ！');
}
```






