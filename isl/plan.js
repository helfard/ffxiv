const plan = new Vue({
    // 作る島産品と作らない島産品を指定
    el: '#plan',
    data: {
        DEBUG: DEBUG, // デバッグモードのフラグ
        sharedState: store.state, // 共用データ（言語設定を含む）
        WORD: WORD, // 辞書データ
        TOSANHIN: TOSANHIN, // 島産品データ
        TABLE_TOSANHIN: TABLE_TOSANHIN, // テーブル表示用の島産品リスト
        rank: 4, // 開拓ランク
        sozais: [], // 使用可能な素材一覧
        checkedTosanhin: [], // 選択した島産品
        zyogaiTosanhin: [], // 除外した島産品
        
        sendFlag: false // 二重送信防止用のフラグ
    },
    computed: {
        tosanhin: function () {
            let ary = [];
            Object.keys(this.TOSANHIN).forEach(item => {
                let sozaiFlag = true;
                Object.keys(this.TOSANHIN[item].sozai).forEach(sozai => {
                    if (this.TOSANHIN[item].rank > this.rank || !this.sozais.includes(sozai)) sozaiFlag = false;
                });
                if (sozaiFlag) ary.push(item);
            });
            return ary;
        },
    },
    watch: {    
    },
    methods: {
        setSozais: function (rank, sozais) {
            this.rank = rank;
            this.sozais = sozais.slice();
            log('Plan: setSozais:');
        },
        checkTosanhin: function (item) {
            if (this.checkedTosanhin.includes(item)) {
                this.checkedTosanhin = this.checkedTosanhin.filter(i => i !== item);
            } else {
                if (this.zyogaiTosanhin.includes(item)) {
                    this.zyogaiTosanhin = this.zyogaiTosanhin.filter(i => i !== item);
                    this.checkedTosanhin.push(item);
                } else {
                    this.zyogaiTosanhin.push(item);
                }
            }

        },
        stackOrder: function () {
            // データの二重送信を防ぐために遅延をかける
            this.sendFlag = true;
            setTimeout(this.sendOrder, 200);
        },
        sendOrder: function () {
            if (this.sendFlag) {
                // 素材のリストをまとめて送信

                log('Pouch: Rank: ' + this.rank);
                log('Pouch: Sozai: ' + sozais);
                log('Pouch: Sendto: Plan');
//                result.setParts(this.checkedButtons.slice(), this.rank - 0);
                this.sendFlag = false;
            }
        }
    },
    mounted: function () {
        // ローカルストレージからデータを所得
    }
});
