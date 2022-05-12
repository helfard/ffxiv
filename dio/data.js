const KYU = [
  // 級の名前
  'shark', // シャーク
  'unkiu', // ウンキウ
  'whale', // ホエール
  'coelacanth', // シーラカンス
  'syldra', // シルドラ
  'modified shark', // シャーク改
  'modified unkiu', // ウンキウ改
  'modified whale', // ホエール改
  'modified coelacanth', // シーラカンス改
  'modified syldra', // シルドラ改
];
const KYU_S = [
  // 級の名前（短縮形）
  'sha', // シャ
  'un', // ウン
  'wha', // ホエ
  'coe', // シー
  'syl', // シル
  'm-sha', // ｼｬ改
  'm-un', // ｳﾝ改
  'm-wha', // ﾎｴ改
  'm-coe', // ｼｰ改
  'm-syl', // ｼﾙ改
];
const BUI = [
  // 部位の名前
  'hull', // 艦体
  'stern', // 艦尾
  'bow', // 艦首
  'bridge', // 艦橋
];
const PARA = [
  // パラメータの名前
  'cost', // コスト
  'surveillance', // 探査性能
  'retrieval', // 収集性能
  'speed', // 巡航速度
  'range', // 航続距離
  'favor' // 運
];
const PARA_S = [
  // パラメータの名前（短縮形）
  'cst', // Cost
  'srv', // 探査
  'rtr', // 収集
  'spd', // 速度
  'rng', // 距離
  'fvr' // 運
];
const SEINO = [
  // パーツ性能（コスト, 探査性能, 収集性能, 巡航速度, 航続距離, 運）
  [ // シャーク級
    [5, -10, 30, 20, 40, 20], // 艦体
    [5, -30, 20, 60, 30, 15], // 艦尾
    [5, 50, 40, 10, -20, 15], // 艦首
    [5, 20, 20, 20, 20, 20]  // 艦橋
  ], [ // ウンキウ級
    [9, 15, 10, 0, 60, 15], // 艦体
    [9, 15, 0, 30, 40, 25], // 艦尾
    [9, 60, 20, 20, -15, 10], // 艦首
    [9, 25, 5, 25, 30, 30]  // 艦橋
  ], [ // ホエール級
    [12, -15, 55, 35, 15, 20], // 艦体
    [12, 15, 20, 0, 55, 15], // 艦尾
    [12, 25, 60, -15, 20, 15], // 艦首
    [12, 0, 25, 20, 45, 40]  // 艦橋
  ], [ // シーラカンス級
    [14, 40, -10, 25, 40, 25], // 艦体
    [14, 10, 25, 35, 25, 25], // 艦尾
    [14, 65, 10, -10, 30, 0], // 艦首
    [14, 55, 20, 35, -15, 50]  // 艦橋
  ], [ // シルドラ級
    [17, 10, 75, 30, -15, 5], // 艦体
    [17, 20, 60, 35, -15, 5], // 艦尾
    [17, 45, 30, -15, 40, 40], // 艦首
    [17, 55, 20, -5, 30, 60]  // 艦橋
  ], [ // シャーク改級
    [20, -5, 40, 25, 45, 35], // 艦体
    [20, -25, 25, 70, 35, 25], // 艦尾
    [20, 55, 50, 15, -15, 25], // 艦首
    [20, 25, 25, 30, 25, 35]  // 艦橋
  ], [ // ウンキウ改級
    [20, 20, 15, 5, 65, 25], // 艦体
    [20, 20, 5, 35, 45, 35], // 艦尾
    [20, 65, 25, 25, -10, 20], // 艦首
    [20, 30, 10, 30, 35, 40]  // 艦橋
  ], [ // ホエール改級
    [20, -10, 55, 40, 20, 30], // 艦体
    [20, 20, 20, 5, 60, 20], // 艦尾
    [20, 25, 65, -10, 25, 25], // 艦首
    [20, 0, 30, 25, 50, 45]  // 艦橋
  ], [ // シーラカンス改級
    [20, 40, -5, 30, 40, 30], // 艦体
    [20, 10, 25, 40, 30, 30], // 艦尾
    [20, 70, 15, -10, 30, 5], // 艦首
    [20, 60, 20, 35, -10, 55]  // 艦橋
  ], [ // シルドラ改級
    [20, 10, 80, 30, -15, 10], // 艦体
    [20, 20, 60, 35, -10, 10], // 艦尾
    [20, 45, 30, -10, 40, 40], // 艦首
    [20, 60, 20, -5, 30, 60]  // 艦橋
  ]
];
const BONUS = [];
// ランクボーナス（コスト, 探査性能, 収集性能, 巡航速度, 航続距離, 運）
BONUS[50] = [0, 0, 0, 0, 0, 0]; // 50以下
BONUS[51] = [0, 2, 1, 0, 0, 0];
BONUS[52] = [0, 2, 3, 0, 1, 0];
BONUS[53] = [0, 2, 3, 1, 2, 1];
BONUS[54] = [0, 3, 4, 1, 3, 1];
BONUS[55] = [0, 3, 7, 3, 3, 1];
BONUS[56] = [0, 4, 7, 3, 5, 1];
BONUS[57] = [0, 4, 7, 3, 7, 2];
BONUS[58] = [0, 4, 8, 3, 8, 3];
BONUS[59] = [0, 5, 8, 4, 9, 3];
BONUS[60] = [0, 5, 10, 5, 10, 5];
BONUS[61] = [0, 7, 10, 6, 10, 6];
BONUS[62] = [0, 7, 10, 8, 12, 7];
BONUS[63] = [0, 8, 11, 8, 12, 9];
BONUS[64] = [0, 8, 12, 10, 14, 9];
BONUS[65] = [0, 10, 15, 10, 15, 10];
BONUS[66] = [0, 13, 17, 11, 15, 10];
BONUS[67] = [0, 13, 19, 13, 17, 10];
BONUS[68] = [0, 16, 19, 15, 17, 12];
BONUS[69] = [0, 16, 23, 15, 19, 13];
BONUS[70] = [0, 20, 25, 15, 20, 15];
BONUS[71] = [0, 23, 29, 15, 20, 15];
BONUS[72] = [0, 26, 29, 15, 22, 15];
BONUS[73] = [0, 26, 33, 17, 22, 17];
BONUS[74] = [0, 26, 35, 18, 23, 19];
BONUS[75] = [0, 30, 40, 20, 23, 20];
BONUS[76] = [0, 30, 45, 20, 23, 24];
BONUS[77] = [0, 34, 45, 21, 26, 25];
BONUS[78] = [0, 36, 45, 23, 29, 27];
BONUS[79] = [0, 38, 45, 25, 33, 28];
BONUS[80] = [0, 40, 50, 25, 35, 30];
BONUS[81] = [0, 40, 50, 30, 37, 32];
BONUS[82] = [0, 42, 50, 32, 40, 34];
BONUS[83] = [0, 43, 53, 32, 44, 35];
BONUS[84] = [0, 44, 53, 32, 49, 38];
BONUS[85] = [0, 48, 58, 33, 49, 39];
BONUS[86] = [0, 50, 58, 36, 49, 43];
BONUS[87] = [0, 50, 60, 36, 53, 46];
BONUS[88] = [0, 50, 64, 36, 56, 48];
BONUS[89] = [0, 50, 64, 40, 60, 49];
BONUS[90] = [0, 55, 70, 40, 60, 50];
BONUS[91] = [0, 57, 70, 41, 62, 51];
BONUS[92] = [0, 57, 70, 43, 64, 52];
BONUS[93] = [0, 58, 72, 43, 66, 54];
BONUS[94] = [0, 58, 74, 45, 68, 54];
BONUS[95] = [0, 60, 80, 45, 70, 55];
const DEKIAI = {
  // 定番構成（コスト, 探査性能, 収集性能, 巡航速度, 航続距離, 運）
  'kamacite ore': // カマサイト鉱石
    [
      {
        name: 'i',
        para: [null, 120, null, null, 47, null],
        comment: 'deepsea y',
      }, {
        name: 'ii',
        para: [null, 130, null, null, 84, null],
        comment: 'deepsea yv',
      }, {
        name: 'iii',
        para: [null, 130, null, null, 84, 100],
        comment: 'deepsea yv',
      }, {
        name: 'iv',
        para: [null, 130, null, null, 84, 105],
        comment: 'deepsea yv',
      }, {
        name: 'v',
        para: [null, 130, 140, null, 84, 105],
        comment: 'deepsea yv',
      }, {
        name: 'vi',
        para: [null, 130, 145, null, 84, 105],
        comment: 'deepsea yv',
      }, {
        name: 'vii',
        para: [null, 130, 190, null, 84, 105],
        comment: 'deepsea yv',
      }
    ],
  'cocobolo lumber': // ココボロ材
    [
      {
        name: 'i',
        para: [null, 145, null, null, 38, null],
        comment: 'ashsea ab',
      }, {
        name: 'ii',
        para: [null, 150, null, null, 63, null],
        comment: 'ashsea bad',
      }, {
        name: 'iii',
        para: [null, 155, null, null, 88, null],
        comment: 'ashsea badf',
      }, {
        name: 'iv',
        para: [null, 155, null, null, 88, 145],
        comment: 'ashsea badf',
      }, {
        name: 'v',
        para: [null, 155, 180, null, 88, 145],
        comment: 'ashsea badf',
      }, {
        name: 'vi',
        para: [null, 155, 220, null, 88, 145],
        comment: 'ashsea badf',
      }
    ],
  'balsa wood scrap': // バルサ廃材
    [
      {
        name: 'i',
        para: [null, 30, null, null, 38, null],
        comment: 'deepsea gh',
      }, {
        name: 'ii',
        para: [null, 35, null, null, 55, null],
        comment: 'deepsea igh',
      }, {
        name: 'iii',
        para: [null, 35, null, null, 55, 90],
        comment: 'deepsea igh',
      }, {
        name: 'iv',
        para: [null, 35, 75, null, 55, 90],
        comment: 'deepsea igh',
      }, {
        name: 'v',
        para: [null, 35, 105, null, 55, 90],
        comment: 'deepsea igh',
      }
    ],
  'pure titanium ore': // ピュアチタン鉱
    [
      {
        name: 'i',
        para: [null, 155, null, null, 74, null],
        comment: 'ashsea aci',
      }, {
        name: 'ii',
        para: [null, 160, null, null, 103, null],
        comment: 'ashsea acil',
      }, {
        name: 'iii',
        para: [null, 170, null, null, 138, null],
        comment: 'ashsea acmil',
      }, {
        name: 'iv',
        para: [null, 170, null, null, 138, 175],
        comment: 'ashsea acmil',
      }, {
        name: 'v',
        para: [null, 170, 240, null, 138, 175],
        comment: 'ashsea acmil',
      }
    ],
  'cryptomeria log': // クリプトメリア原木
    [
      {
        name: 'i',
        para: [null, 155, null, null, 76, null],
        comment: 'ashsea bdi',
      }, {
        name: 'ii',
        para: [null, 155, null, null, 109, null],
        comment: 'ashsea bdik',
      }, {
        name: 'iii',
        para: [null, 155, null, null, 109, 160],
        comment: 'ashsea bdik',
      }, {
        name: 'iv',
        para: [null, 155, 190, null, 109, 160],
        comment: 'ashsea bdik',
      }, {
        name: 'v',
        para: [null, 155, 230, null, 109, 160],
        comment: 'ashsea bdik',
      }
      /*
      ],
    'item name':
      [
        {
          name: 'i',
          para: [null, 0, null, null,  0, 0],
          comment: ''
        }, {
          name: 'ii',
          para: [null, 0, null, null,  0, 0],
          comment: ''
        }
      */
    ]
};