const pouch = new Vue({
    // 開拓ランク・手持ちの開拓素材と飼育動物の指定
    el: '#pouch',
    data: {
        DEBUG: DEBUG, // デバッグモードのフラグ
        sharedState: store.state, // 共用データ（言語設定を含む）
        WORD: WORD, // 辞書データ
        FIELD: FIELD, // 開拓素材
        CROPLAND: CROPLAND, // 耕作物資
        PASTURE: PASTURE, // 畜産物資
        ANIMAL: ANIMAL, // 飼育動物
        rank: '4', // 開拓ランク（Vueの仕様の都合で文字列である）
        rankMin: '4', // 開拓ランクの最小値
        rankMax: '10', // 開拓ランクの最大値
        checkedField: [], // 開拓素材
        checkedCropland: [], // 耕作物資
        checkedLivestock: [], // 飼育動物
        feededLivestock: [], // 餌をやる飼育動物
        checkedPasture: [], // 畜産物資（手動指定）
        sendFlag: false // 二重送信防止用のフラグ
    },
    computed: {
        field: function () {
            return Object.keys(this.FIELD).filter(sozai => this.FIELD[sozai].rank <= this.rank);
        },
        cropland: function () {
            return Object.keys(this.CROPLAND).filter(sozai => this.CROPLAND[sozai].rank <= this.rank);
        },
        livestock: function () {
            return Object.keys(this.ANIMAL).filter(animal => this.ANIMAL[animal].rank <= this.rank);
        },
        pasture: function () {
            let animals = Object.keys(this.ANIMAL).filter(animal => this.ANIMAL[animal].rank <= this.rank)
            let pastures = Object.keys(this.PASTURE);
            let ary = [];
            pastures.forEach(sozai => {
                animals.forEach(animal => {
                    if (!ary.includes(sozai) && this.ANIMAL[animal].sozais.includes(sozai)) ary.push(sozai);
                });
            });
            return ary;
        },
        computedPasture: function () {
            // 畜産物質（飼育動物から自動算出）
            let ary = [];
            this.checkedLivestock.forEach(animal => {
                if (!ary.includes(this.ANIMAL[animal].sozais[0])) ary.push(this.ANIMAL[animal].sozais[0]);
                if (this.feededLivestock.includes(animal) && !ary.includes(this.ANIMAL[animal].sozais[1])) ary.push(this.ANIMAL[animal].sozais[1]);
            }); 
            return ary;
        },
    },
    watch: {
        rank: function (rank) {
            // ローカルストレージにランクを保存
            localStorage.setItem('rank', rank);
            log('Pouch: Save to LocalStorage: Rank');
            this.stackOrder();
        },
        checkedField: function (checkedField) {
            // ローカルストレージに開拓素材を保存
            localStorage.setItem('checkedField', JSON.stringify(checkedField));
            log('Pouch: Save to LocalStorage: checkedField');
            this.stackOrder();
        },
        checkedCropland: function (checkedCropland) {
            // ローカルストレージに耕作物資を保存
            localStorage.setItem('checkedCropland', JSON.stringify(checkedCropland));
            log('Pouch: Save to LocalStorage: checkedCropland');
            this.stackOrder();
        },
        checkedLivestock: function (checkedLivestock) {
            // ローカルストレージに飼育動物を保存
            localStorage.setItem('checkedLivestock', JSON.stringify(checkedLivestock));
            log('Pouch: Save to LocalStorage: checkedLivestock');
            this.stackOrder();
        },
        feededLivestock: function (feededLivestock) {
            // ローカルストレージに餌をやる飼育動物を保存
            localStorage.setItem('feededLivestock', JSON.stringify(feededLivestock));
            log('Pouch: Save to LocalStorage: feededLivestock');
            this.stackOrder();
        },
        checkedPasture: function (checkedPasture) {
            // ローカルストレージに手動指定した畜産物資を保存
            localStorage.setItem('checkedPasture', JSON.stringify(checkedPasture));
            log('Pouch: Save to LocalStorage: checkedPasture');
            this.stackOrder();
        },
    },
    methods: {
        checkAll: function (category) {
            let ary = [];
            let checkAllFlag = false;
            let checkAllRareFlag = false;
            switch (category) {
                case '開拓素材':
                    this.field.forEach(sozai => {
                        if (this.FIELD[sozai].supplier === 'field' || this.checkedField.includes(sozai)) ary.push(sozai);
                        if (!this.checkedField.includes(sozai)) {
                            this.FIELD[sozai].supplier === 'granary' ? checkAllRareFlag = true : checkAllFlag = true;
                        }
                    });
                    if (checkAllFlag) {
                        this.checkedField = ary;
                    } else if (checkAllRareFlag) {
                        this.checkedField = this.field.slice();
                    } else {
                        this.checkedField = [];
                    }
                    break;
                case '耕作物資':
                    this.cropland.forEach(sozai => {
                        if (this.CROPLAND[sozai].supplier === 'field' || this.checkedCropland.includes(sozai)) ary.push(sozai);
                        if (!this.checkedCropland.includes(sozai)) {
                            this.CROPLAND[sozai].supplier === 'crops' ? checkAllRareFlag = true : checkAllFlag = true;
                        }
                    });
                    if (checkAllFlag) {
                        this.checkedCropland = ary;
                    } else if (checkAllRareFlag) {
                        this.checkedCropland = this.cropland.slice();
                    } else {
                        this.checkedCropland = [];
                    }
                    break;
                case '飼育動物':
                    let checkAllFeedFlag = false;
                    this.livestock.forEach(animal => {
                        if (!this.ANIMAL[animal].rare || this.checkedLivestock.includes(animal)) ary.push(animal);
                        if (!this.checkedLivestock.includes(animal)) {
                            this.ANIMAL[animal].rare ? checkAllRareFlag = true : checkAllFlag = true;
                        } else {
                            if (!this.feededLivestock.includes(animal)) checkAllFeedFlag = true;
                        }
                    });
                    if (checkAllFlag) {
                        this.checkedLivestock = ary;
                    } else if (checkAllRareFlag) {
                        this.checkedLivestock = this.livestock.slice();
                    } else if (checkAllFeedFlag) {
                        this.feededLivestock = this.livestock.slice();
                    } else {
                        this.checkedLivestock = [];
                        this.feededLivestock = [];
                    }
                    break;
                    case '畜産物資':
                        this.pasture.forEach(sozai => {
                            if (!this.checkedPasture.includes(sozai)) checkAllFlag = true;
                        });
                        if (checkAllFlag) {
                            this.checkedPasture = this.pasture.slice();
                        } else {
                            this.checkedPasture = [];
                        }
                    break;
                default:
            }
        },
        checkAnimal: function (animal) {
            if (this.checkedLivestock.includes(animal)) {
                if (this.feededLivestock.includes(animal)) {
                    this.checkedLivestock = this.checkedLivestock.filter(key => key !== animal);
                    this.feededLivestock = this.feededLivestock.filter(key => key !== animal);
                } else {
                    this.feededLivestock.push(animal);
                }
            } else {
                this.checkedLivestock.push(animal);
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
                let sozais = [];
                this.field.forEach(sozai => {
                    if (this.checkedField.includes(sozai)) sozais.push(sozai);
                });
                this.cropland.forEach(sozai => {
                    if (this.checkedCropland.includes(sozai)) sozais.push(sozai);
                });
                this.pasture.forEach(sozai => {
                    if (this.computedPasture.includes(sozai) || this.checkedPasture.includes(sozai)) sozais.push(sozai);
                });
                log('Pouch: Rank: ' + this.rank);
                log('Pouch: Sozai: ' + sozais);
                log('Pouch: Sendto: Plan');
                plan.setSozais(this.rank, sozais);
                this.sendFlag = false;
            }
        }
    },
    mounted: function () {
        // ローカルストレージからデータを所得
        let rank = localStorage.getItem('rank');
        if (rank) this.rank = rank;
        let checkedField = localStorage.getItem('checkedField');
        if (checkedField) this.checkedField = JSON.parse(checkedField);
        let checkedCropland = localStorage.getItem('checkedCropland');
        if (checkedCropland) this.checkedCropland = JSON.parse(checkedCropland);
        let checkedLivestock = localStorage.getItem('checkedLivestock');
        if (checkedLivestock) this.checkedLivestock = JSON.parse(checkedLivestock);
        let feededLivestock = localStorage.getItem('feededLivestock');
        if (feededLivestock) this.feededLivestock = JSON.parse(feededLivestock);
        let checkedPasture = localStorage.getItem('checkedPasture');
        if (checkedPasture) this.checkedPasture = JSON.parse(checkedPasture);
        log('Pouch: Lord from LocalStorage.');
    }
});
