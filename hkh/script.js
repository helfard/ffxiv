'use strict';

const DEBUG = false; // デバッグモード

// TKOOL 潜水艦ツクールのURL
// AREA 海域データ
// 

const checkAreaData = ary => {
  if (DEBUG) {
    log('=================');
    log('海域データの整合性チェック開始…');
    // 相対距離（航続距離）の整合性チェック
    for (let i = 0; i < ary.length; i++) {
      for (let j = 0; j < ary[i].smove.length; j++) {
        if (ary[i].smove[j] !== ary[j].smove[i]) log(ary[i].id + '（' + ary[i].smove[j] + '）と' + ary[j].id + '（' + ary[j].smove[i] + '）の相対距離に齟齬があります。');
      }
    }
    // 相対距離（実距離）の整合性チェック
    for (let i = 0; i < ary.length; i++) {
      for (let j = 0; j < ary[i].distance.length; j++) {
        if (ary[i].distance[j] !== ary[j].distance[i]) log(ary[i].id + '（' + ary[i].distance[j] + '）と' + ary[j].id + '（' + ary[j].distance[i] + '）の相対距離に齟齬があります。');
      }
    }
    log('海域データの整合性チェック終了。');
  }
}
checkAreaData(AREA);

const map = new Vue({
  // 地図
  el: '#map',
  data: {
    area: AREA,
    checkedButtons: [],
  },
  methods: {
    check: function (i) {
      let ary = this.checkedButtons.slice();
      if (ary.includes(i)) {
        ary = ary.filter(v => v !== i);
      } else {
        while (ary.length > 4) ary.pop();
        ary.push(i)
      }
      this.checkedButtons = ary;
    },
    clearAll: function () {
      // 全選択解除
      this.checkedButtons = [];
    }
  },
  mounted: function () { },
  beforeUpdate: function () { },
  updated: function () {
    let ary = this.checkedButtons.slice();
    log('=================');
    log('Map: ' + ary);
    lookup.markItems(null);
  },
  computed: {}
});

const lookup = new Vue({
  // 逆引き
  el: '#lookup',
  data: {
    area: AREA,
    orders: ITEMS, // 表示する順序
    o_i: [], // 内部データの順序への変換表
    checkedItems: [], // 逆引きするアイテム
    items: [], // 逆引き辞書のデータの順序
    dictionary: [], // 逆引き辞書（順序はitemsと同じ）
    tansas: [],
    lucks: [],
  },
  methods: {
    markItems: function (id) {
      // idは内部データでの順序
      const area = this.area,
        orders = this.orders,
        o_i = this.o_i;
      let items = this.items,
        checkedItems = this.checkedItems.slice();
      if (id !== null) {
        if (checkedItems.includes(id)) {
          checkedItems = checkedItems.filter(v => v !== id);
        } else {
          checkedItems.push(id);
        }
      }
      const dictionary = this.dictionary;
      let tansas = new Array(items.length).fill(0),
        lucks = new Array(items.length).fill(0);
      const checkedButtons = map.checkedButtons;

      for (let i of checkedItems) {
        for (let j of dictionary[i]) {
          if (checkedButtons.includes(j.no)) {
            if (tansas[i] < j.tansa) tansas[i] = j.tansa;
            if (lucks[i] < area[j.no].luck) lucks[i] = area[j.no].luck;
          }
        }
      }
      this.tansas = tansas;
      this.lucks = lucks;
      let max_tamsa = tansas.reduce((a, b) => a > b ? a : b);
      let max_luck = lucks.reduce((a, b) => a > b ? a : b);
      result.setTL(max_tamsa, max_luck);
      result.showRoute(map.checkedButtons.slice());
    }
  },
  mounted: function () {
    const area = this.area;
    const orders = this.orders;
    let items = [];
    let dictionary = [];
    for (let n = 0; n < area.length; n++) {
      let a = area[n];
      for (let b of a.drop) {
        let i = items.indexOf(b.name);
        let tmp = {
          no: n,
          id: a.id,
          tansa: b.tansa
        };
        if (i < 0) {
          items.push(b.name);
          dictionary.push([tmp]);
        } else {
          dictionary[i].push(tmp);
        }
      }
    }
    this.items = items;
    this.dictionary = dictionary;
    let o_i = [];
    for (let o of orders) {
      o_i.push(items.indexOf(o));
    }
    this.o_i = o_i;
    log('=================');
    log('Items:');
    log(items);
    log('Dictionary:');
    log(dictionary);
  },
  updated: function () {
  }
});

const submarine = new Vue({
  // 潜水艦データ
  el: '#submarine',
  data: {
    speed: 100,
    speedMin: 5,
    speedMax: 200,
  },
  methods: {
  },
  mounted: function () {
    // ローカルストレージからデータを読み込む
    let speed = localStorage.getItem('speed');
    if (speed) this.speed = speed;
  },
  updated: function () {
    let speed = this.speed;
    result.setSpeed(speed);
    // ローカルストレージにデータを保存
    localStorage.setItem('speed', speed);
  }
});

const result = new Vue({
  // 航路情報
  el: '#result',
  data: {
    area: AREA,
    route: [],
    kyori: 0,
    distance: 0,
    tansa: 0,
    luck: 0,
    speed: 0,
    jikan: '',
    tkoolUrl: TKOOL, // 潜水艦ツクールのURL
    tkoolCode: '', // 受け渡し用のサーチ情報
  },
  methods: {
    showRoute: function (ary) {
      let route = [];
      let kyori = 0;
      let distance = 0;
      [route, kyori, distance] = this.calcRoute(ary);
      this.route = route;
      this.kyori = kyori;
      this.distance = distance;

    },
    calcRoute: function (ary) {
      // 最短航路の算出
      const area = this.area;
      let trees = this.loopTree(ary);
      let result = [];
      let kyori = 0;
      let tmp_kyori = 0;
      let distance = 0;
      let tmp_distance = 0;
      for (let tree of trees) {
        tmp_distance = 0;
        tmp_kyori = 0;
        for (let i = 0; i < tree.length; i++) {
          tmp_kyori += (i < 1) ? area[tree[i]].move : area[tree[i - 1]].smove[tree[i]];
          tmp_kyori += area[tree[i]].sink;
          tmp_distance += (i < 1) ? area[tree[i]].kyori : area[tree[i - 1]].distance[tree[i]];
          tmp_distance += area[tree[i]].research;
        }
        if (distance === 0 || tmp_distance < distance) {
          kyori = tmp_kyori;
          distance = tmp_distance;
          result = tree;
        }
      }
      log('=================');
      log('Plans: ' + trees.length);
      log('Shortest:');
      log(result);
      log('Kyori: ' + kyori);
      log('Distance: ' + distance);
      return [result, kyori, distance];
    },
    loopTree: function (ary) {
      // 再帰的に総当たりリストを作る
      let r = [];
      if (ary.length > 1) {
        for (let i = 0; i < ary.length; i++) {
          let s = ary.slice(); // 配列をコピー
          let t = s.splice(i, 1); // コピーから1個抜く
          let u = this.loopTree(s); // 配列が死ぬまでボコボコにする
          for (let uu of u) {
            let v = uu.concat(t);
            r.push(v);
          }
        }
        return r;
      } else {
        return [ary];
      }
    },
    timer: function (val) {
      // 分を日・時間・分に変換
      const DEF_MIN = 12 * 60; // デフォルトで12時間かかる
      let date = val + DEF_MIN;
      let day = (date >= 24 * 60) ? Math.floor(date / (24 * 60)) + '日' : '';
      let hour = Math.floor((date % (24 * 60)) / 60) + '時間';
      let min = Math.floor(date % 60) + '分';
      return day + hour + min;
    },
    setTL: function (tansa, luck) {
      this.tansa = tansa;
      this.luck = luck;
    },
    setSpeed: function (speed) {
      this.speed = speed;
    },
  },
  mounted: function () {
    this.speed = submarine.speed;
  },
  updated: function () {
    this.jikan = this.timer(this.distance / this.speed);
    log('=================');
    log('Jikan:' + this.jikan);
    let params = [0, this.tansa, 0, 0, this.kyori, this.luck].slice(); // 潜水艦のパラメータ（そのうち直すかも）
    this.tkoolCode = (params.map(p => ('000' + p).slice(-3)).join('') - 0).toString(36);
    log('TkoolCode: ' + this.tkoolCode);
  }
});