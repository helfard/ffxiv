const filter = new Vue({
    // 性能フィルタ
    el: '#filter',
    data: {
        atai: [...PARA].fill(null), // フィルタの値
        memo: '', // メモ
        maxSlot: 10, // フィルタのセーブスロット数
        slotData: [], // スロットデータ（[{'params':[パラメータ], 'memo':メモ}]）
        saveFlag: false, // セーブ/ロードの切り替え
        sharedState: store.state, // 共用データ
        // WORDS: 辞書データ
        // PARA: パラメータ
        // DEKIAI: プリセット
    },
    watch: {
        atai: function () {
            this.stackOrder();
        }
    },
    methods: {
        clearAll: function () {
            this.atai = [...PARA].fill(null);
            this.memo = '';
            log('Filter: ClearAll');
        },
        setTemplate: function (item, index) {
            // プリセットの適用
            this.atai = DEKIAI[item][index].para.slice();
            this.memo = WORDS[item][this.sharedState.lang] + ' '
                + WORDS[DEKIAI[item][index].name][this.sharedState.lang] + '\n'
                + WORDS[DEKIAI[item][index].comment][this.sharedState.lang];
            log('Filter: SetTemplate: '
                + WORDS[item][this.sharedState.lang] + ' '
                + WORDS[DEKIAI[item][index].name][this.sharedState.lang]);
        },
        toggleSlot: function (slot) {
            // スロットのセーブ/ロード
            if (this.saveFlag) {
                if (!this.slotData[slot] || window.confirm(WORDS['confirm override'][this.sharedState.lang])) {
                    // スロットが空の場合は無条件に保存
                    // 既にデータが存在する場合は上書き確認
                    if (this.atai.some(a => a !== null) || this.memo !== '') {
                        this.slotData[slot] = {
                            params: this.atai.slice(),
                            memo: this.memo
                        }
                        log('Filter: SaveSlot: ' + slot);
                    } else {
                        this.slotData[slot] = null;
                        log('Filter: ClearSlot: ' + slot);
                    }
                    // ローカルストレージにスロットデータを保存
                    localStorage.setItem('slotData', JSON.stringify(this.slotData));
                    // セーブからロードに変更
                    this.saveFlag = false;
                }
            } else {
                // ロード
                if (this.slotData[slot]) {
                    this.atai = this.slotData[slot].params.slice();
                    this.memo = this.slotData[slot].memo;
                    log('Filter: LoadSlot: ' + slot);
                }
            }
        },
        toggleSaveFlag: function () {
            // セーブ/ロードの切り替え
            this.saveFlag = !this.saveFlag;
            log('Filter: ChangeSaveFlagTo: ' + this.saveFlag);
        },
        stackOrder: function () {
            // データの二重送信を防ぐために遅延をかける
            this.sendFlag = true;
            setTimeout(this.sendOrder, 200);
        },
        sendOrder: function () {
            if (this.sendFlag) {
                // 結果表示
                let ary = this.atai.map(a => a === 0 ? null : a);
                log('Filter: SetFilter: ' + ary);
                // 結果表示
                dock.setFilters(ary);
                this.sendFlag = false;
            }
        }
    },
    mounted: function () {
        // サーチ情報がある場合はフィルタ情報をローカルストレージに保存して再読み込み
        let search = location.search.substr(1);
        if (search) {
            const URL = location.protocol + '//' + location.hostname + location.pathname;
            localStorage.setItem('search', search);
            location.replace(URL); // 再読み込み
        } else {
            // スロットに保存されたデータがある場合はロードする
            let slotDataJson = localStorage.getItem('slotData');
            if (slotDataJson) this.slotData = JSON.parse(slotDataJson);
            // サーチ情報が無い場合はローカルストレージからフィルタ情報を読み込む
            let code = localStorage.getItem('search');
            if (code) {
                let params = ('000'.repeat(6) + parseInt(code, 36)).slice(-3 * 6).match(/.{3}/g).map(p => p - 0);
                this.atai = params.map(p => p === 0 ? null : p);
                // ↑ここは後で見直す
                log('Filter: SetFilterFromSearch ' + code);
                // 読み込んだらローカルストレージを削除
                localStorage.removeItem('search');
            }
        }
    }
});