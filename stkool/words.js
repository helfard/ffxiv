const LANGS = [
    // 言語リスト
    { id: 'ja', name: '日本語' },
    { id: 'en', name: 'English' },
    { id: 'tc', name: '中文' },
];

// 中文はChocobo鯖のRondo Grantさんに作ってもらいました。

const WORDS = {
    // 翻訳辞書
    'title': {
        'ja': '潜水艦ツクール',
        'en': 'Submersible Maker',
        'tc': '潛水艇模擬器',
    },

    'class': {
        'ja': '級',
        'en': 'Class',
        'tc': '級',
    },
    'preferences': {
        'ja': 'パーツ',
        'en': 'Preferences',
        'tc': '部件	',
    },
    'all': {
        'ja': '全て',
        'en': 'All',
        'tc': '全部',
    },
    'normal': {
        'ja': '旧パーツ全て',
        'en': 'Normal',
        'tc': '一般部件全部',
    },
    'modified': {
        'ja': '改級パーツ全て',
        'en': 'Modified',
        'tc': '改級部件全部',
    },

    'rank': {
        'ja': 'ランク',
        'en': 'Rank',
        'tc': '等級',
    },
    'filter': {
        'ja': 'フィルタ',
        'en': 'Filter',
        'tc': '篩選',
    },
    'preset': {
        'ja': 'プリセット',
        'en': 'Preset',
        'tc': '預設',
    },
    'reset': {
        'ja': 'リセット',
        'en': 'Reset',
        'tc': '重新設定',
    },
    'comment': {
        'ja': '説明',
        'en': 'Comment',
        'tc': '說明',
    },
    'default comment': {
        'ja': 'ここに説明が出ます。',
        'en': 'Description here.',
        'tc': '解說在這裡',
    },

    'list': {
        'ja': '構成一覧',
        'en': 'Results',
        'tc': '組成一覽',
    },
    'nomatch': {
        'ja': '条件を満たす組み合わせが存在しません。',
        'en': 'No match there.',
        'tc': '沒辦法組出這個條件的組合。',
    },
    'found': {
        'ja': 'パターンありました。',
        'en': 'submersibles are found.',
        'tc': '找到這個部件了.',
    },
    'too many': {
        'ja': '組み合わせが多すぎて表示できません。',
        'en': 'There are too many submersibles to show all.',
        'tc': '組合有太多種了無法顯示。',
    },
    'show all': {
        'ja': '無理矢理表示する！（重い）',
        'en': 'Show all!! (CAUTION: LAGGY!!!)',
        'tc': '我全都要!! (電腦哀號)',
    },
    'hide': {
        'ja': '縮小表示に戻す。',
        'en': 'Back to limited mode.',
        'tc': '變回精簡模式',
    },
    'copy': {
        'ja': 'チェックしたデータをコピーする。',
        'en': 'Copy chedked submersibles.',
        'tc': '複製選取的資料。',
    },
    'copied': {
        'ja': 'コピーしました！',
        'en': 'Copied!',
        'tc': '複製完成!',
    },

    'cost': {
        'ja': 'パーツコスト',
        'en': 'Compornents',
        'tc': '配件重量',
    },
    'surveillance': {
        'ja': '探査性能',
        'en': 'Surveillance',
        'tc': '探索性能',
    },
    'retrieval': {
        'ja': '収集性能',
        'en': 'Retrieval',
        'tc': '收集性能',
    },
    'speed': {
        'ja': '巡航速度',
        'en': 'Speed',
        'tc': '巡航速度',
    },
    'range': {
        'ja': '航続距離',
        'en': 'Range',
        'tc': '航行距離',
    },
    'favor': {
        'ja': '運',
        'en': 'Favor',
        'tc': '恩惠(運氣)',
    },
    'cst': {
        'ja': 'Cost',
        'en': 'Cost',
        'tc': 'Cost',
    },
    'srv': {
        'ja': '探査',
        'en': 'Srv',
        'tc': '探索',
    },
    'rtr': {
        'ja': '収集',
        'en': 'Rtr',
        'tc': '收集',
    },
    'spd': {
        'ja': '速度',
        'en': 'Spd',
        'tc': '速度',
    },
    'rng': {
        'ja': '距離',
        'en': 'Rng',
        'tc': '距離',
    },
    'fvr': {
        'ja': '運',
        'en': 'Fav',
        'tc': '運',
    },

    'shark': {
        'ja': 'シャーク',
        'en': 'Shark',
        'tc': '鯊魚',
    },
    'unkiu': {
        'ja': 'ウンキウ',
        'en': 'Unkiu',
        'tc': '甲鱉',
    },
    'whale': {
        'ja': 'ホエール',
        'en': 'Whale',
        'tc': '鬚鯨',
    },
    'coelacanth': {
        'ja': 'シーラカンス',
        'en': 'Coelacanth',
        'tc': '腔棘魚',
    },
    'syldra': {
        'ja': 'シルドラ',
        'en': 'Syldra',
        'tc': '希爾德拉',
    },
    'modified shark': {
        'ja': 'シャーク改',
        'en': 'M-Shark',
        'tc': '鯊魚改',
    },
    'modified unkiu': {
        'ja': 'ウンキウ改',
        'en': 'M-Unkiu',
        'tc': '甲鱉改',
    },
    'modified whale': {
        'ja': 'ホエール改',
        'en': 'M-Whale',
        'tc': '鬚鯨改',
    },
    'modified coelacanth': {
        'ja': 'シーラカンス改',
        'en': 'M-Coelacanth',
        'tc': '腔棘魚改',
    },
    'modified syldra': {
        'ja': 'シルドラ改',
        'en': 'M-Syldra',
        'tc': '希爾德拉改',
    },
    'sha': {
        'ja': 'シャ',
        'en': 'S',
        'tc': '鯊',
    },
    'un': {
        'ja': 'ウン',
        'en': 'U',
        'tc': '鱉',
    },
    'wha': {
        'ja': 'ホエ',
        'en': 'W',
        'tc': '鯨',
    },
    'coe': {
        'ja': 'シー',
        'en': 'C',
        'tc': '棘',
    },
    'syl': {
        'ja': 'シル',
        'en': 'S',
        'tc': '希'
    },
    'm-sha': {
        'ja': 'ｼｬ改',
        'en': 'S+',
        'tc': '鯊改',
    },
    'm-un': {
        'ja': 'ｳﾝ改',
        'en': 'U+',
        'tc': '鱉改',
    },
    'm-wha': {
        'ja': 'ﾎｴ改',
        'en': 'W+',
        'tc': '鯨改',
    },
    'm-coe': {
        'ja': 'ｼｰ改',
        'en': 'C+',
        'tc': '棘改',
    },
    'm-syl': {
        'ja': 'ｼﾙ改',
        'en': 'S+',
        'tc': '希改'
    },
    'hull': {
        'ja': '艦体',
        'en': 'Hull',
        'tc': '船體'
    },
    'stern': {
        'ja': '艦尾',
        'en': 'Stern',
        'tc': '船尾'
    },
    'bow': {
        'ja': '艦首',
        'en': 'Bow',
        'tc': '船首'
    },
    'bridge': {
        'ja': '艦橋',
        'en': 'Bridge',
        'tc': '艦橋'
    },

    'kamacite ore': {
        'ja': 'カマサイト鉱',
        'en': 'Kamacite Ore',
        'tc': '鐵紋礦石'
    },
    'cocobolo lumber': {
        'ja': 'ココボロ材',
        'en': 'Cocobolo Lumber',
        'tc': '黃檀木材',
    },
    'balsa wood scrap': {
        'ja': 'バルサ廃材',
        'en': 'Balsa Wood Scrap',
        'tc': '輕木廢材',
    },
    'pure titanium ore': {
        'ja': 'ピュアチタン鉱',
        'en': 'Pure Titanium Ore',
        'tc': '純鈦礦',
    },
    'cryptomeria log': {
        'ja': 'クリプトメリア原木',
        'en': 'Cryptomeria Log',
        'tc': '柳杉原木',
    },
    'ii': {
        'ja': '真',
        'en': 'II',
        'tc': '真',
    },
    'iii': {
        'ja': '極',
        'en': 'III',
        'tc': '極',
    },
    'iv': {
        'ja': '幻',
        'en': 'IV',
        'tc': '幻',
    },
    'v': {
        'ja': '零式',
        'en': 'V',
        'tc': '零式',
    },
    'vi': {
        'ja': '絶',
        'en': 'VI',
        'tc': '絕',
    },
    'vii': {
        'ja': 'FF16兼任',
        'en': 'VII',
        'tc': '吉田爸爸',
    },

    'deepsea y': {
        'ja': '溺没海 Y',
        'en': 'Deep-Sea Site:<br>Flickering Dip',
        'tc': '溺沒海 Y',
    },
    'deepsea yv': {
        'ja': '溺没海 Y→V',
        'en': 'Deep-Sea Site:<br>Flickering Dip<br>-&gt; The Rimilala Shelf',
        'tc': '溺沒海 Y→V',
    },
    'ashsea ab': {
        'ja': '灰海 A→B',
        'en': 'Sea of ASh:<br>Wreckage of the Windwalker<br>-&gt; South Isle of Zozonan',
        'tc': '灰海 A→B',
    },
    'ashsea bad': {
        'ja': '灰海 B→A→D',
        'en': 'Sea of ASh:<br>Wreckage of the Windwalker<br>-&gt; South Isle of Zozonan<br>-&gt; Sea of Ash 1',
        'tc': '灰海 B→A→D',
    },
    'ashsea badf': {
        'ja': '灰海 B→A→D→F',
        'en': 'Sea of ASh:<br>Wreckage of the Windwalker<br>-&gt; South Isle of Zozonan<br>-&gt; Sea of Ash 1<br> -&gt; Sea of Ash 2',
        'tc': '灰海 B→A→D→F',
    },
    'deepsea gh': {
        'ja': '溺没海 G→H',
        'en': 'Deep-Sea Site:<br>-&gt; The Umbrella Narrow<br>-&gt; Offender&#39;s Rot',
        'tc': '溺沒海 G→H',
    },
    'deepsea igh': {
        'ja': '溺没海 I→G→H',
        'en': 'Deep-Sea Site:<br>-&gt; Neolith Island<br>-&gt; The Umbrella Narrow<br>-&gt; Offender&#39;s Rot',
        'tc': '溺沒海 I→G→H',
    },
    'ashsea aci': {
        'ja': '灰海 A→C→I',
        'en': 'Sea of ASh:<br>South Isle of Zozonan<br>-&gt; North Isle of Zozonan<br>-&gt; The Central Charnel Trench',
        'tc': '灰海 A→C→I',
    },
    'ashsea acil': {
        'ja': '灰海 A→C→I→L',
        'en': 'Sea of ASh:<br>South Isle of Zozonan<br>-&gt; North Isle of Zozonan<br>-&gt; The Central Charnel Trench<br>-&gt; The Lone Glove',
        'tc': '灰海 A→C→I→L',
    },
    'ashsea acmil': {
        'ja': '灰海 A→C→M→I→L',
        'en': 'Sea of ASh:<br>South Isle of Zozonan<br>-&gt; North Isle of Zozonan<br>-&gt; The Midden Pit<br>-&gt; The Central Charnel Trench<br>-&gt; The Lone Glove',
        'tc': '灰海 A→C→M→I→L',
    },
    'ashsea bdi': {
        'ja': '灰海 B→D→I',
        'en': 'Sea of Ash:<br>Wreckage of the Windwalker<br>-&gt; Sea of Ash 1<br>-&gt; The Central Charnel Trench',
        'tc': '灰海 B→D→I',
    },
    'ashsea bdik': {
        'ja': '灰海 B→D→I→K',
        'en': 'Sea of Ash:<br>Wreckage of the Windwalker<br>-&gt; Sea of Ash 1<br>-&gt; The Central Charnel Trench<br>-&gt; Sea of Ash 4',
        'tc': '灰海 B→D→I→K',
    },
    /*
    '': {
      'ja': '',
      'en': '',
      'tc': '',
    },
  */
};