const DEBUG = location.hostname === 'localhost' ? true : false; // ローカル実行時はデバッグモードにする
const log = (...msgs) => { // デバッグ用のメッセージの表示
    const unfold = (msg) => { // 配列・オブジェクトの参照渡しを防ぐための再帰関数
        let out, put;
        if (Array.isArray(msg) || (msg.toString() === '[object Set]' && msg !== '[object Set]')) { // 配列もしくはSetの時
            // ↑ここはもうちょっとスマートにならんのか？
            out = [...msg];
            put = [];
            out.forEach(o => put.push(unfold(o)));
        } else if (typeof msg === 'object') { // オブジェクト
            out = Object.assign({}, msg);
            put = {};
            Object.keys(out).forEach(o => put[o] = unfold(out[o]));
        } else { // それ以外
            put = msg;
        }
        return put;
    }
    if (DEBUG) {
        if (msgs.length > 1) console.log('################################'); // オプションにより強調表示する
        for (const msg of msgs) {
            console.log(unfold(msg));
        }
        if (msgs.length > 1) console.log('################################'); // オプションにより強調表示する
    }
}

const loadJS = () => { // JSの読み込み（実質的には通知だけ）
    log('DATA: ' + document.currentScript.src.split('/').pop() + ' を読み込み');
}

const loadCss = () => { // CSSの読み込み
    // 読み込むCSSファイルはこのJSファイルの拡張子を.jsから.cssに変えたものになる
    // 必ず各JSファイルの中で読み込みをしておくこと
    const HREF = document.currentScript.src.split('/').pop().replace('.js', '.css');
    const LINK = document.createElement('link');
    LINK.setAttribute('rel', 'stylesheet');
    LINK.setAttribute('href', HREF);
    document.head.appendChild(LINK);
    log('Common: ' + HREF + ' を読み込み');
}
loadCss();

const saveStorage = (key, data) => { // ローカルストレージに保存
    const CODE = INFO.storageCode; // ローカルストレージのキーの頭に付ける符号
    localStorage.setItem(CODE + key, JSON.stringify(data));
}
const loadStorage = key => { // ローカルストレージから読み込み
    const CODE = INFO.storageCode; // ローカルストレージのキーの頭に付ける符号
    return JSON.parse(localStorage.getItem(CODE + key));
}
const storageVersionCheck = (() => { // ローカルストレージのデータのバージョンをチェック
    // バージョンが違ったら不具合対策として一旦消去する
    const CODE = INFO.storageCode; // ローカルストレージのキーの頭に付ける符号
    const KEY = 'AppVersion'; // ローカルストレージのバージョンデータのキー
    // コンフリクト対策に実際のキーは先頭にアプリごとのコードが追加される
    const KEYS = ['Language', 'Set', 'OpenedDetails', 'MultipleSelect', 'MapOrder', 'MapSize']; // このアプリで使用されているキー全て
    const CURRENT_VERSION = INFO.storageVersion; // 現在のバージョン
    const LOADED_VERSION = loadStorage(KEY); // 保存されていたバージョン
    if (LOADED_VERSION && LOADED_VERSION !== CURRENT_VERSION) {
        KEYS.forEach (key => localStorage.removeItem(CODE + key)); // 全てのデータを消去
        // localStorage.clear();は使うべきではない
        // （他のアプリ用のローカルストレージのデータまで消えてしまう）
        log('StorageVersionCheck: ローカルストレージのデータを消去');
    }
    saveStorage(KEY, CURRENT_VERSION); // 改めて保存
})();

const share = { // 共用データ
    // langの操作はlanguageから行う
    data: Vue.reactive({
        lang: 'ja', // 言語設定
    }),
    setLanguage (lang) { // 言語設定を変更
        this.data.lang = lang;
        // daga.langが変更されるとlanguageの方で検知されて諸々処理される
    }
}

const language = Vue.createApp({ // 言語設定
    data () {
        return {
            sharedData: share.data, // 共用データ
        }
    },
    computed: {
        LANGS: () => LANGS, // 言語リスト
        WORD: () => WORD, // 翻訳辞書
    },
    watch: {
        'sharedData.lang' (lang) {
            this.setLanguage(lang); // 言語設定を変更
            this.setTitle(); // ページタイトルをセット
        }
    },
    methods: {
        setLanguage (lang) { // 言語設定を変更
            document.documentElement.lang = lang; // ページ言語をセット
            log('Language: 言語設定を ' + lang + ' に設定');
            saveStorage('Language', lang); // ローカルストレージに言語設定を保存
            log('Language: ローカルストレージに言語設定（' + lang + '）をセーブ');
        },
        setTitle () { // ページタイトルをセット
            let title = this.WORD('タイトル')[this.sharedData.lang];
            document.title = title;
            log('Language: ページタイトルに ' + title + ' をセット');
        },
    },
    mounted () {
        let lang = loadStorage('Language'); // ローカルストレージから言語設定を所得
        if (lang && lang !== this.sharedData.lang) {
            share.setLanguage(lang); // 言語設定を変更
            log('Language: ローカルストレージから言語設定（' + lang + '）をロード');
        } else {
            // 言語設定が保存されていないか言語設定を変更しない場合はタイトルが白紙なので：
            this.setTitle(); // ページタイトルをセット
        }
    },
}).mount('#language');


const header = Vue.createApp({ // ヘッダー
    data () {
        return {
            sharedData: share.data, // 共用データ
        }
    },
    computed: {
        WORD: () => WORD, // 翻訳辞書
    },
}).mount('#title');


const address = Vue.createApp({ // フッター
    computed: {
        INFO: () => INFO, // 基本的な情報
    }
}).mount('#address');

const execCopy = string => { // 任意の文字列ををクリップボードにコピー
    // これは https://qiita.com/simiraaaa/items/2e7478d72f365aa48356 からパクった
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
    let result = document.execCommand('copy');
    document.body.removeChild(tmp);
    return result;
}
const shortenString = string => { // フルネームから省略形への変換処理
    const MAPS = { // 全角カタカナから半角カタカナへの変換辞書
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
