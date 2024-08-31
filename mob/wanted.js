loadJS(); // JSの読み込み
loadCss(); // CSSの読み込み

const wanted = Vue.createApp({ // 手配書
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
            multipleSelect: false, // 複数選択可フラグ
            sharedData: share.data, // 共用データ
        }
    },
    computed: {
        LANGS: () => LANGS, // 言語リスト
        WORD: () => WORD, // 翻訳辞書
        PATCHS: () =>  PATCHS, // 拡張一覧
        LEVELS: () => LEVELS, // 難易度
        SET: () => SET, // モンスターの組み合わせ一覧
    },
    watch: {
        checkedSet: {
            handler (checkedSet) {
            // ローカルストレージに選択済みデータを保存
            this.saveStorage('Set', checkedSet);
            // 地図にデータを送る
            this.sendData();
            },
            deep: true
        },
        multipleSelect: function (multipleSelect) {
            // ローカルストレージに複数選択可フラグを保存
            this.saveStorage('MultipleSelect', multipleSelect);
        },
        sharedData: {
            handler (sharedData) {
                // 韓国語版はまだ黄金が配信されていないので黄金のデータは排除
                if (sharedData.lang === 'ko') this.checkedSet['黄金'] = { '初級': [], '中級': [], '上級': [] };
            },
            deep: true
        }
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
        checkMultipleSelect (patchName, level, index) {
            // 複数選択不可なら同難易度の他のチェックを外す
            // クリックによるフォームデータの操作よりもこの処理のタイミングが先になる
            let multipleSelect = this.multipleSelect;
            if (!multipleSelect) {
                if (this.checkedSet[patchName][level].length === 1 && this.checkedSet[patchName][level].includes(index)) {
                    this.checkedSet[patchName][level] = [index + ''];
                } else {
                    this.checkedSet[patchName][level].splice(0);
                }
            }
        },
        clearAll () {
            // 手配書の選択をリセット
            const PATCHS = this.PATCHS;
            const LEVELS = this.LEVELS;
            for (let patch of PATCHS) {
                for (let level of LEVELS[patch.nickName]) {
                    this.checkedSet[patch.nickName][level].splice(0);
                }
            }
        },
        sendData () {
            // 地図にデータを送る
            log('WANTED: MAP にデータを送信');
            map.setCheckedSet(this.checkedSet);
        },
        saveOpenedDetails (index) {
            // 手配書の展開状況をローカルストレージに保存
            // 手配書の展開状況を変数として持っておく必要はない
            const PATCHS = this.PATCHS;
            let openedDetails = Array(PATCHS.length).fill(false); // 手配書の展開状況
            openedDetails.forEach((_, i) => {
                let element = document.getElementById('detail_' + i);
                if (element) {
                    openedDetails[i] = element.getAttribute('open') !== null; // open属性があればtrueに
                } else {
                    openedDetails[i] = false;
                }
            });
            // クリックによるopen属性の操作よりもここの処理のタイミングが先なため、クリックした手配書だけフラグを反転させる
            openedDetails[index] = !openedDetails[index];
            this.saveStorage('OpenedDetails', openedDetails);
        },
        saveStorage: function (key, data) {
            // ローカルストレージにデータを保存
            saveStorage(key, data);
            log('WANTED: ローカルストレージに ' + key + ' を保存');
        },
        loadStorage: function (key) {
            // ローカルストレージからデータを所得
            log('WANTED: ローカルストレージから ' + key + ' を所得');
            return loadStorage(key);
        },
    },
    mounted () {
        // ローカルストレージから選択済みデータを所得
        let checkedSet = this.loadStorage('Set');
        if (checkedSet) this.checkedSet = { ...this.checkedSet, ...checkedSet };
        // ローカルストレージから複数選択可フラグを所得
        let multipleSelect = this.loadStorage('MultipleSelect');
        if (multipleSelect) this.multipleSelect = multipleSelect;
        // ローカルストレージから手配書の開閉状況を所得して反映
        let openedDetails = this.loadStorage('OpenedDetails');
        if (openedDetails) {
            openedDetails.forEach((value, index) => {
                let element = document.getElementById('detail_' + index);
                // アップデートで拡張が減ると該当のIDが存在しない場合があるのでifで…
                if (element) element.toggleAttribute('open', value);
            });
        }
        // 手配書の展開状況を変数として持っておく必要はない
    },
    updated () {
    },
}).mount('#wanted');
