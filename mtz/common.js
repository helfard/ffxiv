'use strict';

const INFO = {
  // 各種情報
  name: 'Submarine Mitzmorl',
  ver: '0.6511205',
  title: '潜水艦ミッツモール',
  auther: 'Omochi Kinako (Chocobo)',
  url: 'https://jp.finalfantasyxiv.com/lodestone/character/17471563/blog/4384735/'
}

const address = new Vue({
  // ページのセットアップ
  el: '#address',
  data: INFO,
  mounted: function () {
    document.title = INFO.title; // タイトルをセット
    document.getElementById('title').textContent = INFO.title;
  }
});

const log = msg => {
  // デバッグ用のメッセージの表示
  if (DEBUG) console.log(msg);
}
const execCopy = string => {
  // 任意の文字列ををクリップボードにコピー
  // https://qiita.com/simiraaaa/items/2e7478d72f365aa48356 からパクった
  var tmp = document.createElement('div')
  var pre = document.createElement('pre')
  pre.style.webkitUserSelect = 'auto'
  pre.style.userSelect = 'auto'
  tmp.appendChild(pre).textContent = string
  var s = tmp.style
  s.position = 'fixed'
  s.right = '200%'
  document.body.appendChild(tmp)
  document.getSelection().selectAllChildren(tmp)
  var result = document.execCommand('copy')
  document.body.removeChild(tmp)
  return result
}
const shortenString = string => {
  // フルネームから省略形への変換処理
  const MAPS = {
      // 全角カタカナから半角カタカナへの変換辞書
      'ガ': 'ｶﾞ', 'ギ': 'ｷﾞ', 'グ': 'ｸﾞ', 'ゲ': 'ｹﾞ', 'ゴ': 'ｺﾞ',
      'ザ': 'ｻﾞ', 'ジ': 'ｼﾞ', 'ズ': 'ｽﾞ', 'ゼ': 'ｾﾞ', 'ゾ': 'ｿﾞ',
      'ダ': 'ﾀﾞ', 'ヂ': 'ﾁﾞ', 'ヅ': 'ﾂﾞ', 'デ': 'ﾃﾞ', 'ド': 'ﾄﾞ',
      'バ': 'ﾊﾞ', 'ビ': 'ﾋﾞ', 'ブ': 'ﾌﾞ', 'ベ': 'ﾍﾞ', 'ボ': 'ﾎﾞ',
      'パ': 'ﾊﾟ', 'ピ': 'ﾋﾟ', 'プ': 'ﾌﾟ', 'ペ': 'ﾍﾟ', 'ポ': 'ﾎﾟ',
      'ヴ': 'ｳﾞ', 'ヷ': 'ﾜﾞ', 'ヺ': 'ｦﾞ',
      'ア': 'ｱ', 'イ': 'ｲ', 'ウ': 'ｳ', 'エ': 'ｴ', 'オ': 'ｵ',
      'カ': 'ｶ', 'キ': 'ｷ', 'ク': 'ｸ', 'ケ': 'ｹ', 'コ': 'ｺ',
      'サ': 'ｻ', 'シ': 'ｼ', 'ス': 'ｽ', 'セ': 'ｾ', 'ソ': 'ｿ',
      'タ': 'ﾀ', 'チ': 'ﾁ', 'ツ': 'ﾂ', 'テ': 'ﾃ', 'ト': 'ﾄ',
      'ナ': 'ﾅ', 'ニ': 'ﾆ', 'ヌ': 'ﾇ', 'ネ': 'ﾈ', 'ノ': 'ﾉ',
      'ハ': 'ﾊ', 'ヒ': 'ﾋ', 'フ': 'ﾌ', 'ヘ': 'ﾍ', 'ホ': 'ﾎ',
      'マ': 'ﾏ', 'ミ': 'ﾐ', 'ム': 'ﾑ', 'メ': 'ﾒ', 'モ': 'ﾓ',
      'ヤ': 'ﾔ', 'ユ': 'ﾕ', 'ヨ': 'ﾖ',
      'ラ': 'ﾗ', 'リ': 'ﾘ', 'ル': 'ﾙ', 'レ': 'ﾚ', 'ロ': 'ﾛ',
      'ワ': 'ﾜ', 'ヲ': 'ｦ', 'ン': 'ﾝ',
      'ァ': 'ｧ', 'ィ': 'ｨ', 'ゥ': 'ｩ', 'ェ': 'ｪ', 'ォ': 'ｫ',
      'ッ': 'ｯ', 'ャ': 'ｬ', 'ュ': 'ｭ', 'ョ': 'ｮ', 'ー': 'ｰ',
  }
  const REG = new RegExp('(' + Object.keys(MAPS).join('|') + ')', 'g'); // 変換用の正規表現
  return string.replace(REG, match => MAPS[match]);
}