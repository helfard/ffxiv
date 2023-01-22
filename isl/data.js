
const FIELD = {
    '無人島のパームリーフ': { rank: 4, supplier: 'field', },
    '無人島のアップル': { rank: 4, supplier: 'field', },
    '無人島の小枝': { rank: 4, supplier: 'field', },
    '無人島の石材': { rank: 4, supplier: 'field', },
    '無人島の二枚貝': { rank: 4, supplier: 'field', },
    '無人島の玉藻': { rank: 4, supplier: 'field', },
    '無人島の珊瑚': { rank: 4, supplier: 'field', },
    '無人島の草葉': { rank: 4, supplier: 'field', },
    '無人島の砂': { rank: 4, supplier: 'field', },
    '無人島の原木': { rank: 4, supplier: 'field', },
    '無人島のパーム原木': { rank: 4, supplier: 'field', },
    '無人島のつる': { rank: 4, supplier: 'field', },
    '無人島の樹液': { rank: 4, supplier: 'field', },
    '無人島の銅鉱': { rank: 5, supplier: 'field', },
    '無人島の石灰岩': { rank: 4, supplier: 'field', },
    '無人島の岩塩': { rank: 4, supplier: 'field', },
    '無人島のサトウキビ': { rank: 6, supplier: 'field', },
    '無人島の綿花': { rank: 6, supplier: 'field', },
    '無人島の麻': { rank: 6, supplier: 'field', },
    '無人島の粘土': { rank: 5, supplier: 'field', },
    '無人島の砂錫': { rank: 5, supplier: 'field', },
    '無人島の鉄鉱': { rank: 8, supplier: 'field', },
    '無人島のクォーツ': { rank: 8, supplier: 'field', },
    '無人島の花崗岩': { rank: 8, supplier: 'field', },
    '無人島の海水魚': { rank: 7, supplier: 'field', },
    '無人島のスキッド': { rank: 7, supplier: 'field', },
    '無人島のジェリーフィッシュ': { rank: 7, supplier: 'field', },
    '無人島のアリッサム': { rank: 4, supplier: 'granary', },
    '無人島のガーネット原石': { rank: 4, supplier: 'granary', },
    '無人島のスプルース原木': { rank: 4, supplier: 'granary', },
    '無人島のハンマーヘッド': { rank: 4, supplier: 'granary', },
    '無人島の銀鉱': { rank: 4, supplier: 'granary', },
}
Object.keys(FIELD).forEach(sozai => {
    let str = sozai;
    str = str.replace('無人島の', '');
    FIELD[sozai].shorten = str;
});
const CROPLAND = {
    'アイルポポト': { rank: 5, supplier: 'field', },
    'アイルキャベツ': { rank: 4, supplier: 'field', },
    'アイルベリー': { rank: 7, supplier: 'crops', },
    'アイルパンプキン': { rank: 4, supplier: 'field', },
    'アイルオニオン': { rank: 7, supplier: 'crops', },
    'アイルトマト': { rank: 7, supplier: 'crops', },
    'アイル小麦': { rank: 7, supplier: 'crops', },
    'アイルコーン': { rank: 7, supplier: 'crops', },
    'アイルパースニップ': { rank: 5, supplier: 'field', },
    'アイルラディッシュ': { rank: 7, supplier: 'crops', },
}
Object.keys(CROPLAND).forEach(sozai => {
    let str = sozai;
    str = str.replace('アイル', '');
    CROPLAND[sozai].shorten = str;
});
const PASTURE = {
    '飼育動物のフリース': {},
    '飼育動物の爪片': {},
    '飼育動物の獣毛': {},
    '飼育動物の羽根': {},
    '飼育動物の卵': {},
    '飼育動物の脱皮殻': {},
    '飼育動物の牙': {},
    '飼育動物の角片': {},
    '飼育動物の乳': {},
};
Object.keys(PASTURE).forEach(sozai => {
    let str = sozai;
    str = str.replace('飼育動物の', '');
    PASTURE[sozai].shorten = str;
});

const TOSANHIN = {
    'アイルポーション': {
        rank: 4,
        jikan: 4,
        kazu: 1,
        nedan: 28,
        tokusei: ['薬品'],
        sozai: {
            '無人島のパームリーフ': 2,
            '無人島の草葉': 2,
        },
    },
    '開拓工房の火薬': {
        rank: 4,
        jikan: 4,
        kazu: 1,
        nedan: 28,
        tokusei: ['薬品', '窯業製品'],
        sozai: {
            '無人島の砂': 2,
            '無人島の石灰岩': 1,
            '無人島の草葉': 1,
        },
    },
    'アイルウッドチェア': {
        rank: 4,
        jikan: 6,
        kazu: 1,
        nedan: 42,
        tokusei: ['調度品', '木工製品'],
        sozai: {
            '無人島の原木': 4,
            '無人島のつる': 2,
        },
    },
    '開拓工房の焼き貝': {
        rank: 4,
        jikan: 4,
        kazu: 1,
        nedan: 28,
        tokusei: ['料理', '海産製品'],
        sozai: {
            '無人島の二枚貝': 2,
            '無人島の玉藻': 2,
        },
    },
    'アイルウッドネックレス': {
        rank: 4,
        jikan: 4,
        kazu: 1,
        nedan: 28,
        tokusei: ['アクセサリ', '木工製品'],
        sozai: {
            '無人島の小枝': 3,
            '無人島のつる': 1,
        },
    },
    'アイルコーラルリング': {
        rank: 4,
        jikan: 6,
        kazu: 1,
        nedan: 42,
        tokusei: ['アクセサリ', '海産製品'],
        sozai: {
            '無人島の珊瑚': 3,
            '無人島のつる': 3,
        },
    },
    'アイルバルビュート': {
        rank: 4,
        jikan: 6,
        kazu: 1,
        nedan: 42,
        tokusei: ['防具', '金属製品'],
        sozai: {
            '無人島の銅鉱': 3,
            '無人島の砂': 3,
        },
    },
    'アイルマクアフティル': {
        rank: 4,
        jikan: 6,
        kazu: 1,
        nedan: 42,
        tokusei: ['武器', '木工製品'],
        sozai: {
            '無人島のパーム原木': 1,
            '無人島の石材': 2,
        },
    },
    '開拓工房のザワークラウト': {
        rank: 4,
        jikan: 4,
        kazu: 1,
        nedan: 40,
        tokusei: ['保存食'],
        sozai: {
            'アイルキャベツ': 1,
            '無人島の岩塩': 3,
        },
    },
    '開拓工房の焼きパンプキン': {
        rank: 4,
        jikan: 4,
        kazu: 1,
        nedan: 40,
        tokusei: ['料理'],
        sozai: {
            'アイルパンプキン': 1,
            '無人島の樹液': 3,
        },
    },
    'アイルチュニック': {
        rank: 4,
        jikan: 6,
        kazu: 1,
        nedan: 72,
        tokusei: ['防具', '布製品'],
        sozai: {
            '飼育動物のフリース': 2,
            '無人島のつる': 4,
        },
    },
    'アイルクリナリーナイフ': {
        rank: 4,
        jikan: 4,
        kazu: 1,
        nedan: 44,
        tokusei: ['日用品', '動物製品'],
        sozai: {
            '飼育動物の爪片': 1,
            '無人島のパーム原木': 3,
        },
    },
    'アイルブラシ': {
        rank: 4,
        jikan: 4,
        kazu: 1,
        nedan: 44,
        tokusei: ['日用品', '木工製品'],
        sozai: {
            '飼育動物の獣毛': 1,
            '無人島のパーム原木': 3,
        },
    },
    '開拓工房のボイルドエッグ': {
        rank: 4,
        jikan: 4,
        kazu: 1,
        nedan: 44,
        tokusei: ['料理', '動物製品'],
        sozai: {
            '飼育動物の卵': 1,
            '無人島の玉藻': 3,
        },
    },
    'アイルホラ': {
        rank: 4,
        jikan: 6,
        kazu: 1,
        nedan: 72,
        tokusei: ['武器', '動物製品'],
        sozai: {
            '飼育動物の脱皮殻': 2,
            '無人島の石材': 4,
        },
    },
    'アイルファングイヤリング': {
        rank: 4,
        jikan: 4,
        kazu: 1,
        nedan: 44,
        tokusei: ['アクセサリ', '動物製品'],
        sozai: {
            '飼育動物の牙': 1,
            '無人島のつる': 3,
        },
    },
    '開拓工房のバター': {
        rank: 4,
        jikan: 4,
        kazu: 1,
        nedan: 44,
        tokusei: ['調味料', '動物製品'],
        sozai: {
            '飼育動物の乳': 1,
            '無人島の岩塩': 3,
        },
    },
    'アイルブリックカウンター': {
        rank: 5,
        jikan: 6,
        kazu: 1,
        nedan: 48,
        tokusei: ['調度品', '窯業製品'],
        sozai: {
            '無人島の粘土': 2,
            '無人島の石灰岩': 2,
            '無人島のパーム原木': 2,
        },
    },
    'シープのブロンズ像': {
        rank: 5,
        jikan: 8,
        kazu: 1,
        nedan: 64,
        tokusei: ['調度品', '金属製品'],
        sozai: {
            '無人島の砂錫': 3,
            '無人島の銅鉱': 3,
            '無人島の原木': 2,
        },
    },
    '開拓工房のグロースフォーミュラ': {
        rank: 5,
        jikan: 8,
        kazu: 1,
        nedan: 136,
        tokusei: ['薬品'],
        sozai: {
            '無人島のアリッサム': 2,
            '無人島の草葉': 3,
            '無人島の小枝': 3,
        },
    },
    'アイルガーネットレイピア': {
        rank: 5,
        jikan: 8,
        kazu: 1,
        nedan: 136,
        tokusei: ['武器', '窯業製品'],
        sozai: {
            '無人島のガーネット原石': 2,
            '無人島の銅鉱': 3,
            '無人島の砂錫': 3,
        },
    },
    'アイルスプルースシールド': {
        rank: 5,
        jikan: 8,
        kazu: 1,
        nedan: 136,
        tokusei: ['防具', '木工製品'],
        sozai: {
            '無人島のスプルース原木': 2,
            '無人島の銅鉱': 3,
            '無人島の石材': 3,
        },
    },
    '開拓工房のシャークオイル': {
        rank: 5,
        jikan: 8,
        kazu: 1,
        nedan: 136,
        tokusei: ['日用品', '海産製品'],
        sozai: {
            '無人島のハンマーヘッド': 2,
            '無人島の玉藻': 3,
            '無人島の樹液': 3,
        },
    },
    'アイルシルバーイヤーカフ': {
        rank: 5,
        jikan: 8,
        kazu: 1,
        nedan: 136,
        tokusei: ['アクセサリ', '金属製品'],
        sozai: {
            '無人島の銀鉱': 2,
            '無人島の砂錫': 3,
            '無人島の珊瑚': 3,
        },
    },
    '開拓工房のスイートポポト': {
        rank: 5,
        jikan: 6,
        kazu: 1,
        nedan: 72,
        tokusei: ['菓子'],
        sozai: {
            'アイルポポト': 2,
            '飼育動物の乳': 1,
            '無人島の樹液': 3,
        },
    },
    '開拓工房のパースニップサラダ': {
        rank: 5,
        jikan: 4,
        kazu: 1,
        nedan: 48,
        tokusei: ['料理'],
        sozai: {
            'アイルパースニップ': 2,
            '無人島の草葉': 1,
            '無人島の樹液': 1,
        },
    },
    '開拓工房のキャラメル': {
        rank: 6,
        jikan: 6,
        kazu: 1,
        nedan: 81,
        tokusei: ['菓子'],
        sozai: {
            '無人島のサトウキビ': 4,
            '飼育動物の乳': 2,
        },
    },
    'アイルリボン': {
        rank: 6,
        jikan: 6,
        kazu: 1,
        nedan: 54,
        tokusei: ['アクセサリ', '布製品'],
        sozai: {
            '無人島の綿花': 2,
            '無人島の銅鉱': 2,
            '無人島のつる': 2,
        },
    },
    'アイルロープ': {
        rank: 6,
        jikan: 4,
        kazu: 1,
        nedan: 36,
        tokusei: ['日用品', '布製品'],
        sozai: {
            '無人島の麻': 2,
            '無人島の草葉': 1,
            '無人島のつる': 1,
        },
    },
    'アイルキャバリエハット': {
        rank: 6,
        jikan: 6,
        kazu: 1,
        nedan: 81,
        tokusei: ['防具', '布製品'],
        sozai: {
            '飼育動物の羽根': 2,
            '無人島の綿花': 2,
            '無人島の麻': 2,
        },
    },
    'アイルホルン': {
        rank: 6,
        jikan: 6,
        kazu: 1,
        nedan: 81,
        tokusei: ['日用品', '動物製品'],
        sozai: {
            '飼育動物の角片': 2,
            '無人島の粘土': 2,
            '無人島の麻': 2,
        },
    },
    'アイルソルトコッド': {
        rank: 7,
        jikan: 6,
        kazu: 1,
        nedan: 54,
        tokusei: ['保存食', '海産製品'],
        sozai: {
            '無人島の海水魚': 4,
            '無人島の岩塩': 2,
        },
    },
    'アイルインクペースト': {
        rank: 7,
        jikan: 4,
        kazu: 1,
        nedan: 36,
        tokusei: ['調味料', '海産製品'],
        sozai: {
            '無人島のスキッド': 2,
            '無人島の岩塩': 2,
        },
    },
    '開拓工房の仙薬': {
        rank: 7,
        jikan: 6,
        kazu: 1,
        nedan: 54,
        tokusei: ['薬品', '海産製品'],
        sozai: {
            '無人島のジェリーフィッシュ': 2,
            '無人島のパームリーフ': 2,
            '無人島の玉藻': 2,
        },
    },
    'アイルベリージャム': {
        rank: 7,
        jikan: 6,
        kazu: 1,
        nedan: 78,
        tokusei: ['調味料'],
        sozai: {
            'アイルベリー': 3,
            '無人島のサトウキビ': 2,
            '無人島の樹液': 1,
        },
    },
    'アイルトマトケチャップ': {
        rank: 7,
        jikan: 4,
        kazu: 1,
        nedan: 52,
        tokusei: ['調味料'],
        sozai: {
            'アイルトマト': 2,
            '無人島のサトウキビ': 1,
            '無人島の草葉': 1,
        },
    },
    '開拓工房のオニオンスープ': {
        rank: 7,
        jikan: 6,
        kazu: 1,
        nedan: 78,
        tokusei: ['料理'],
        sozai: {
            'アイルオニオン': 3,
            '無人島の岩塩': 2,
            '無人島の草葉': 1,
        },
    },
    '開拓工房のフィッシュパイ': {
        rank: 7,
        jikan: 6,
        kazu: 1,
        nedan: 78,
        tokusei: ['菓子'],
        sozai: {
            'アイル小麦': 3,
            '無人島の海水魚': 2,
            '無人島のサトウキビ': 1,
        },
    },
    '開拓工房のコーンフレーク': {
        rank: 7,
        jikan: 4,
        kazu: 1,
        nedan: 52,
        tokusei: ['保存食'],
        sozai: {
            'アイルコーン': 2,
            '無人島のサトウキビ': 2,
        },
    },
    '開拓工房のラディッシュピクルス': {
        rank: 7,
        jikan: 8,
        kazu: 1,
        nedan: 104,
        tokusei: ['保存食'],
        sozai: {
            'アイルラディッシュ': 4,
            '無人島のアップル': 2,
            '無人島のサトウキビ': 2,
        },
    },
    'アイルアイアンアクス': {
        rank: 9,
        jikan: 8,
        kazu: 1,
        nedan: 72,
        tokusei: ['武器', '金属製品'],
        sozai: {
            '無人島の鉄鉱': 3,
            '無人島の原木': 3,
            '無人島の砂': 2,
        },
    },
    'アイルクォーツリング': {
        rank: 9,
        jikan: 8,
        kazu: 1,
        nedan: 72,
        tokusei: ['アクセサリ', '窯業製品'],
        sozai: {
            '無人島のクォーツ': 3,
            '無人島の鉄鉱': 3,
            '無人島の石材': 2,
        },
    },
    '開拓工房の陶磁器': {
        rank: 9,
        jikan: 8,
        kazu: 1,
        nedan: 72,
        tokusei: ['日用品', '窯業製品'],
        sozai: {
            '無人島の花崗岩': 3,
            '無人島のクォーツ': 3,
            '無人島の粘土': 2,
        },
    },
    '開拓工房の野菜ジュース': {
        rank: 9,
        jikan: 6,
        kazu: 1,
        nedan: 78,
        tokusei: ['薬品'],
        sozai: {
            'アイルキャベツ': 3,
            '無人島の草葉': 2,
            '無人島の玉藻': 1,
        },
    },
    '開拓工房のパンプキンプディング': {
        rank: 9,
        jikan: 6,
        kazu: 1,
        nedan: 78,
        tokusei: ['菓子'],
        sozai: {
            'アイルパンプキン': 3,
            '飼育動物の卵': 1,
            '飼育動物の乳': 1,
        },
    },
    'アイルシープラグ': {
        rank: 9,
        jikan: 6,
        kazu: 1,
        nedan: 108,
        tokusei: ['調度品', '動物製品'],
        sozai: {
            '飼育動物のフリース': 3,
            '無人島の綿花': 2,
            '無人島の麻': 1,
        },
    },
    'アイルガーデンサイズ': {
        rank: 9,
        jikan: 6,
        kazu: 1,
        nedan: 90,
        tokusei: ['日用品', '金属製品'],
        sozai: {
            '飼育動物の爪片': 3,
            '無人島の鉄鉱': 2,
            '無人島のパーム原木': 1,
        },
    },
    'アイルベッド': {
        rank: 9,
        jikan: 8,
        kazu: 1,
        nedan: 120,
        tokusei: ['調度品', '布製品'],
        sozai: {
            '飼育動物の獣毛': 4,
            '無人島の綿花': 2,
            '無人島の原木': 2,
        },
    },
    'アイルスケイルフィンガー': {
        rank: 9,
        jikan: 8,
        kazu: 1,
        nedan: 120,
        tokusei: ['防具', '動物製品'],
        sozai: {
            '飼育動物の脱皮殻': 4,
            '無人島の鉄鉱': 2,
            '無人島の綿花': 2,
        },
    },
    'アイルクルーク': {
        rank: 9,
        jikan: 8,
        kazu: 1,
        nedan: 120,
        tokusei: ['武器', '木工製品'],
        sozai: {
            '飼育動物の牙': 4,
            '無人島のクォーツ': 2,
            '無人島の原木': 2,
        },
    },
/*
    '': {
        rank: 9,
        jikan: 4,
        kazu: 1,
        nedan: 30,
        tokusei: [],
        sozai: {
            '': 1,
            '': 2,
        },
    },
*/
}
const TABLE_TOSANHIN = {}
Object.keys(TOSANHIN).forEach(tosanhin => {
    let str = tosanhin;
    str = str.replace('開拓工房の', '');
    str = str.replace('アイル', '');
    TOSANHIN[tosanhin].shorten = str;
    TOSANHIN[tosanhin].tokusei.forEach(tokusei => {
        if (!TABLE_TOSANHIN[tokusei]) TABLE_TOSANHIN[tokusei] = [[], [], []]; // 4時間・6時間・8時間
        let num = 0;
        switch (TOSANHIN[tosanhin].jikan) {
            case 8:
                num++;
            case 6:
                num++;
            default:
                TABLE_TOSANHIN[tokusei][num].push(tosanhin);
                log(num);
        }
    });
});

const SOZAI_TO_TOSANHIN = {};
Object.keys(TOSANHIN).forEach(tosanhin => {
    Object.keys(TOSANHIN[tosanhin].sozai).forEach(sozai => {
        if(!SOZAI_TO_TOSANHIN[sozai]) SOZAI_TO_TOSANHIN[sozai] = [];
        if(!SOZAI_TO_TOSANHIN[sozai].includes(tosanhin)) {
            SOZAI_TO_TOSANHIN[sozai].push(tosanhin);
        }
    });
});

const ANIMAL = {
    'シープ': {
        rank: 4,
        size: 'small',
        rare: false,
        sozais: ['飼育動物のフリース', '飼育動物の乳'],
    },
    'カラクール': {
        rank: 4,
        size: 'small',
        rare: true,
        sozais: ['飼育動物の乳', '飼育動物のフリース'],
    },
    'オポオポ': {
        rank: 4,
        size: 'small',
        rare: false,
        sozais: ['飼育動物の爪片', '飼育動物の獣毛'],
    },
    'レミュー': {
        rank: 4,
        size: 'small',
        rare: true,
        sozais: ['飼育動物の獣毛', '飼育動物の爪片'],
    },
    'アプカル': {
        rank: 4,
        size: 'small',
        rare: false,
        sozais: ['飼育動物のフリース', '飼育動物の卵'],
    },
    'パライソアプカル': {
        rank: 4,
        size: 'small',
        rare: true,
        sozais: ['飼育動物の卵', '飼育動物のフリース'],
    },
    'スクウィレル': {
        rank: 4,
        size: 'small',
        rare: false,
        sozais: ['飼育動物の爪片', '飼育動物の獣毛'],
    },
    'マーモット': {
        rank: 4,
        size: 'small',
        rare: true,
        sozais: ['飼育動物の獣毛', '飼育動物の爪片'],
    },
    'コブラン': {
        rank: 4,
        size: 'small',
        rare: false,
        sozais: ['飼育動物の牙', '飼育動物の脱皮殻'],
    },
    'イエローコブラン': {
        rank: 4,
        size: 'small',
        rare: true,
        sozais: ['飼育動物の脱皮殻', '飼育動物の牙'],
    },
    'ビーチシェル': {
        rank: 4,
        size: 'small',
        rare: true,
        sozais: ['飼育動物の爪片', '飼育動物の脱皮殻'],
    },
    'シャインフリース': {
        rank: 6,
        size: 'small',
        rare: true,
        sozais: ['飼育動物の獣毛', '飼育動物のフリース'],
    },
    'ドード': {
        rank: 6,
        size: 'middle',
        rare: false,
        sozais: ['飼育動物の卵', '飼育動物の羽根'],
    },
    'パライソドードー': {
        rank: 6,
        size: 'middle',
        rare: true,
        sozais: ['飼育動物の羽根', '飼育動物の卵'],
    },
    'アイランド・ドゥ': {
        rank: 6,
        size: 'middle',
        rare: false,
        sozais: ['飼育動物の獣毛', '飼育動物の乳'],
    },
    'アイランド・スタッグ': {
        rank: 6,
        size: 'middle',
        rare: true,
        sozais: ['飼育動物の乳', '飼育動物の角片'],
    },
    'チョコボ': {
        rank: 6,
        size: 'middle',
        rare: false,
        sozais: ['飼育動物の獣毛', '飼育動物の羽根'],
    },
    '黒チョコボ': {
        rank: 6,
        size: 'middle',
        rare: true,
        sozais: ['飼育動物の羽根', '飼育動物の獣毛'],
    },
    'グリプトドン・カフ': {
        rank: 6,
        size: 'middle',
        rare: false,
        sozais: ['飼育動物の脱皮殻', '飼育動物の爪片'],
    },
    'グリプトドン': {
        rank: 6,
        size: 'middle',
        rare: true,
        sozais: ['飼育動物の爪片', '飼育動物の脱皮殻'],
    },
    'パイッサ': {
        rank: 10,
        size: 'middle',
        rare: true,
        sozais: ['飼育動物の爪片', '飼育動物のフリース'],
    },
    'オーロックス': {
        rank: 8,
        size: 'big',
        rare: false,
        sozais: ['飼育動物の乳', '飼育動物の角片'],
    },
    'グランバッファロー': {
        rank: 8,
        size: 'big',
        rare: true,
        sozais: ['飼育動物の角片', '飼育動物の乳'],
    },
    'ブルーバック': {
        rank: 8,
        size: 'big',
        rare: false,
        sozais: ['飼育動物の卵', '飼育動物の羽根'],
    },
    'ゴールドパック': {
        rank: 8,
        size: 'big',
        rare: true,
        sozais: ['飼育動物の羽根', '飼育動物の卵'],
    },
    'アイランド・ナニー': {
        rank: 8,
        size: 'big',
        rare: false,
        sozais: ['飼育動物の乳', '飼育動物の角片'],
    },
    'アイランド・ビリー': {
        rank: 8,
        size: 'big',
        rare: true,
        sozais: ['飼育動物の角片', '飼育動物のフリース'],
    },
    'グゥーブー': {
        rank: 8,
        size: 'big',
        rare: true,
        sozais: ['飼育動物の牙', '飼育動物の爪片'],
    },
    'アリゲーター': {
        rank: 8,
        size: 'big',
        rare: true,
        sozais: ['飼育動物の爪片', '飼育動物の脱皮殻'],
    },
}

const SOZAI_TO_ANIMAL = {}
Object.keys(ANIMAL).forEach(animal => {
    ANIMAL[animal].sozais.forEach(sozai => {
        if(!SOZAI_TO_ANIMAL[sozai]) SOZAI_TO_ANIMAL[sozai] = [];
        if(!SOZAI_TO_ANIMAL[sozai].includes(animal)) {
            SOZAI_TO_ANIMAL[sozai].push(animal);
        }
    }); 
});

