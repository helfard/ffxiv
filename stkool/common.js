const DEBUG = true; // デバッグモード
const log = msg => {
  // デバッグ用のメッセージの表示
  let date = new Date();
  if (DEBUG) console.log(date.getSeconds() + ' ' + msg);
};

const store = {
  // 共用データ
  state: {
    name: 'Submersible Maker',
    ver: '5.30922',
    auther: 'Omochi Kinako (Chocobo)',
    url:
      'https://jp.finalfantasyxiv.com/lodestone/character/17471563/blog/4205382/',
    lang: 'ja', // 言語設定
  },
  setLang: function (lang) {
    log('Store:');
    log(' SetLang: ' + lang);
    this.state.lang = lang;
  },
};

const language = new Vue({
  // 言語設定
  el: '#lang',
  data: {
    langs: LANGS, // 言語リスト
    lang: 'ja', // 言語設定（ローカル）
    storelang: store.state.lang, // 言語設定（グローバル）
    // データ変更時のトリガー監視の都合でローカルとグローバルは分けた方が都合が良かった。
  },
  mounted: function () {
    // ローカルストレージから言語設定を所得
    const LANG = localStorage.getItem('lang');
    if (LANG) {
      this.lang = LANG; // 言語設定を変更
      log('Language:');
      log(' LocalStorage(Get): ' + LANG);
      store.setLang(LANG); // 言語設定を変更
    }
  },
  updated: function () {
    // ローカルストレージに言語設定を保存
    const LANG = this.lang;
    localStorage.setItem('lang', LANG);
    log('Language:');
    log(' LocalStorage(Set): ' + LANG);
    store.setLang(LANG); // 言語設定を変更
  },
});

const header = new Vue({
  // ヘッダー
  el: '#title',
  data: {
    words: WORDS, // 辞書データ
    sharedState: store.state, // 共用データ
  },
  methods: {
    setTitle: function () {
      // タイトルをセット
      const TITLE = this.words['title'][this.sharedState.lang];
      document.title = TITLE;
      document.getElementById('title').textContent = TITLE;
      log('Header:');
      log(' SetTitle: ' + TITLE);
    },
  },
  updated: function () {
    this.setTitle();
  },
  mounted: function () {
    this.setTitle();
  }
});

const address = new Vue({
  // フッター
  el: '#address',
  data: {
    words: WORDS, // 辞書データ
    sharedState: store.state, // 共用データ
  },
});
