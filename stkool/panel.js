const panel = new Vue({
    // 入力パネル
    el: '#panel',
    data: {
        checkedButtons: [...Array(18).keys(), 18, 19], // チェックされたボタン
        rank: '50', // ランク（Vueの仕様の都合で文字列である）
        rankMin: '50', // ランクの最小値
        rankMax: BONUS.length - 1 + '', // ランクの最大値
        sharedState: store.state, // 共用データ
        sendFlag: false // 二重送信防止用のフラグ
        // WORDS: 辞書データ
        // BUI: 部位
        // KYU: 級
    },
    watch: {
        checkedButtons: function (checkedButtons) {
            // ローカルストレージにパーツデータを保存
            localStorage.setItem('panel', JSON.stringify(checkedButtons));
            this.stackOrder();
        },
        rank: function (rank) {
            // ローカルストレージにランクを保存
            localStorage.setItem('rank', rank);
            this.stackOrder();
        }
    },
    methods: {
        checkAll: function () {
            const MAX = BUI.length * KYU.length;
            this.checkedButtons = this.checkedButtons.length === MAX ? [] : [...Array(MAX).keys()];
        },
        checkAny: function (orders) {
            let ary = orders.filter(i => !this.checkedButtons.includes(i));
            this.checkedButtons = ary.length
                ? this.checkedButtons.concat(ary).sort((a, b) => a - b)
                : this.checkedButtons.filter(i => !orders.includes(i));
        },
        stackOrder: function () {
            // データの二重送信を防ぐために遅延をかける
            this.sendFlag = true;
            setTimeout(this.sendOrder, 200);
        },
        sendOrder: function () {
            if (this.sendFlag) {
                // 結果表示
                log('Panel: Parts: ' + this.checkedButtons);
                log('Panel: Rank: ' + this.rank);
                result.setParts(this.checkedButtons.slice(), this.rank - 0);
                this.sendFlag = false;
            }
        }
    },
    mounted: function () {
        // ローカルストレージからデータを所得
        let jsonCode = localStorage.getItem('panel');
        if (jsonCode) this.checkedButtons = JSON.parse(jsonCode);
        let rank = localStorage.getItem('rank');
        if (rank) this.rank = rank;
    }
});
