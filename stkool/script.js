'use strict';

const DEBUG = false; // デバッグモード

const DEF_RANK = 70; // デフォルトのランク
const DEF_PANEL = [...Array(18).keys(), 18, 19]; // デフォルトパネル
const MAX_SHIPS = 1000; // 組み合わせの最大表示件数

// KYU 級の名前
// KYU_S 級の名前（短縮形）
// BUI 部位の名前
// PARA パラメータの名前
// PARA_S パラメータの名前（短縮形）
// SUM
// SUM_S
// SEINO パーツ性能（コスト, 探査性能, 収集性能, 巡航速度, 航続距離, 運）
// BONUS ランクボーナス（探査性能, 収集性能, 巡航速度, 航続距離, 運）
// DEKIAI 定番構成
// SORT_KEYS ソート用のキー

const panel = new Vue({
  // 入力パネル
  el: '#panel',
  data: {
    bui: BUI,
    kyu: KYU,
    bonus: BONUS,
    checkedButtons: [], // チェックされたボタン
    rank: 0,
    rankMin: 50,
    rankMax: 75
  },
  methods: {
    checkAll: function() {
      const MAX = this.bui.length * this.kyu.length;
      this.checkedButtons = this.checkedButtons.length === MAX ? [] : [...Array(MAX).keys()];
    },
    checkLine: function(line) {
      const NUM = this.bui.length,
        START = line * NUM,
        END = (line + 1) * NUM;
      let ary = [];
      for (let i = START; i < END; i++)
        if (!this.checkedButtons.includes(i)) ary.push(i);
      this.checkedButtons = ary.length ? this.checkedButtons.concat(ary).sort((a, b) => a - b) : this.checkedButtons.filter(i => i < START || END <= i);
    },
    checkAny: function(orders) {
      const ORDERS = orders;
      let ary = [];
      for (let i of ORDERS)
        if (!this.checkedButtons.includes(i)) ary.push(i);
      this.checkedButtons = ary.length ? this.checkedButtons.concat(ary).sort((a, b) => a - b) : this.checkedButtons.filter(i => !ORDERS.includes(i));
    }
  },
  mounted: function() {
    this.checkedButtons = DEF_PANEL;
    this.rank = DEF_RANK;
    // ローカルストレージからデータを所得
    let code = localStorage.getItem('panel');
    let rank = localStorage.getItem('rank');
    let ary = [],
      panels = [];
    if (code) {
      ary = Array.from(code);
      ary.forEach((v, i) => { if (v | 0) panels.push(i); });
      this.checkedButtons = panels;
      this.rank = rank;
    }
    log('=================');
    log('LocalStorage(Get):');
    log(' Panel: ' + code);
    log(' Rank: ' + rank);
  },
  updated: function() {
    let ary = this.checkedButtons.slice();
    log('=================');
    log('Panels:');
    log(ary);
    log('Rank: ' + this.rank);
    result.setParts(ary, this.rank);
    // ローカルストレージにパーツデータを保存
    let code = '',
      rank = this.rank;
    let max = this.bui.length * this.kyu.length;
    for (let i = 0; i < max; i++) {
      code += ary.includes(i) ? '1' : '0';
    }
    localStorage.setItem('panel', code);
    localStorage.setItem('rank', rank);
    log('=================');
    log('LocalStorage(Set):');
    log(' Panel: ' + code);
    log(' Rank: ' + rank);
  }
});

const filter = new Vue({
  // 性能フィルタ
  el: '#filter',
  data: {
    para: PARA,
    atai: [...PARA].fill(null),
    tmp: DEKIAI,
    comment: 'ここに説明が出ます。'
  },
  methods: {
    clearAll: function() {
      this.atai = [...this.para].fill(null);
      this.comment = 'ここに説明が出ます。';
    },
    setTmp: function(n, m) {
      this.atai = this.tmp[n][m].para.slice();
      this.comment = this.tmp[n][m].comment;
    }
  },
  mounted: function() {
    // サーチ情報がある場合はフィルタ情報をローカルストレージに保存して再読み込み
    const search = location.search.substr(1);
    if (search) {
      localStorage.setItem('filter', search);
      location.replace(location.protocol + '//' + location.hostname + location.pathname); // 再読み込み
    } else {
      // サーチ情報が無い場合はローカルストレージからフィルタ情報を読み込む
      let code = localStorage.getItem('filter');
      if (code) {
        let params = ('000'.repeat(6) + parseInt(code, 36)).slice(-3 * 6).match(/.{3}/g).map(p => p - 0);
        this.atai = params.map(p => p === 0 ? null : p);
        log('=================');
        log('LocalStorage(Get):');
        log(' Filter: ' + code);
        // 読み込んだらローカルストレージを削除
        localStorage.removeItem('filter');
      }
    }
  },
  updated: function() {
    let atai = this.atai.slice();
    for (let a in atai) {
      if (atai[a] !== null && atai[a] !== 0) {
        atai[a] = Number(atai[a]);
        if (atai[a] === 0) atai[a] = null;
      }
    }
    log('=================');
    log('Filters:');
    log(atai);
    result.setFilters(atai);
    /*
    // ローカルストレージにフィルタ設定を保存
    let params = atai.map(a => a === null ? 0 : a).slice();
    let code = (params.map(p => ('000' + p).slice(-3)).join('') - 0).toString(36);
    localStorage.setItem('filter', code);
    log('=================');
    log('LocalStorage(Set):');
    log(' Filter: '+ code);
    */
  }
});

const result = new Vue({
  // 結果一覧
  el: '#result',
  data: {
    bui: BUI,
    kyu: KYU_S,
    bonus: BONUS,
    para: PARA_S,
    sum: SUM_S,
    seino: SEINO,
    parts: [], // 手持ちパーツのリスト
    rank: 0,
    filters: [...PARA].fill(null), // フィルタ設定
    ships: [], // 組み合わせリスト
    maxShips: MAX_SHIPS, // 最大表示件数
    forceShowFlag: false, // 最大表示件数を越えて強制的に表示するフラグ
    markedShips: [], // コピペ用チェックリスト
    copyFlag: false,
    sortKeys: SORT_KEYS // ソート用キーリスト
  },
  methods: {
    setParts: function(parts, rank) {
      this.parts = parts;
      this.rank = rank;
      this.buildShips();
    },
    setFilters: function(filters) {
      this.filters = filters;
      this.buildShips();
    },
    buildShips: function() {
      const B = this.bui.length;
      const KYU = this.kyu,
        PARA = this.para,
        SEINO = this.seino,
        PARTS = this.parts;
      const RANK_BONUS = this.bonus[this.rank];
      // パーツリストから全ての組み合わせを作る
      let ships = [];
      for (let body in KYU) {
        if (!PARTS.includes(body * B)) continue;
        for (let tail in KYU) {
          if (!PARTS.includes(tail * B + 1)) continue;
          for (let head in KYU) {
            if (!PARTS.includes(head * B + 2)) continue;
            for (let bridge in KYU) {
              if (!PARTS.includes(bridge * B + 3)) continue;
              let ship = {}; // shipは参照渡しなので毎回初期化が必要
              ship.body = body;
              ship.tail = tail;
              ship.head = head;
              ship.bridge = bridge;
              ship.para = [];
              for (let p in PARA) {
                ship.para[p] = SEINO[body][0][p] + SEINO[tail][1][p] + SEINO[head][2][p] + SEINO[bridge][3][p] + RANK_BONUS[p];
              }
              ship.sum = ship.para.slice(1).reduce((a, b) => a + b);
              ship.id = '' + ship.body + ship.tail + ship.head + ship.bridge;
              ships.push(ship);
            }
          }
        }
      }
      log('=================');
      log('Ships: ' + ships.length);
      // フィルタリング
      const FILTERS = this.filters;
      let filteredShips = [];
      for (let ship of ships) {
        if ((FILTERS[0] !== null && ship.para[0] > FILTERS[0]) ||
          (FILTERS[1] !== null && ship.para[1] < FILTERS[1]) ||
          (FILTERS[2] !== null && ship.para[2] < FILTERS[2]) ||
          (FILTERS[3] !== null && ship.para[3] < FILTERS[3]) ||
          (FILTERS[4] !== null && ship.para[4] < FILTERS[4]) ||
          (FILTERS[5] !== null && ship.para[5] < FILTERS[5])) continue;
        filteredShips.push(ship);
      }
      this.ships = filteredShips.length === ships.length ? ships : filteredShips;
      this.copyFlag = this.ships.some(ship => this.markedShips.includes(ship.id));
      log('FilteredShips: ' + filteredShips.length);
    },
    markShip: function(key) {
      this.markedShips.includes(key) ? this.markedShips.splice(this.markedShips.indexOf(key), 1) : this.markedShips.push(key);
      this.copyFlag = this.ships.some(ship => this.markedShips.includes(ship.id)) ? true : false;
    },
    sortTable: function(key) {
      const KEY = this.sortKeys[key].key,
        R = this.sortKeys[key].reverse ? 1 : -1;
      if (this.bui.length <= key && key < this.bui.length + this.para.length) {
        this.ships.sort(function(a, b) {
          if (a.para[KEY] < b.para[KEY]) return R;
          if (a.para[KEY] > b.para[KEY]) return R * -1;
          return 0;
        });
      } else {
        this.ships.sort(function(a, b) {
          if (a[KEY] < b[KEY]) return R; // クラス順
          if (a[KEY] > b[KEY]) return R * -1; // クラス順
          // if (KYU[a[KEY]] < KYU[b[KEY]]) return R; // 名前順
          // if (KYU[a[KEY]] > KYU[b[KEY]]) return R * -1; // 名前順
          return 0;
        });
      }
      this.sortKeys[key].reverse = !this.sortKeys[key].reverse;
      log('=================');
      log('SortKey: ' + KEY);
    },
    forceShow: function() {
      this.forceShowFlag = !this.forceShowFlag;
      log('=================');
      log('ForceShowFlag: ' + this.forceShowFlag);
    },
    copyShips: function() {
      const SHIPS = this.ships,
        IDS = this.markedShips;
      let copyShips = []; // コピペするデータ
      let copyLines = []; // 整形済みテキスト（配列）
      for (let ship of SHIPS)
        if (IDS.includes(ship.id)) copyShips.push(ship);
      for (let ship of copyShips) {
        let txt = KYU_S[ship.body] + KYU_S[ship.tail] + KYU_S[ship.head] + KYU_S[ship.bridge] + '/';
        for (let p in PARA_S)
          if (p > 0) txt += PARA_S[p] + ('   ' + ship.para[p]).substr(-3);
        copyLines.push(txt.trim());
      }
      let txt = copyLines.join('\n') + '\n';
      if (execCopy(txt)) alert('コピーしました！');
      log('=================');
      log('Clipboard:');
      log(txt);
    }
  },
  updated: function() {
    log('=================');
    log('MarkedShips:');
    log(this.markedShips);
  }
});

const execCopy = string => {
  // 任意の文字列ををクリップボードにコピー
  // https://qiita.com/simiraaaa/items/2e7478d72f365aa48356 からパクった
  let tmp = document.createElement('div');
  let pre = document.createElement('pre');
  pre.style.webkitUserSelect = 'auto';
  pre.style.userSelect = 'auto';
  tmp.appendChild(pre).textContent = string;
  let s = tmp.style;
  s.position = 'fixed';
  s.right = '200%';
  document.body.appendChild(tmp);
  document.getSelection().selectAllChildren(tmp);
  let result = document.execCommand("copy");
  document.body.removeChild(tmp);
  return result;
}