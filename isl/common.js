const DEBUG = location.hostname === 'localhost' ? true : false; // ローカル実行時はデバッグモード
const log = msg => {
    // デバッグ用のメッセージの表示
    const TIME = new Date().getSeconds();
    if (DEBUG) console.log(TIME + ' ' + msg);
};

const INFO = {
    // 基本設定
    name: 'Banishment!?',
    ver: '6.200904',
    auther: 'Omochi Kinako (Chocobo)',
    url: 'https://jp.finalfantasyxiv.com/lodestone/character/17471563/',
}

const store = {
    // 共用データ
    state: {
        lang: 'ja', // 言語設定
    },
    setLanguage: function (lang) {
        // 表示言語を変更
        this.state.lang = lang;
        document.documentElement.lang = lang;
        log('Store: SetLang: ' + lang);
    },
};

const language = new Vue({
    // 言語設定
    el: '#language',
    data: {
        currentLang: 'ja', // 言語設定（共用データとは別に保持した方が監視上の都合が良い）
        LANG: LANG, // 言語リスト
        WORD: WORD, // 辞書
    },
    methods: {
        setLanguage: function (lang) {
            this.currentLang = lang;
            // ローカルストレージに言語設定を保存
            localStorage.setItem('language', lang);
            store.setLanguage(lang); // グローバルの言語設定を変更
        }
    },
    mounted: function () {
        // ローカルストレージから言語設定を所得
        let lang = localStorage.getItem('language');
        if (lang) {
            this.currentLang = lang; // ローカルの言語設定を変更
            store.setLanguage(lang); // グローバルの言語設定を変更
        }
    },
});

const header = new Vue({
    // ヘッダー
    el: '#title',
    data: {
        WORD: WORD, // 辞書データ
        INFO: INFO, // 基本設定
        sharedState: store.state, // 共用データ（言語設定を含む）
    },
    methods: {
        setTitle: function () {
            // タイトルをセット
            let title = WORD['title'][this.sharedState.lang];
            document.title = title;
            log('Header: SetTitle: ' + title);
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
        INFO: INFO, // 基本設定
        storageVersion: '2', // ローカルストレージの保存形式の版
    },
    methods: {
        checkLocalStorageVersion: function () {
            // ローカルストレージの保存形式の版が異なる場合は一度全て削除する
            let currentVersion = this.storageVersion;
            let savedVersion = localStorage.getItem('storageVersion');
            if (currentVersion !== savedVersion) {
                localStorage.clear();
                localStorage.setItem('storageVersion', currentVersion);
                log('Footer: Cleard LocalStorage.');
            }
        }
    },
    mounted: function () {
        this.checkLocalStorageVersion();
    }
});

const execCopy = string => {
    // 任意の文字列ををクリップボードにコピー
    // https://qiita.com/simiraaaa/items/2e7478d72f365aa48356 からパクった
    let tmp = document.createElement('div');
    let pre = document.createElement('pre');
    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';
    tmp.appendChild(pre).textContent = string;
    let s = tmp.style;
    s.position = 'fixed';
    s.right = '200%';
    document.body.appendChild(tmp);
    document.getSelection().selectAllChildren(tmp);
    let result = document.execCommand("copy");
    document.body.removeChild(tmp);
    return result;
}
