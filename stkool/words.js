const LANGS = [
    // 言語リスト
    { id: 'ja', name: '日本語' },
    { id: 'en', name: 'English' },
];

const WORDS = {
    // 翻訳辞書
    'title': {
        'ja': '潜水艦ツクール',
        'en': 'Submersible Tkool',
    },

    'class': {
        'ja': '級',
        'en': 'Class',
    },
    'preferences': {
        'ja': 'パーツ',
        'en': 'Preferences',
    },
    'all': {
        'ja': '全て',
        'en': 'All',
    },
    'normal': {
        'ja': '旧パーツ全て',
        'en': 'Normal',
    },
    'modified': {
        'ja': '改級パーツ全て',
        'en': 'Modified',
    },

    'rank': {
        'ja': 'ランク',
        'en': 'Rank',
    },
    'filter': {
        'ja': 'フィルタ',
        'en': 'Filter',
    },
    'preset': {
        'ja': 'プリセット',
        'en': 'Preset',
    },
    'reset': {
        'ja': 'リセット',
        'en': 'Reset',
    },
    'comment': {
        'ja': '説明',
        'en': 'Comment',
    },
    'default comment': {
        'ja': 'ここに説明が出ます。',
        'en': 'Description here.',
    },

    'list': {
        'ja': '構成一覧',
        'en': 'Results',
    },
    'nomatch': {
        'ja': '条件を満たす組み合わせが存在しません。',
        'en': 'No match there.',
    },
    'found': {
        'ja': 'パターンありました。',
        'en': 'submersibles are found.',
    },
    'too many': {
        'ja': '組み合わせが多すぎて表示できません。',
        'en': 'There are too many submersibles to show all.',
    },
    'show all': {
        'ja': '無理矢理表示する！（重い）',
        'en': 'Show all!! (CAUTION: LAGGY!!!)',
    },
    'hide': {
        'ja': '縮小表示に戻す。',
        'en': 'Back to limited mode.',
    },
    'copy': {
        'ja': 'チェックしたデータをコピーする。',
        'en': 'Copy chedked submersibles.',
    },
    'copied': {
        'ja': 'コピーしました！',
        'en': 'Copied!',
    },

    'cost': {
        'ja': 'パーツコスト',
        'en': 'Compornents',
    },
    'surveillance': {
        'ja': '探査性能',
        'en': 'Surveillance',
    },
    'retrieval': {
        'ja': '収集性能',
        'en': 'Retrieval',
    },
    'speed': {
        'ja': '巡航速度',
        'en': 'Speed',
    },
    'range': {
        'ja': '航続距離',
        'en': 'Range',
    },
    'favor': {
        'ja': '運',
        'en': 'Favor',
    },
    'cst': {
        'ja': 'Cost',
        'en': 'Cost',
    },
    'srv': {
        'ja': '探査',
        'en': 'Srv',
    },
    'rtr': {
        'ja': '収集',
        'en': 'Rtr',
    },
    'spd': {
        'ja': '速度',
        'en': 'Spd',
    },
    'rng': {
        'ja': '距離',
        'en': 'Rng',
    },
    'fvr': {
        'ja': '運',
        'en': 'Fav',
    },

    'shark': {
        'ja': 'シャーク',
        'en': 'Shark',
    },
    'unkiu': {
        'ja': 'ウンキウ',
        'en': 'Unkiu',
    },
    'whale': {
        'ja': 'ホエール',
        'en': 'Whale',
    },
    'coelacanth': {
        'ja': 'シーラカンス',
        'en': 'Coelacanth',
    },
    'syldra': {
        'ja': 'シルドラ',
        'en': 'Syldra',
    },
    'modified shark': {
        'ja': 'シャーク改',
        'en': 'M-Shark',
    },
    'modified unkiu': {
        'ja': 'ウンキウ改',
        'en': 'M-Unkiu',
    },
    'modified whale': {
        'ja': 'ホエール改',
        'en': 'M-Whale',
    },
    'modified coelacanth': {
        'ja': 'シーラカンス改',
        'en': 'M-Coelacanth',
    },
    'modified syldra': {
        'ja': 'シルドラ改',
        'en': 'M-Syldra',
    },
    'sha': {
        'ja': 'シャ',
        'en': 'S',
    },
    'un': {
        'ja': 'ウン',
        'en': 'U',
    },
    'wha': {
        'ja': 'ホエ',
        'en': 'W',
    },
    'coe': {
        'ja': 'シー',
        'en': 'C',
    },
    'syl': {
        'ja': 'シル',
        'en': 'S',
    },
    'm-sha': {
        'ja': 'ｼｬ改',
        'en': 'S+',
    },
    'm-un': {
        'ja': 'ｳﾝ改',
        'en': 'U+',
    },
    'm-wha': {
        'ja': 'ﾎｴ改',
        'en': 'W+',
    },
    'm-coe': {
        'ja': 'ｼｰ改',
        'en': 'C+',
    },
    'm-syl': {
        'ja': 'ｼﾙ改',
        'en': 'S+',
    },
    'hull': {
        'ja': '艦体',
        'en': 'Hull',
    },
    'stern': {
        'ja': '艦尾',
        'en': 'Stern',
    },
    'bow': {
        'ja': '艦首',
        'en': 'Bow',
    },
    'bridge': {
        'ja': '艦橋',
        'en': 'Bridge',
    },

    'kamacite ore': {
        'ja': 'カマサイト鉱',
        'en': 'Kamacite Ore',
    },
    'cocobolo lumber': {
        'ja': 'ココボロ材',
        'en': 'Cocobolo Lumber',
    },
    'balsa wood scrap': {
        'ja': 'バルサ廃材',
        'en': 'Balsa Wood Scrap',
    },
    'pure titanium ore': {
        'ja': 'ピュアチタン鉱',
        'en': 'Pure Titanium Ore',
    },
    'cryptomeria log': {
        'ja': 'クリプトメリア原木',
        'en': 'Cryptomeria Log',
    },
    'ii': {
        'ja': '真',
        'en': 'II',
    },
    'iii': {
        'ja': '極',
        'en': 'III',
    },
    'iv': {
        'ja': '幻',
        'en': 'IV',
    },
    'v': {
        'ja': '零式',
        'en': 'V',
    },
    'vi': {
        'ja': '絶',
        'en': 'VI',
    },
    'vii': {
        'ja': 'FF16兼任',
        'en': 'VII',
    },

    'deepsea y': {
        'ja': '溺没海 Y',
        'en': 'Deep-Sea Site:<br>Flickering Dip',
    },
    'deepsea yv': {
        'ja': '溺没海 Y→V',
        'en': 'Deep-Sea Site:<br>Flickering Dip<br>-&gt; The Rimilala Shelf',
    },
    'ashsea ab': {
        'ja': '灰海 A→B',
        'en': 'Sea of ASh:<br>Wreckage of the Windwalker<br>-&gt; South Isle of Zozonan',
    },
    'ashsea bad': {
        'ja': '灰海 B→A→D',
        'en': 'Sea of ASh:<br>Wreckage of the Windwalker<br>-&gt; South Isle of Zozonan<br>-&gt; Sea of Ash 1',
    },
    'ashsea badf': {
        'ja': '灰海 B→A→D→F',
        'en': 'Sea of ASh:<br>Wreckage of the Windwalker<br>-&gt; South Isle of Zozonan<br>-&gt; Sea of Ash 1<br> -&gt; Sea of Ash 2',
    },
    'deepsea gh': {
        'ja': '溺没海 G→H',
        'en': 'Deep-Sea Site:<br>-&gt; The Umbrella Narrow<br>-&gt; Offender&#39;s Rot',
    },
    'deepsea igh': {
        'ja': '溺没海 I→G→H',
        'en': 'Deep-Sea Site:<br>-&gt; Neolith Island<br>-&gt; The Umbrella Narrow<br>-&gt; Offender&#39;s Rot',
    },
    'ashsea aci': {
        'ja': '灰海 A→C→I',
        'en': 'Sea of ASh:<br>South Isle of Zozonan<br>-&gt; North Isle of Zozonan<br>-&gt; The Central Charnel Trench',
    },
    'ashsea acil': {
        'ja': '灰海 A→C→I→L',
        'en': 'Sea of ASh:<br>South Isle of Zozonan<br>-&gt; North Isle of Zozonan<br>-&gt; The Central Charnel Trench<br>-&gt; The Lone Glove',
    },
    'ashsea acmil': {
        'ja': '灰海 A→C→M→I→L',
        'en': 'Sea of ASh:<br>South Isle of Zozonan<br>-&gt; North Isle of Zozonan<br>-&gt; The Midden Pit<br>-&gt; The Central Charnel Trench<br>-&gt; The Lone Glove',
    },
    'ashsea bdi': {
        'ja': '灰海 B→D→I',
        'en': 'Sea of Ash:<br>Wreckage of the Windwalker<br>-&gt; Sea of Ash 1<br>-&gt; The Central Charnel Trench',
    },
    'ashsea bdik': {
        'ja': '灰海 B→D→I→K',
        'en': 'Sea of Ash:<br>Wreckage of the Windwalker<br>-&gt; Sea of Ash 1<br>-&gt; The Central Charnel Trench<br>-&gt; Sea of Ash 4',
    },
    /*
    '': {
      'ja': '',
      'en': '',
    },
  */
};