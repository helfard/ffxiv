'use strict';

const TKOOL = 'https://helfard.github.io/ffxiv/stkool/'; // 潜水艦ツクールのURL

const AREA = [
  {
    id: 'A',
    name: 'ゾーゾーナン島南端',
    move: 9,
    sink: 12,
    smove: [0, 5, 6, 9, 20, 13, 11, 22, 19, 21, 17, 26, 19, 23, 18, 21, 24, 30, 22, 27],
    x: 65,
    y: 222,
    kyori: 11184,
    research: 33600,
    distance: [0, 6640, 7193, 10381, 23265, 15360, 13618, 26130, 22676, 24847, 20191, 30255, 22602, 27029, 20694, 25059, 27931, 34202, 25496, 31844],
    drop: [
      { name: 'ココボロ材', tansa: 150 },
      { name: 'ピュアチタン鉱', tansa: 150 },
      { name: 'ウキグモソウ', tansa: 135 },
    ],
    luck: 140,
  }, {
    id: 'B',
    name: 'ウィンド・ウォーカーの残骸',
    move: 12,
    sink: 12,
    smove: [5, 0, 10, 13, 23, 15, 16, 25, 23, 25, 19, 30, 25, 29, 23, 27, 27, 35, 27, 30],
    x: 18,
    y: 250,
    kyori: 14300,
    research: 33600,
    distance: [6640, 0, 11956, 15494, 26816, 17883, 18267, 29488, 26469, 28841, 22606, 34408, 29129, 33667, 26601, 31019, 31552, 40282, 31642, 34330],
    drop: [
      { name: 'ココボロ材', tansa: 155 },
      { name: 'クリプトメリア原木', tansa: 155 },
      { name: '天然水晶', tansa: 140 },
    ],
    luck: 140,
  }, {
    id: 'C',
    name: 'ゾーゾーナン島北端',
    move: 14,
    sink: 13,
    smove: [6, 10, 0, 9, 21, 9, 8, 19, 19, 19, 12, 22, 18, 21, 18, 16, 26, 26, 18, 23],
    x: 61,
    y: 164,
    kyori: 16864,
    research: 37800,
    distance: [7193, 11956, 0, 10601, 24547, 10320, 9185, 22258, 21799, 22031, 14230, 25626, 21560, 24498, 21056, 19261, 30402, 29860, 21159, 26689],
    drop: [
      { name: 'ピュアチタン鉱', tansa: 140 },
    ],
    luck: 145,
  }, {
    id: 'D',
    name: '灰海01',
    move: 14,
    sink: 13,
    smove: [9, 13, 9, 0, 12, 11, 6, 15, 11, 13, 15, 19, 15, 19, 11, 18, 17, 22, 15, 22],
    x: 112,
    y: 192,
    kyori: 16163,
    research: 37800,
    distance: [10381, 15494, 10601, 0, 14033, 13287, 7859, 18153, 12699, 15375, 18135, 21915, 18030, 21897, 13167, 21110, 19957, 26035, 17982, 26135],
    drop: [
      { name: 'ココボロ材', tansa: 145 }, // 問題なしでも採れる（個数は少ないかも）
      { name: 'クリプトメリア原木', tansa: 145 }, // 問題なしでも採れる（個数は少ないかも）
    ],
    luck: 145,
  }, {
    id: 'E',
    name: '火葬炉海溝南端',
    move: 22,
    sink: 14,
    smove: [20, 23, 21, 12, 0, 20, 16, 17, 6, 12, 24, 19, 20, 23, 12, 26, 7, 23, 19, 25],
    x: 165,
    y: 223,
    kyori: 25322,
    research: 42000,
    distance: [23265, 26816, 24547, 14033, 0, 23746, 18736, 19502, 7674, 14151, 27818, 22746, 23364, 26792, 14219, 29806, 8692, 27002, 22369, 29595],
    drop: [
      { name: 'コバンザメ級潜水艦', tansa: 160 },
    ],
    luck: 150,
  }, {
    id: 'F',
    name: '灰海02',
    move: 22,
    sink: 14,
    smove: [13, 15, 9, 11, 20, 0, 6, 12, 16, 14, 4, 16, 23, 25, 21, 17, 27, 24, 18, 14],
    x: 27,
    y: 112,
    kyori: 25826,
    research: 42000,
    distance: [15360, 17883, 10320, 13287, 23746, 0, 6968, 14258, 18371, 16393, 5426, 18509, 27111, 28708, 24750, 20471, 31558, 28328, 20886, 16934],
    drop: [
      { name: 'ココボロ材', tansa: 145 }, // 問題なしでも採れる（個数は少ないかも）
      { name: 'アロハウソウソ', tansa: 165 },
    ],
    luck: 145,
  }, {
    id: 'G',
    name: '灰海03',
    move: 19,
    sink: 15,
    smove: [11, 16, 8, 6, 16, 6, 0, 11, 12, 11, 9, 14, 18, 19, 15, 14, 22, 20, 13, 17],
    x: 82,
    y: 126,
    kyori: 22125,
    research: 46200,
    distance: [13618, 18267, 9185, 7859, 18736, 6968, 0, 13388, 13965, 12972, 10780, 16762, 20570, 22457, 17866, 16738, 25948, 23308, 15293, 19494],
    drop: [
      { name: 'アロハウソウソ', tansa: 165 },
      { name: '天然緑水晶', tansa: 150 },
    ],
    luck: 140,
  }, {
    id: 'H',
    name: '修道士たちの墓標',
    move: 30,
    sink: 15,
    smove: [22, 25, 19, 15, 17, 12, 11, 0, 10, 5, 12, 5, 25, 25, 21, 20, 24, 19, 15, 8],
    x: 80,
    y: 76,
    kyori: 34250,
    research: 46200,
    distance: [26130, 29488, 22258, 18153, 19502, 14258, 13388, 0, 11842, 5985, 14408, 6544, 29014, 29206, 24443, 22842, 27794, 21952, 18180, 10225],
    drop: [
      { name: '沈没船の〇〇', tansa: 160 },
      { name: '引き上げられた古銭', tansa: 175 },
      { name: '海底の財宝', tansa: 175 },
    ],
    luck: 150,
  }, {
    id: 'I',
    name: '火葬炉海溝中腹',
    move: 24,
    sink: 15,
    smove: [19, 23, 19, 11, 6, 16, 12, 10, 0, 5, 18, 13, 20, 22, 14, 22, 14, 20, 16, 19],
    x: 132,
    y: 159,
    kyori: 27663,
    research: 46200,
    distance: [22676, 26469, 21799, 12699, 7674, 18371, 13965, 11842, 0, 6580, 21579, 15349, 23716, 25836, 16158, 25401, 16017, 22932, 18259, 21992],
    drop: [
      { name: 'ピュアチタン鉱', tansa: 155 },
      { name: 'クリプトメリア原木', tansa: 155 },
      { name: 'コバンザメ級潜水艦', tansa: 170 },
      { name: '天然青水晶', tansa: 170 },
    ],
    luck: 140,
  }, {
    id: 'J',
    name: '神父の岩窟',
    move: 27,
    sink: 15,
    smove: [21, 25, 19, 13, 12, 14, 11, 5, 5, 0, 15, 7, 22, 22, 17, 19, 19, 17, 13, 14],
    x: 120,
    y: 104,
    kyori: 31355,
    research: 46200,
    distance: [24847, 28841, 22031, 15375, 14151, 16393, 12972, 5985, 6580, 0, 18043, 8814, 25124, 25811, 19448, 22429, 22101, 19700, 15790, 16141],
    drop: [
      { name: 'アンティークポットセット', tansa: 170 },
      { name: '天然赤水晶', tansa: 170 },
    ],
    luck: 150,
  }, {
    id: 'K',
    name: '灰海04',
    move: 26,
    sink: 15,
    smove: [17, 19, 12, 15, 24, 4, 9, 12, 18, 15, 0, 15, 26, 26, 24, 17, 31, 24, 18, 12],
    x: 11,
    y: 70,
    kyori: 30604,
    research: 46200,
    distance: [20191, 22606, 14230, 18135, 27818, 5426, 10780, 14408, 21579, 18043, 0, 17487, 29858, 30413, 28407, 19964, 35827, 28126, 21569, 13803],
    drop: [
      { name: 'クリプトメリア原木', tansa: 155 },
      { name: 'コバンザメ級潜水艦', tansa: 170 },
    ],
    luck: 160,
  }, {
    id: 'L',
    name: '砂利の海盆',
    move: 33,
    sink: 16,
    smove: [26, 30, 22, 19, 19, 16, 14, 5, 13, 7, 15, 0, 25, 24, 22, 18, 26, 15, 13, 9],
    x: 112,
    y: 32,
    kyori: 37649,
    research: 50400,
    distance: [30255, 34408, 25626, 21915, 22746, 18509, 16762, 6544, 15349, 8814, 17487, 0, 28686, 27496, 25360, 20761, 30183, 17203, 15699, 11113],
    drop: [
      { name: 'ピュアチタン鉱', tansa: 160 },
      { name: '天然赤水晶', tansa: 180 },
    ],
    luck: 165,
  }, {
    id: 'M',
    name: '片割れ手袋島',
    move: 18,
    sink: 16,
    smove: [19, 25, 18, 15, 20, 23, 18, 25, 20, 22, 26, 25, , 5, 8, 14, 21, 17, 12, 32],
    x: 240,
    y: 150,
    kyori: 20566,
    research: 50400,
    distance: [22602, 29129, 21560, 18030, 23364, 27111, 20570, 29014, 23716, 25124, 29858, 28686, 0, 6308, 9416, 17008, 24128, 20110, 14376, 36638],
    drop: [
      { name: 'ココボロ材', tansa: 160 },
      { name: 'ピュアチタン鉱', tansa: 170 },
    ],
    luck: 175,
  }, {
    id: 'N',
    name: '穴あき靴下島',
    move: 23,
    sink: 17,
    smove: [23, 29, 21, 19, 23, 25, 19, 25, 22, 22, 26, 24, 5, , 12, 12, 24, 13, 10, 31],
    x: 258,
    y: 98,
    kyori: 26391,
    research: 54600,
    distance: [27029, 33667, 24498, 21897, 26792, 28708, 22457, 29206, 25836, 25811, 30413, 27496, 6308, 0, 13804, 14040, 28131, 15846, 11925, 35918],
    drop: [
      { name: 'ココボロ材', tansa: 165 },
      { name: 'クリプトメリア原木', tansa: 190 },
      { name: 'ミーアキャット', tansa: 190 },
    ],
    luck: 170,
  }, {
    id: 'O',
    name: '密輸業者の取引場',
    move: 17,
    sink: 17,
    smove: [18, 23, 18, 11, 12, 21, 15, 21, 14, 17, 24, 22, 8, 12, 0, 18, 13, 18, 13, 29],
    x: 221,
    y: 186,
    kyori: 19466,
    research: 54600,
    distance: [20694, 26601, 21056, 13167, 14219, 24750, 17866, 24443, 16158, 19448, 28407, 25360, 9416, 13804, 0, 21382, 14962, 21059, 15299, 33640],
    drop: [
      { name: '引き上げられた古銭', tansa: 170 },
      { name: '黄金の水瓶', tansa: 185 },
      { name: '海底の財宝', tansa: 170 },
      { name: 'アンティークポットセット', tansa: 185 },
    ],
    luck: 175,
  }, {
    id: 'P',
    name: '擦り切れローブ島',
    move: 26,
    sink: 20,
    smove: [21, 27, 16, 18, 26, 17, 14, 20, 22, 19, 17, 18, 14, 12, 18, 0, 30, 13, 8, 22],
    x: 160,
    y: 30,
    kyori: 29752,
    research: 54600,
    distance: [25059, 31019, 19261, 21110, 29806, 20471, 16738, 22842, 25401, 22429, 19964, 20761, 17008, 14040, 21382, 0, 34725, 15311, 9552, 26044],
    drop: [
      { name: 'ココボロ材', tansa: 170 },
      { name: 'クリプトメリア原木', tansa: 170 },
      { name: 'ミーアキャット', tansa: 180 },
      { name: 'シマエナガ', tansa: 180 },
      { name: '天然緑水晶', tansa: 180 },
    ],
    luck: 165,
  }, {
    id: 'Q',
    name: 'ナルザルの煙管',
    move: 23,
    sink: 20,
    smove: [24, 27, 26, 17, 7, 27, 22, 24, 14, 19, 31, 26, 21, 24, 13, 30, 0, 26, 23, 33],
    x: 220,
    y: 260,
    kyori: 26438,
    research: 56000,
    distance: [27931, 31552, 30402, 19957, 8692, 31558, 25948, 27794, 16017, 22101, 35827, 30183, 24128, 28131, 14962, 34725, 0, 30669, 26960, 37992],
    drop: [
      { name: 'アロハウソウソ', tansa: 165 }, // 160じゃなくて？
      { name: '天然赤水晶', tansa: 165 }, // 160じゃなくて？
    ],
    luck: 165,
  }, {
    id: 'R',
    name: '走錨海域',
    move: 32,
    sink: 21,
    smove: [30, 35, 26, 22, 23, 24, 20, 19, 20, 17, 24, 15, 17, 13, 18, 13, 26, 0, 7, 23],
    x: 239,
    y: 13,
    kyori: 37509,
    research: 57400,
    distance: [34202, 40282, 29860, 26035, 27002, 28328, 23308, 21952, 22932, 19700, 28126, 17203, 20110, 15846, 21059, 15311, 30669, 0, 8800, 27135],
    drop: [
      { name: 'コバンザメ級潜水艦', tansa: 185 },
      { name: '天然黃水晶', tansa: 185 },
      { name: 'アンティークポットセット', tansa: 185 },
    ],
    luck: 165,
  }, {
    id: 'S',
    name: '強欲の胃袋',
    move: 25,
    sink: 21,
    smove: [22, 27, 18, 15, 19, 18, 13, 15, 16, 13, 18, 13, 12, 10, 13, 8, 23, 7, 0, 21],
    x: 194,
    y: 59,
    kyori: 29346,
    research: 60200,
    distance: [25496, 31642, 21159, 17982, 22369, 20886, 15293, 18180, 18259, 15790, 21569, 15699, 14376, 11925, 15299, 9552, 26960, 8800, 0, 24370],
    drop: [
      { name: '焼結砥石', tansa: 190 },
      { name: '舞海月', tansa: 190 },
      { name: '海底の財宝', tansa: 175 },
      { name: '引き上げられた古銭', tansa: 175 },
    ],
    luck: 175,
  }, {
    id: 'T',
    name: 'ブルーホール',
    move: 36,
    sink: 22,
    smove: [27, 30, 23, 22, 25, 14, 17, 8, 19, 14, 12, 9, 32, 31, 29, 22, 33, 23, 21],
    x: 22,
    y: 9,
    kyori: 41438,
    research: 61600,
    distance: [31844, 34330, 26689, 26135, 29595, 16934, 19494, 10225, 21992, 16141, 13803, 11113, 36638, 35918, 33640, 26044, 37992, 27135, 24370, 0],
    drop: [
      { name: 'ココボロ材', tansa: 180 },
      { name: '天然青水晶', tansa: 190 },
      { name: '黄金の水瓶', tansa: 190 },
    ],
    luck: 175,
    /*
      }, {
        id: 'U',
        name: '',
        move: ,
        sink: ,
        smove: [],
        x: ,
        y: ,
        kyori: ,
        research: ,
        distance: [],
        drop: [
      { name: '', tansa: },
      { name: '', tansa: },
      { name: '', tansa: },
    ],
        luck: 0,
      }, {
        id: 'V',
        name: '',
        move: ,
        sink: ,
        smove: [],
        x: ,
        y: ,
        kyori: ,
        research: ,
        distance: [],
        drop: [
      { name: '', tansa: },
      { name: '', tansa: },
      { name: '', tansa: },
    ],
        luck: 0,
      }, {
        id: 'W',
        name: '',
        move: ,
        sink: ,
        smove: [],
        x: ,
        y: ,
        kyori: ,
        research: ,
        distance: [],
        drop: [
      { name: '', tansa: },
      { name: '', tansa: },
      { name: '', tansa: },
    ],
        luck: 0,
      }, {
        id: 'X',
        name: '',
        move: ,
        sink: ,
        smove: [],
        x: ,
        y: ,
        kyori: ,
        research: ,
        distance: [],
        drop: [
      { name: '', tansa: },
      { name: '', tansa: },
      { name: '', tansa: },
    ],
        luck: 0,
      }, {
        id: 'Y',
        name: '',
        move: ,
        sink: ,
        smove: [],
        x: ,
        y: ,
        kyori: ,
        research: ,
        distance: [],
        drop: [
      { name: '', tansa: },
      { name: '', tansa: },
      { name: '', tansa: },
    ],
        luck: 0,
      }, {
        id: 'Z',
        name: '',
        move: ,
        sink: ,
        smove: [],
        x: ,
        y: ,
        kyori: ,
        research: ,
        distance: [],
        drop: [
      { name: '', tansa: },
      { name: '', tansa: },
      { name: '', tansa: },
    ],
        luck: 0,
    */
  }
];

const ITEMS = [
  // 逆引き用のリスト
  'ココボロ材',
  'ピュアチタン鉱',
  'クリプトメリア原木',
  'コバンザメ級潜水艦',
  'アロハウソウソ',
  'ミーアキャット',
  'シマエナガ',
  '舞海月',
  'ウキグモソウ',
  '沈没船の〇〇',
  '引き上げられた古銭',
  '海底の財宝',
  '黄金の水瓶',
  'アンティークポットセット',
  '天然水晶',
  '天然緑水晶',
  '天然青水晶',
  '天然赤水晶',
  '天然黃水晶',
  '焼結砥石',
];