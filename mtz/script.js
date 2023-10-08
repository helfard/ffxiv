'use strict'

const DEBUG = location.hostname === 'localhost' ? true : false; // ローカル実行時はデバッグモード
const DEF_PANEL = [] // デフォルトパネル

// KYU 級の名前
// BUI 部位の名前
// MATERIALS 素材の一覧
// HOWTO 入手法の一覧

const panel = new Vue({
  // 入力パネル
  el: '#panel',
  data: {
    bui: BUI,
    kyu: KYU,
    formData: new Array(BUI.length * KYU.length).fill(0), // パーツの個数
  },
  methods: {
    check: function (i) {
      let ary = this.formData.slice()
      ary[i]++
      if (ary[i] >= 5) ary[i] = 0
      this.formData = ary
    },
    checkAll: function () {
      let ary = this.formData.slice()
      let ary2 = ary.map(v => (v < 4 ? ++v : 0))
      this.formData = ary2
    },
    checkLine: function (line) {
      const NUM = this.bui.length,
        START = line * NUM,
        END = (line + 1) * NUM
      let ary = this.formData.slice()
      for (let i = START; i < END; i++) {
        ary[i]++
        if (ary[i] >= 5) ary[i] = 0
      }
      this.formData = ary
    },
    clearAll: function () {
      let ary = this.formData.slice()
      let ary2 = ary.fill(0)
      this.formData = ary2
    },
    getLocalStorage: function () {
      // ローカルストレージからデータを所得
      let panel = localStorage.getItem('panel');
      if (panel) {
          this.formData = JSON.parse(panel);
      }
    },
    setLocalStorage: function () {
      // ローカルストレージにデータを保存
      let panel = this.formData;
      localStorage.setItem('panel', JSON.stringify(panel));
    },
  },
  mounted: function () {
    this.getLocalStorage(); // ローカルストレージからデータを所得
  },
  updated: function () {
    let ary = this.formData.slice()
    let ary2 = []
    for (let n = 0; n < ary.length; n++) {
      for (let m = 0; m < ary[n]; m++) {
        ary2.push(n)
      }
    }
    log('============')
    log(ary)
    log(ary2)
    log('Panels:')
    log(ary2)
    this.setLocalStorage(); // ローカルストレージにデータを保存
    sozai.makeTree(ary2)
  },
})

const sozai = new Vue({
  // 素材リスト
  el: '#sozai',
  data: {
    bui: BUI,
    kyu: KYU,
    materials: MATERIALS,
    materialKeys: Object.keys(MATERIALS),
    howto: HOWTO,
    howtoKeys: Object.keys(HOWTO),
    lastSozai: [],
    firstSozai: [],
    midSozai: [{}],
    sortKey: 'name', // ソート順（name: 名前順、volume: 個数順）
    totalSozai: {}, // トータル素材リスト
  },
  methods: {
    makeTree: function (ary) {
      const BUI = this.bui,
        B = this.bui.length,
        KYU = this.kyu
      let lastSozai = []
      // 最終産物をリスト化
      for (let a of ary) {
        lastSozai.push(KYU[Math.floor(a / B)] + '級' + BUI[a % B])
      }
      log('LastSozai:')
      log(lastSozai)
      // 素材の逆引き
      const K = this.kyu.length,
        M = this.materials,
        H = this.howto
      let midSozai = [{}],
        chukanSozai = [],
        firstSozai = []
      let totalSozai = {} // トータル素材リスト
      for (let sozai of lastSozai)
        midSozai[0][sozai] ? midSozai[0][sozai]++ : (midSozai[0][sozai] = 1) // 第一世代の個数
      for (let i = 0; i < midSozai.length; i++) {
        let nextSozai = {} // 次世代の素材と個数
        let endFlag = true
        for (let sozai of Object.keys(midSozai[i])) {
          // その世代の素材を走査
          if (M[sozai]) {
            // 素材の素材がある場合
            const N = M[sozai].num === undefined ? 1 : M[sozai].num // 素材が複数個できる場合の補正
            endFlag = false
            for (let s of Object.keys(M[sozai])) {
              if (s === 'num') continue
              if (!nextSozai[s]) nextSozai[s] = 0
              if (!totalSozai[s]) totalSozai[s] = 0
              let add = Math.ceil(midSozai[i][sozai] / N) * M[sozai][s]
              nextSozai[s] += add // 次世代の素材と個数をセット
              totalSozai[s] += add // トータル素材リストにも記憶しておく
            }
            if (H[sozai] && !chukanSozai.includes(sozai))
              chukanSozai.push(sozai) // 入手手段がある中間素材は覚えておく
          } else {
            // 素材の素材がない場合
            if (H[sozai]) {
              // 入手手段がある場合
              if (!firstSozai.includes(sozai)) firstSozai.push(sozai) // 初見は一次素材として覚えておく
              if (!nextSozai[sozai]) nextSozai[sozai] = 0
              nextSozai[sozai] += midSozai[i][sozai]
            } else {
              log('エラー：' + sozai + 'のデータが無いです。') // 入手手段がない一次素材があったらデータの登録ミス
            }
          }
        }
        if (endFlag) {
          firstSozai = Object.keys(nextSozai)
          break // 最終世代なら終了
        } else {
          midSozai[i + 1] = nextSozai // 次世代にセット
        }
      }
      log('MidSozai:')
      log(midSozai)
      this.lastSozai = lastSozai
      this.midSozai = midSozai
      this.firstSozai = firstSozai
      this.totalSozai = totalSozai
      this.sortKeys(this.sortKey)
      log('TotalSozai:')
      log(totalSozai)
      checker.setupList(totalSozai)
    },
    sortKeys: function () {
      let sortKey = this.sortKey; // ソート順（name: 名前順、volume: 個数順）
      let firstSozai = this.firstSozai.slice();
      const S = this.midSozai.slice(-1)[0]
      if (sortKey === 'name') {
        // 名前でソート
        firstSozai.sort()
      } else {
        // 個数でソート
        firstSozai.sort((a, b) => S[b] - S[a])
      }
      log('FirstSozai:')
      log(firstSozai)
      log('SortKey:')
      log(sortKey)
      this.firstSozai = firstSozai  
    },
    getLocalStorage: function () {
      // ローカルストレージからデータを所得
      let sortKey = localStorage.getItem('listSortKey');
      if (sortKey) {
          this.sortKey = JSON.parse(sortKey);
      }
    },
    setLocalStorage: function () {
      // ローカルストレージにデータを保存
      let sortKey = this.sortKey;
      localStorage.setItem('listSortKey', JSON.stringify(sortKey));
    },
    copyTxt: function () {
      const S = this.firstSozai.slice()
      const N = this.midSozai.slice(-1)[0]
      let txt = ''
      for (let s of S) txt += s + ' ' + N[s] + '\n'
      if (execCopy(txt)) alert('コピーしました！')
    },
  },
  watch: {
    sortKey() {
      this.sortKeys();
    },
  },
  mounted: function () {
    this.getLocalStorage();
  },
  updated: function () {
    this.setLocalStorage();
  },
})

// 更新があるのは以下のタイミング
// リロードしてローカルストレージを読み込んだ場合
// パーツ一覧に操作があった場合

const checker = new Vue({
  // 収集チェッカー
  el: '#checker',
  data: {
    debug: DEBUG, // デバッグモード
    materials: MATERIALS,
    listSozai: {},
    keysSozai: [],
    showMode: 1, // 表示モード（0:一次素材のみ, 1:直接入手手段がある素材, 2:全て）
    sortKey: 'name',
    howto: HOWTO, // 素材の入手法
    formValues: {}, // 現物の数
  },
  watch: {
  },
  methods: {
    shortName: function (name) {
      return shortenString(name);
    },
    setupList: function (totalSozai) {
      const M = this.materials
      // リストのセットアップ
      let listSozai = {}
      let formValues = {}
      for (let key of Object.keys(totalSozai)) {
        listSozai[key] = {
          required: totalSozai[key], // 必要数
          realValue: 0, // 現物や上位素材から換算した数
          checked: false, // 足りてるボタン
          flag: false, // 足りてるフラグ
        },
        formValues[key] = null; // 現物の数
      }
      this.listSozai = listSozai
      this.getLocalStorage();
      this.sortKeys(this.sortKey)
      this.checkZaiko();
      log('KeysSozai:')
      log(this.keysSozai)
      log('ListSozai:')
      log(listSozai)
    },
    sortKeys: function (key) {
      let listSozai = this.listSozai
      let keysSozai = Object.keys(listSozai)
      if (key === 'volume') {
        // 個数でソート
        keysSozai.sort((a, b) => listSozai[b].required - listSozai[a].required)
      } else {
        // 名前でソート
        keysSozai.sort()
      }
      log('KeysSozai:')
      log(keysSozai)
      log('SortKey:')
      log(key)
      this.keysSozai = keysSozai
      this.sortKey = key
    },
    checkZaiko: function () {
      const M = this.materials
      let listSozai = this.listSozai
      let keysSozai = this.keysSozai
      let formValues = this.formValues
      // 実質数のチェック
      let prevZaiko = {},
        nextZaiko = {}
      for (let key of keysSozai) {
        let n = 0
        if (listSozai[key]) {
          if (formValues[key] >= listSozai[key].required) {
            n = listSozai[key].required
          } else if (formValues[key] > 0) {
            n = formValues[key]
          }
        }
        prevZaiko[key] = n
      }
      for (let i = 0; i < 10; i++) {
        for (let key of keysSozai)
          nextZaiko[key] = (formValues[key])
            ? formValues[key]
            : 0 // 初期値
        for (let sozai of keysSozai) {
          if (M[sozai]) {
            const N = M[sozai].num === undefined ? 1 : M[sozai].num // 素材が複数個できる場合の補正
            for (let s of Object.keys(M[sozai])) {
              if (s === 'num') continue
              let add = Math.ceil(prevZaiko[sozai] / N) * M[sozai][s]
              nextZaiko[s] += add // 次世代の在庫をセット
            }
          }
        }  
        for (let key of keysSozai) {
          if (nextZaiko[key] >= listSozai[key].required) {
            nextZaiko[key] = listSozai[key].required
            listSozai[key].flag = true
          } else {
            listSozai[key].flag = false
          }
        }
        if (JSON.stringify(prevZaiko) === JSON.stringify(nextZaiko)) break // 最終世代なら終了
        prevZaiko = Object.assign({}, nextZaiko)
      }
      for (let key of keysSozai) listSozai[key].realValue = prevZaiko[key]
      this.checkFlags();
      this.listSozai = Object.assign({}, listSozai)
    },
    fillForm: function (key) {
      
      log('ここから');
      log(this.formValues);
      log('ここまで');

      this.formValues[key] =
        this.formValues[key] === this.listSozai[key].required - 0
        ? null : this.listSozai[key].required
  
        this.checkZaiko()
    },
    checkFlags: function () {
      // 足りてるかチェック
      let listSozai = this.listSozai;
      for (let sozai of Object.keys(listSozai)) {
        if (listSozai[sozai].realValue && listSozai[sozai].realValue >= listSozai[sozai].required) {
          listSozai[sozai].flag = true;
        } else {
          listSozai[sozai].flag = false;
        }
      }
      this.listSozai = Object.assign({}, listSozai);
      this.setLocalStorage();
    },
    clearValue: function () {
      // 所持数をリセット
      this.formValues = {};
      this.checkZaiko();
    },
    showMemo: function (item) {
      const howto = this.howto
      if (howto[item]) alert(item + ':\n ' + howto[item]['メモ'])
      log('Memo: ' + item)
    },
    getLocalStorage: function () {
      // ローカルストレージからデータを所得
      let showMode = localStorage.getItem('checkerShowMode');
      if (showMode) {
          this.showMode = JSON.parse(showMode);
      }
      let jsonFormValues = localStorage.getItem('checkerFormValues');
      if (jsonFormValues) {
        let parsedFormValues = JSON.parse(jsonFormValues);
        let formValues = {};
        let keys = Object.keys(parsedFormValues);
        Object.keys(parsedFormValues).forEach(key => {
          formValues[key] = parsedFormValues[key];
        });
        this.formValues = Object.assign({}, formValues);
        //        this.listSozai = Object.assign({}, this.listSozai, tmp);
//        let keys = Object.keys(parsedFormValues);

        //        let listSozai = Object.assign({}, this.listSozai, parsedFormValues);
//        for (let i = 0; i < keys.length; i++) {
//          this.$set(this.listSozai[keys[i]], 'formValue', parsedFormValues[keys[i]]);
//        }
//        Object.keys(parsedFormValues).forEach(key => this.$set(this.listSozai[key], 'formValue', parsedFormValues[key]));
      }
      let sortKey = localStorage.getItem('checkerSortKey');
      if (sortKey) {
          this.sortKey = JSON.parse(sortKey);
      }
    },
    setLocalStorage: function () {
      // ローカルストレージにデータを保存
      let showMode = this.showMode;
      localStorage.setItem('checkerShowMode', JSON.stringify(showMode));
      let listSozai = this.listSozai;
      let formValues = {}; // { key: 名前, value: 数 }
      Object.keys(this.formValues).forEach(key => {
        if (this.formValues[key]) {
          formValues[key] = this.formValues[key];
        }
      });
      localStorage.setItem('checkerFormValues', JSON.stringify(formValues));
      let sortKey = this.sortKey;
      localStorage.setItem('checkerSortKey', JSON.stringify(sortKey));
    },
  },
  mounted: function () {
  },
  updated: function () {
  },
})
