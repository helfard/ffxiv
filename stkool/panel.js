const panel = new Vue({
  // 入力パネル
  el: '#panel',
  data: {
    checkedButtons: [...Array(18).keys(), 18, 19], // チェックされたボタン
    rank: 50, // ランク
    rankMin: 50, // ランクの最小値
    rankMax: 80, // ランクの最大値
    sharedState: store.state, // 共用データ
    // WORDS: 辞書データ
    // BUI: 部位
    // KYU: 級
    // CONFIG: 基本設定
  },
  methods: {
    checkAll: function () {
      const MAX = BUI.length * KYU.length;
      this.checkedButtons = this.checkedButtons.length === MAX ? [] : [...Array(MAX).keys()];
    },
    checkAny: function (orders) {
      let ary = [];
      ary = orders.filter(i => !this.checkedButtons.includes(i));
      this.checkedButtons = ary.length
        ? this.checkedButtons.concat(ary).sort((a, b) => a - b)
        : this.checkedButtons.filter(i => !orders.includes(i));
    },
  },
  mounted: function () {
    // ローカルストレージからデータを所得
    let jsonCode = localStorage.getItem('panel');
    if (jsonCode) {
      this.checkedButtons = JSON.parse(jsonCode);
    }
    let rank = localStorage.getItem('rank');
    if (rank) {
      this.rank = rank - 0;
    }
  },
  updated: function () {
    let checkedButtons = this.checkedButtons.slice();
    let rank = this.rank;
    // ローカルストレージにパーツデータを保存
    localStorage.setItem('panel', JSON.stringify(checkedButtons));
    localStorage.setItem('rank', rank);
    log('Panel: Buttons: ' + checkedButtons);
    log('Panel: Rank: ' + rank);
    // 結果表示
    result.setParts(checkedButtons, rank);
  },
});