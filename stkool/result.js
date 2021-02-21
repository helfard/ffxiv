const result = new Vue({
    // 結果一覧
    el: '#result',
    data: {
        parts: [], // 手持ちパーツのリスト
        rank: 50,
        filters: [...PARA_S].fill(null), // フィルタ設定
        ships: [], // 組み合わせリスト
        maxShips: 100, // 最大表示件数
        forceShowFlag: false, // 最大表示件数を越えて強制的に表示するフラグ
        markedShips: [], // コピペ用チェックリスト
        copyFlag: false,
        sortKeys: [ // ソート用のキー
            { key: 'body', reverse: false },
            { key: 'tail', reverse: false },
            { key: 'head', reverse: false },
            { key: 'bridge', reverse: false },
            { key: 0, reverse: false },
            { key: 1, reverse: true },
            { key: 2, reverse: true },
            { key: 3, reverse: true },
            { key: 4, reverse: true },
            { key: 5, reverse: true },
            { key: 'sum', reverse: true }
        ],
        sharedState: store.state, // 共用データ
        // WORDS: 辞書データ
        // BUI: 部位
        // KYU_S: 級（短縮形）
        // BONUS: ランク補正
        // PARA_S: パラメータ（短縮形）
        // SEINO: パーツ性能
        // SORT_KEYS: ソート用キーリスト
    },
    methods: {
        setParts: function (parts, rank) {
            this.parts = parts;
            this.rank = rank;
            this.buildShips();
        },
        setFilters: function (filters) {
            this.filters = filters;
            this.buildShips();
        },
        buildShips: function () {
            const B = BUI.length;
            let rankBonus = BONUS[this.rank];
            // パーツリストから全ての組み合わせを作る
            let ships = [];
            let ary = [...KYU_S.keys()];
            ary.forEach(body => {
                if (this.parts.includes(body * B)) ary.forEach(tail => {
                    if (this.parts.includes(tail * B + 1)) ary.forEach(head => {
                        if (this.parts.includes(head * B + 2)) ary.forEach(bridge => {
                            if (this.parts.includes(bridge * B + 3)) {
                                let ship = {
                                    // shipは参照渡しなので毎回初期化が必要
                                    body: body,
                                    tail: tail,
                                    head: head,
                                    bridge: bridge,
                                    para: [],
                                }
                                PARA_S.forEach((p, i) => ship.para[i] = SEINO[body][0][i] + SEINO[tail][1][i] + SEINO[head][2][i] + SEINO[bridge][3][i] + rankBonus[i]);
                                ship.sum = ship.para.slice(1).reduce((a, b) => a + b);
                                ship.id = '' + ship.body + ship.tail + ship.head + ship.bridge;
                                ships.push(ship);
                            }
                        });
                    });
                });
            });
            // フィルタリング
            let filteredShips = [];
            ships.forEach(ship => {
                if ((this.filters[0] === null || ship.para[0] <= this.filters[0]) &&
                    (this.filters[1] === null || ship.para[1] >= this.filters[1]) &&
                    (this.filters[2] === null || ship.para[2] >= this.filters[2]) &&
                    (this.filters[3] === null || ship.para[3] >= this.filters[3]) &&
                    (this.filters[4] === null || ship.para[4] >= this.filters[4]) &&
                    (this.filters[5] === null || ship.para[5] >= this.filters[5])) filteredShips.push(ship);
            });
            log('Result: Ships: ' + filteredShips.length + '/' + ships.length);
            this.ships = filteredShips;
            // チェック付きはコピペ対象に入れる。
            this.copyFlag = this.ships.some(ship => this.markedShips.includes(ship.id));
        },
        markShip: function (key) {
            this.markedShips.includes(key) ? this.markedShips.splice(this.markedShips.indexOf(key), 1) : this.markedShips.push(key);
            this.copyFlag = this.ships.some(ship => this.markedShips.includes(ship.id)) ? true : false;
            log('Result: MarkedShip:' + this.markedShips);
        },
        sortTable: function (key) {
            let sortKey = this.sortKeys[key].key,
                R = this.sortKeys[key].reverse ? 1 : -1;
            if (BUI.length <= key && key < BUI.length + PARA.length) {
                this.ships.sort(function (a, b) {
                    if (a.para[sortKey] < b.para[sortKey]) return R;
                    if (a.para[sortKey] > b.para[sortKey]) return R * -1;
                    return 0;
                });
            } else {
                this.ships.sort(function (a, b) {
                    if (a[sortKey] < b[sortKey]) return R; // クラス順
                    if (a[sortKey] > b[sortKey]) return R * -1; // クラス順
                    // if (KYU[a[KEY]] < KYU[b[KEY]]) return R; // 名前順
                    // if (KYU[a[KEY]] > KYU[b[KEY]]) return R * -1; // 名前順
                    return 0;
                });
            }
            this.sortKeys[key].reverse = !this.sortKeys[key].reverse;
            log('Result: SortKey: ' + sortKey);
        },
        forceShow: function () {
            this.forceShowFlag = !this.forceShowFlag;
            log('Result: ForceShowFlag: ' + this.forceShowFlag);
        },
        copyShips: function () {
            const SHIPS = this.ships,
                IDS = this.markedShips;
            let copyShips = []; // コピペするデータ
            let copyLines = []; // 整形済みテキスト（配列）
            for (let ship of SHIPS)
                if (IDS.includes(ship.id)) copyShips.push(ship);
            for (let ship of copyShips) {
                let txt = WORDS[KYU_S[ship.body]][this.sharedState.lang] + WORDS[KYU_S[ship.tail]][this.sharedState.lang] + WORDS[KYU_S[ship.head]][this.sharedState.lang] + WORDS[KYU_S[ship.bridge]][this.sharedState.lang] + '/';
                for (let p in PARA_S)
                    if (p > 0) txt += WORDS[PARA_S[p]][this.sharedState.lang] + ('   ' + ship.para[p]).substr(-3);
                copyLines.push(txt.trim());
            }
            let txt = copyLines.join('\n') + '\n';
            if (execCopy(txt)) alert(WORDS['copied'][this.sharedState.lang]);
            log('Result: Clipboard:');
            log(txt);
        }
    },
});