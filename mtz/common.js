'use strict';

const INFO = {
  // 各種情報
  name: 'Submarine Mitzmorl',
  ver: '0.6180803',
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