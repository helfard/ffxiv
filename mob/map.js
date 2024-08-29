loadJS(); // JSの読み込み
loadCss(); // CSSの読み込み

const map = Vue.createApp({ // 地図
    data () {
        return {
            checkedSet: this.initializeCheckedSet(), // 選択された手配書（checkedSet[拡張][難易度] = [index, index, ...]）
            /*
            checkedSet: {
                '黄金': { '初級': [], '中級': [], '上級': [] },
                '暁月': { '初級': [], '中級': [], '上級': [] },
                ...
            },
            */
            mapOrder: 'default', // 地図の表示順（0: デフォルト, 1: 拡張順）
            mapSize: 400, // 適用中の地図の表示サイズ（px）
            sizeOption: { '極小': 200, '小': 300, '中': 400, '大': 500, '極大': 600 }, // 地図の表示サイズ（px）
            defaultRadius: 8, // 生息範囲の直径（地図全体の幅に対する%）
            syncRate: { 'ja': 1, 'en': 2, 'zh-TW': 1, 'zh-CH': 1, 'ko': 1, 'fr': 2, 'de': 2 }, // 名前の長さによる位置ずれ補正
            sharedData: share.data, // 共用データ
        }
    },
    computed: {
        LANGS: () => LANGS, // 言語リスト
        WORD: () => WORD, // 翻訳辞書
        PATCHS: () =>  PATCHS, // 拡張一覧
        LEVELS: () => LEVELS, // 難易度
        AREA: () => AREA, // エリアデータ
        MONSTER: () => MONSTER, // モンスター一覧
        SET: () => SET, // 組み合わせ一覧
        areas: function () {
            // エリア一覧
            return this.mapOrder === 'default' ? AREAS : AREAS_ALT;
        },
        areaTarget: function () {
            // 地域ごとの討伐対象一覧
            /*
            areaTarget: {
                'オルコ・パチャ': {
                    '名前': { area: 'オルコ・パチャ', x: 0, y: 0, r: 0 },
                    '名前': {},
                    ...
                },
                'コザマル・カ': { '名前': {}, '名前': {}, ... },
                ...
            },
            */
            const SET = this.SET;
            const PATCHS = this.PATCHS;
            const LEVELS = this.LEVELS;
            const MONSTER = this.MONSTER;
            let checkedSet = this.checkedSet;
            let areaTarget = {};
            for (let patch of PATCHS) {
                for (let level of LEVELS[patch.nickName]) {
                    for (let index of checkedSet[patch.nickName][level]) {
                        for (let targetName of SET[patch.nickName][level][index]) {
                            let targetData = MONSTER[patch.nickName][targetName];
                            let area = targetData.area;
                            if (!areaTarget[area]) areaTarget[area] = {};
                            areaTarget[area][targetName] = targetData;
                            // モンスター名のSetにしようかと思ったが後でMONSTERからXY座標を引くのに拡張名が必要になるのがめんどいので全データを紐付けることにした
                            // こういう形でプロパティを作るとリアクティブにならないはずだが別に困らない
                        }
                    }
                }
            }
            return areaTarget;
        },
    },
    watch: {
        mapSize: function (mapSize) {
            // ローカルストレージに複数選択可フラグを保存
            this.saveStorage('MapSize', mapSize);
        },
        mapOrder: function (value) {
            // ローカルストレージに地図の表示順を保存
            this.saveStorage('MapOrder', value);
        },
    },
    methods: {
        initializeCheckedSet () {
            // 選択された手配書の初期化
            return PATCHS.reduce((patchSet, patch) => {
                patchSet[patch.nickName] = LEVELS[patch.nickName].reduce((levelSet, level) => {
                    levelSet[level] = [];
                    return levelSet;
                }, {});
                return patchSet;
            }, {});
        },
        setCheckedSet: function (set) {
            // フォームデータの反映
            this.checkedSet = {...set};
        },
        showFlag: function (area) {
            return Object.keys(this.areaTarget[area]).length > 0;
        },
        saveStorage: function (key, value) {
            // ローカルストレージにデータを保存
            saveStorage(key, value);
            log('MAP: ローカルストレージに ' + key + ' を保存');
        },
        loadStorage: function (key) {
            // ローカルストレージからデータを所得
            let storageData = loadStorage(key);
            log('MAP: ローカルストレージから ' + key + ' を所得');
            if (storageData) {
                return storageData;
            } else {
                return null;
            }
        },
    },
    mounted () {
        // ローカルストレージから地図のサイズを所得
        let mapSize = this.loadStorage('MapSize');
        if (mapSize) this.mapSize = mapSize;
        // ローカルストレージから地図の表示順を所得
        let mapOrder = this.loadStorage('MapOrder');
        if (mapOrder) this.mapOrder = mapOrder;
    },
    updated () {
    },
}).mount('#map');
