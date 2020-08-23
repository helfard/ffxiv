'use strict';

const INFO = {
  // 各種情報
  name: 'Submarine Tkool',
  ver: '5.30812',
  title: '潜水艦ツクール',
  auther: 'Omochi Kinako (Chocobo)',
  url: 'https://jp.finalfantasyxiv.com/lodestone/character/17471563/blog/4205382/'
}

const address = new Vue({
  // ページのセットアップ
  el: '#address',
  data: INFO,
  mounted: function() {
    document.title = INFO.title; // タイトルをセット
    document.getElementById('title').textContent = INFO.title;
  }
});

const log = msg => {
  // デバッグ用のメッセージの表示
  if (DEBUG) console.log(msg);
}
