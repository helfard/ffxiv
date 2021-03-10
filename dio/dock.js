const dock = new Vue({
    // 結果一覧
    el: '#dock',
    data: {
        partsBox: new Array(BUI.length * KYU.length).fill(0), // 手持ちパーツのリスト
        rank: 50,
        filters: [...PARA_S].fill(null), // フィルタ設定
        docks: [], // ドック入りリスト
        maxShips: 200, // 最大表示件数
        forceShowFlag: false, // 最大表示件数を越えて強制的に表示するフラグ
        markedShips: [], // コピペ用チェックリスト
        sortKey: 0, // 現在のソート設定
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
    computed: {
        parts: function () {
            let partsBox = this.partsBox.slice(),
                parts = [];
            this.docks.forEach((ship, index) => {
                let ary = [ship.body, ship.tail, ship.head, ship.bridge];
                if (ary.some((a, i) => partsBox[a * BUI.length + i] < 1)) {
                    this.docks.splice(index, 1);
                } else {
                    ary.forEach((a, i) => {
                        partsBox[a * BUI.length + i]--;
                    });
                }
            });
            parts = partsBox.map((p, i) => p > 0 ? i : null).filter(p => p !== null);
            // ここはあとで直す
            log('Dock: Parts: ' + parts);
            return parts;
        },
        ships: function () {
            const B = BUI.length;
            let rankBonus = BONUS[this.rank];
            // パーツリストから全ての組み合わせを作る
            let ships = [],
                ary = [...KYU_S.keys()];
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
                                    rank: this.rank,
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
            return ships;
        },
        filteredShips: function () {
            // フィルタ後の組み合わせリスト
            let ships = this.ships,
                filters = this.filters,
                filteredShips = [];
            ships.forEach(ship => {
                if ((filters[0] === null || ship.para[0] <= filters[0]) &&
                    (filters[1] === null || ship.para[1] >= filters[1]) &&
                    (filters[2] === null || ship.para[2] >= filters[2]) &&
                    (filters[3] === null || ship.para[3] >= filters[3]) &&
                    (filters[4] === null || ship.para[4] >= filters[4]) &&
                    (filters[5] === null || ship.para[5] >= filters[5])) filteredShips.push(ship);
            });
            log('Dock: Ships: ' + this.docks.length + '/' + filteredShips.length + '/' + ships.length);
            return filteredShips;
        },
        sortedShips: function () {
            // ソート済みの組み合わせリスト
            let key = this.sortKey,
                sortKey = this.sortKeys[key].key,
                R = this.sortKeys[key].reverse ? 1 : -1
                ships = this.filteredShips.slice();
            if (BUI.length <= key && key < BUI.length + PARA_S.length) {
                ships.sort(function (a, b) {
                    if (a.para[sortKey] < b.para[sortKey]) return R;
                    if (a.para[sortKey] > b.para[sortKey]) return R * -1;
                    return 0;
                });
            } else {
                ships.sort(function (a, b) {
                    if (a[sortKey] < b[sortKey]) return R; // クラス順
                    if (a[sortKey] > b[sortKey]) return R * -1; // クラス順
                    // if (KYU[a[KEY]] < KYU[b[KEY]]) return R; // 名前順
                    // if (KYU[a[KEY]] > KYU[b[KEY]]) return R * -1; // 名前順
                    return 0;
                });
            }
            return ships;
        }
    },
    watch: {
        docks: function (docks) {
            let partsUsed = new Array(BUI.length * KYU.length).fill(0);
            docks.forEach(ship => {
                [ship.body, ship.tail, ship.head, ship.bridge].forEach((a, i) => {
                    partsUsed[a * BUI.length + i]++;
                });
            });
            // 使用中のパーツの数を反映
            counter.partsUsed = partsUsed;
        }
    },
    methods: {
        setParts: function (partsBox, rank) {
            this.partsBox = partsBox;
            this.rank = rank;
        },
        setFilters: function (filters) {
            this.filters = filters;
        },
        sendToDock: function (body, tail, head, bridge) {
            let rankBonus = BONUS[this.rank];
            let ship = {};
            if (this.docks.length < 4) {
                let ship = {
                    body: body,
                    tail: tail,
                    head: head,
                    bridge: bridge,
                    rank: this.rank,
                    para: PARA_S.map((p, i) => SEINO[body][0][i] + SEINO[tail][1][i] + SEINO[head][2][i] + SEINO[bridge][3][i] + rankBonus[i]),
                    id: '' + body + tail + head + bridge,
                }
                this.docks.push(ship);
            }
        },
        removeFromDock: function (index) {
            this.docks.splice(index, 1);
        },
        sortTable: function (key) {
            if (this.sortKey === key) this.sortKeys[key].reverse = !this.sortKeys[key].reverse;
            this.sortKey = key;
            log('Dock: SortKey: ' + key + ' (' + (this.sortKeys[key].reverse ? 'ASC' : 'DSC') + ')');
        },
        forceShow: function () {
            this.forceShowFlag = !this.forceShowFlag;
            log('Dock: ForceShowFlag: ' + this.forceShowFlag);
        },
        copyShips: function () {
            let copiedLines = []; // 整形済みテキスト（配列）
            this.docks.forEach(ship => {
                let line = WORDS[KYU_S[ship.body]][this.sharedState.lang] + WORDS[KYU_S[ship.tail]][this.sharedState.lang] + WORDS[KYU_S[ship.head]][this.sharedState.lang] + WORDS[KYU_S[ship.bridge]][this.sharedState.lang] + '/';
                line += 'R' + this.rank + '/';
                [...Array(PARA_S.length - 1).keys()].map(i => ++i).forEach(p => {
                    line += WORDS[PARA_S[p]][this.sharedState.lang] + ('   ' + ship.para[p]).substr(-3)
                });
                copiedLines.push(line.trim());
            });
            let copiedText = copiedLines.join('\n') + '\n';
            log('Dock: Clipboard:');
            log(copiedText);
            if (execCopy(copiedText)) alert(WORDS['copied'][this.sharedState.lang]);
        }
    },
});