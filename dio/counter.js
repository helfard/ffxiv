const counter = new Vue({
    // 入力パネル（個数選択式）
    el: '#counter',
    data: {
        partsBox: new Array(BUI.length * KYU.length).fill(0), // 各パーツの個数
        partsUsed: new Array(BUI.length * KYU.length).fill(0), // 使用中パーツの個数
        partsMax: 4, // パーツ個数の最大値
        rank: '50', // ランク（Vueの仕様の都合で文字列である）
        rankMin: '50', // ランクの最小値
        rankMax: BONUS.length - 1 + '', // ランクの最大値
        sharedState: store.state, // 共用データ
        // WORDS: 辞書データ
        // BUI: 部位
        // KYU: 級
    },
    watch: {
        partsBox: function () {
            this.stackOrder();
        },
        rank: function () {
            this.stackOrder();
        }
    },
    mounted: function () {
        this.loadParts();
    },
    methods: {
        addOne: function (index) {
            let number = this.partsBox[index] >= this.partsMax ? 0 : this.partsBox[index] + 1;
            this.partsBox.splice(index, 1, number);
        },
        addLine: function (line) {
            for (let index = line * BUI.length; index < (line + 1) * BUI.length; index++) {
                this.addOne(index);
            }
        },
        addAll: function () {
            this.partsBox.map((p, index) => this.addOne(index));
        },
        clearAll: function () {
            this.partsBox = [...this.partsBox].fill(0);
        },
        saveParts: function () {
            // ローカルストレージにパーツデータを保存
            localStorage.setItem('partsBox', JSON.stringify(this.partsBox));
            localStorage.setItem('rank', this.rank);
        },
        loadParts: function () {
            // ローカルストレージからデータを所得
            let jsonCode = localStorage.getItem('partsBox');
            if (jsonCode) this.partsBox = JSON.parse(jsonCode);
            let rank = localStorage.getItem('rank');
            if (rank) this.rank = rank;
        },
        stackOrder: function () {
            // データの二重送信を防ぐために遅延をかける
            this.saveParts();
            this.sendFlag = true;
            setTimeout(this.sendOrder, 200);
        },
        sendOrder: function () {
            if (this.sendFlag) {
                // 結果表示
                log('Panel: PartsBox: ' + this.partsBox);
                log('Panel: Rank: ' + this.rank);
                dock.setParts(this.partsBox.slice(), this.rank - 0);
                this.sendFlag = false;
            }
        }
    }
})