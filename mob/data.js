const PATCHS = [
    // 拡張一覧（利便性の都合で最新パッチが上）
    {
        fullName: '黄金のレガシー',
        nickName: '黄金'
    }, {
        fullName: '暁月のフィナーレ',
        nickName: '暁月'
    }, {
        fullName: '漆黒のヴィランズ',
        nickName: '漆黒'
    /*
    }, {
        fullName: '紅蓮のリベレーター',
        nickName: '紅蓮'
    }, {
        fullName: '蒼天のイシュガルド',
        nickName: '蒼天'
    }, {
        fullName: '新生エオルゼア',
        nickName: '新生'
    */
    }
];

const AREA = {
    // エリア一覧とマップの広さ・画像ファイルのパス
    // マップの座標の最低値は実際には1.0（つまり0.9が軸と思われる）
    // 漆黒エリア
    'レイクランド': { w: 41.9, h: 41.9, src: 'map/lakeland.jpg' },
    'コルシア島': { w: 41.9, h: 41.9, src: 'map/kholusia.jpg' },
    'アム・アレーン': { w: 41.9, h: 41.9, src: 'map/amharaeng.jpg' },
    'イル・メグ': { w: 41.9, h: 41.9, src: 'map/ilmheg.jpg' },
    'ラケティカ大森林': { w: 41.9, h: 41.9, src: 'map/raktika.jpg' },
    'テンペスト': { w: 41.9, h: 41.9, src: 'map/tempest.jpg' },
    // 暁月エリア
    'サベネア島': { w: 41.9, h: 41.9, src: 'map/thavnair.jpg' },
    'ガレマルド': { w: 41.9, h: 41.9, src: 'map/garlemald.jpg' },
    'ラヴィリンソス': { w: 41.9, h: 41.9, src: 'map/labyrinthos.jpg' },
    '嘆きの海': { w: 41.9, h: 41.9, src: 'map/marelamentorum.jpg' },
    'ウルティマ・トゥーレ': { w: 41.9, h: 41.9, src: 'map/ultimathule.jpg' },
    'エルピス': { w: 41.9, h: 41.9, src: 'map/elpis.jpg' },
    // 黄金エリア
    'オルコ・パチャ': { w: 41.9, h: 41.9, src: 'map/urqopacha.jpg' },
    'コザマル・カ': { w: 41.9, h: 41.9, src: 'map/kozamauka.jpg' },
    'ヤクテル樹海': { w: 41.9, h: 41.9, src: 'map/yaktel.jpg' },
    'シャーローニ荒野': { w: 41.9, h: 41.9, src: 'map/shaaloani.jpg' },
    'ヘリテージファウンド': { w: 41.9, h: 41.9, src: 'map/heritagefound.jpg' },
    'リビング・メモリー': { w: 41.9, h: 41.9, src: 'map/livingmemory.jpg' }
}
const AREAS = [
    // エリア一覧（テレポ並び順）
    'サベネア島',
    'ガレマルド',
    'オルコ・パチャ',
    'コザマル・カ',
    'ヤクテル樹海',
    'シャーローニ荒野',
    'ヘリテージファウンド',
    'レイクランド',
    'コルシア島',
    'アム・アレーン',
    'イル・メグ',
    'ラケティカ大森林',
    'テンペスト',
    'ラヴィリンソス',
    '嘆きの海',
    'ウルティマ・トゥーレ',
    'エルピス',
    'リビング・メモリー',
];
const AREAS_ALT = Object.keys(AREA); // エリア一覧（拡張順）

const MONSTER = {
    // モンスター一覧
    // xyはゲーム内の座標
    // rは生息範囲の直径、地図のサイズに対する相対表示（%）
    '漆黒': {
        // モンスターの座標はパママのFF14便利手帳のデータ（https://www.mtgames.jp/ff14/item/）を一部修正
        'ヴァイオレット・トリフィド': {
            area: 'レイクランド', x: 35.2, y: 30.4,
        },
        'ウェットランド・ワーグ': {
            area: 'レイクランド', x: 23.4, y: 22.9,
        },
        'ウルヴァリン': {
            area: 'レイクランド', x: 31.4, y: 36.6,
        },
        'スミロドン': {
            area: 'レイクランド', x: 10.1, y: 10.6,
        },
        'チリアド・キャマ': {
            area: 'レイクランド', x: 17.0, y: 9.1,
        },
        'ノール': {
            area: 'レイクランド', x: 13.7, y: 16.6,
        },
        'プロテロスクス': {
            area: 'レイクランド', x: 19.4, y: 13.9,
        },
        'ホップトラップ': {
            area: 'レイクランド', x: 35.5, y: 27.7,
        },
        'ホワイト・グレムリン': {
            area: 'レイクランド', x: 33.0, y: 8.7,
        },
        'ヤテベオ': {
            area: 'レイクランド', x: 20.2, y: 11.1,
        },
        'レイクバイパー': {
            area: 'レイクランド', x: 19.4, y: 25.0,
        },
        'アイランド・ウルフ': {
            area: 'コルシア島', x: 24.6, y: 25.3,
        },
        'アイランド・レイル': {
            area: 'コルシア島', x: 20.5, y: 27.8,
        },
        'ウィップテール': {
            area: 'コルシア島', x: 36.3, y: 25.4,
        },
        'ウッドアイズ': {
            area: 'コルシア島', x: 15.1, y: 32.5,
        },
        'クリフカイト': {
            area: 'コルシア島', x: 18.7, y: 11.5,
        },
        'クリフモール': {
            area: 'コルシア島', x: 27.1, y: 11.3,
        },
        'グルグヌー': {
            area: 'コルシア島', x: 22.2, y: 12.4,
        },
        'コルシア・バイソン': {
            area: 'コルシア島', x: 9.0, y: 25.2,
        },
        'サイカニア': {
            area: 'コルシア島', x: 11.3, y: 16.1,
        },
        'サルファー・ビルゲン': {
            area: 'コルシア島', x: 34.6, y: 10.4,
        },
        'ジェルミナンツ': {
            area: 'コルシア島', x: 21.4, y: 30.4,
        },
        'スクリー・ノーム': {
            area: 'コルシア島', x: 8.7, y: 19.6,
        },
        'デフェクティブ・タロース': {
            area: 'コルシア島', x: 14.6, y: 19.6,
        },
        'トラゴパン': {
            area: 'コルシア島', x: 20.7, y: 36.1,
        },
        'ドワーヴン・オートマトン': {
            area: 'コルシア島', x: 31.6, y: 18.7,
        },
        'ハイランド・ヒソプ': {
            area: 'コルシア島', x: 21.6, y: 18.5,
        },
        'フルドゥ': {
            area: 'コルシア島', x: 8.1, y: 18.7,
        },
        'ホブゴブリン': {
            area: 'コルシア島', x: 36.1, y: 29.4,
        },
        'マウルタッシュ': {
            area: 'コルシア島', x: 36.4, y: 28.5,
        },
        'イビルウェポン': {
            area: 'アム・アレーン', x: 20.5, y: 22.0,
        },
        'エンシェント・リザード': {
            area: 'アム・アレーン', x: 31.0, y: 24.9,
        },
        'ギガテンダー': {
            area: 'アム・アレーン', x: 32.0, y: 10.5,
        },
        'グラーム': {
            area: 'アム・アレーン', x: 25.3, y: 28.6,
        },
        'コヨーテ': {
            area: 'アム・アレーン', x: 21.6, y: 9.2,
        },
        'サンドモール': {
            area: 'アム・アレーン', x: 29.2, y: 19.8,
        },
        'シザージョウ': {
            area: 'アム・アレーン', x: 29.0, y: 30.2,
        },
        'スパイクモール': {
            area: 'アム・アレーン', x: 15.4, y: 22.1,
        },
        'デビタージュ': {
            area: 'アム・アレーン', x: 13.7, y: 17.0,
        },
        'ノーム': {
            area: 'アム・アレーン', x: 10.8, y: 24.2,
        },
        'フォルスラコス': {
            area: 'アム・アレーン', x: 16.7, y: 17.7,
        },
        'フレイム・ゾヌール': {
            area: 'アム・アレーン', x: 23.6, y: 34.5,
        },
        'マスターレス・タロース': {
            area: 'アム・アレーン', x: 11.4, y: 30.2,
        },
        'モラマンダー': {
            area: 'アム・アレーン', x: 23.8, y: 31.5,
        },
        'ウェアウッド': {
            area: 'イル・メグ', x: 28.9, y: 5.3,
        },
        'エーディンモス': {
            area: 'イル・メグ', x: 10.6, y: 26.8,
        },
        'エケボア': {
            area: 'イル・メグ', x: 21.8, y: 34.7,
        },
        'ガーデン・コロコッタ': {
            area: 'イル・メグ', x: 32.2, y: 6.4,
        },
        'ガーデン・ポークシー': {
            area: 'イル・メグ', x: 30.9, y: 14.5,
        },
        'キラービー': {
            area: 'イル・メグ', x: 9.1, y: 15.0,
        },
        'グリーングライダー': {
            area: 'イル・メグ', x: 26.3, y: 14.4,
        },
        'トートエイビス': {
            area: 'イル・メグ', x: 25.1, y: 18.7,
        },
        'プーカ': {
            area: 'イル・メグ', x: 19.8, y: 15.6,
        },
        'フラワーバスケット': {
            area: 'イル・メグ', x: 8.3, y: 30.8,
        },
        'ホーカー': {
            area: 'イル・メグ', x: 8.6, y: 18.8,
        },
        'モスフングス': {
            area: 'イル・メグ', x: 20.2, y: 8.8,
        },
        'ラビットテール': {
            area: 'イル・メグ', x: 31.5, y: 10.9,
        },
        'レインボー・ロリキート': {
            area: 'イル・メグ', x: 24.1, y: 8.9,
        },
        'ローズベアー': {
            area: 'イル・メグ', x: 19.4, y: 32.0,
        },
        'アトロシラプトル': {
            area: 'ラケティカ大森林', x: 12.5, y: 33.8,
        },
        'ヴァンパイアヴァイン': {
            area: 'ラケティカ大森林', x: 14.1, y: 29.4,
        },
        'ウッドバット': {
            area: 'ラケティカ大森林', x: 5.8, y: 16.1,
        },
        'エコー': {
            area: 'ラケティカ大森林', x: 27.0, y: 25.0,
        },
        'カラカル': {
            area: 'ラケティカ大森林', x: 23.8, y: 34.2,
        },
        'ギザマルーク': {
            area: 'ラケティカ大森林', x: 29.0, y: 26.1,
        },
        'クラックド・ロンカヴェッセル': {
            area: 'ラケティカ大森林', x: 29.2, y: 12.4,
        },
        'クラックド・ロンカソーン': {
            area: 'ラケティカ大森林', x: 22.1, y: 12.1,
        },
        'クラックド・ロンカドール': {
            area: 'ラケティカ大森林', x: 24.9, y: 11.0,
        },
        'グレートウッドレイル': {
            area: 'ラケティカ大森林', x: 24.6, y: 5.8,
        },
        'スナップウィード': {
            area: 'ラケティカ大森林', x: 29.1, y: 21.8,
        },
        'タリチャック': {
            area: 'ラケティカ大森林', x: 25.8, y: 21.9,
        },
        'トマトル': {
            area: 'ラケティカ大森林', x: 8.0, y: 34.9,
        },
        'フロア・マンドリル': {
            area: 'ラケティカ大森林', x: 34.4, y: 16.9,
        },
        'ヘルムビートル': {
            area: 'ラケティカ大森林', x: 16.4, y: 31.6,
        },
        'ワイルドスワイン': {
            area: 'ラケティカ大森林', x: 16.2, y: 19.0,
        },
        'アンフィスバエナ': {
            area: 'テンペスト', x: 31.3, y: 12.2,
        },
        'カブス': {
            area: 'テンペスト', x: 22.2, y: 31.5,
        },
        'クリオニッド': {
            area: 'テンペスト', x: 26.1, y: 6.2,
        },
        'シーアネモネ': {
            area: 'テンペスト', x: 19.0, y: 19.2,
        },
        'シーゼラチン': {
            area: 'テンペスト', x: 24.9, y: 12.6,
        },
        'スイミングクラブ': {
            area: 'テンペスト', x: 35.9, y: 6.9,
        },
        'ダゴン': {
            area: 'テンペスト', x: 30.0, y: 13.9,
        },
        'テンペストスワロー': {
            area: 'テンペスト', x: 28.9, y: 15.7,
        },
        'トリロバイト': {
            area: 'テンペスト', x: 35.6, y: 20.1,
        },
        'モーゴウル': {
            area: 'テンペスト', x: 30.8, y: 21.7,
        },
    },
    '暁月': {
        // モンスターの座標はパママのFF14便利手帳のデータ（https://www.mtgames.jp/ff14/item/）を一部修正
        'カリブー': {
            area: 'ラヴィリンソス', x: 16.3, y: 6.1,
        },
        'ゲノーモス': {
            area: 'ラヴィリンソス', x: 32.6, y: 25.1,
        },
        'トロル': {
            area: 'ラヴィリンソス', x: 25.2, y: 8.1,
        },
        'ノーザン・スナップウィード': {
            area: 'ラヴィリンソス', x: 21.3, y: 9.9,
        },
        'ペプレド': {
            area: 'ラヴィリンソス', x: 25.4, y: 14.2,
        },
        'マウンテンチキン': {
            area: 'ラヴィリンソス', x: 21.6, y: 12.4,
        },
        'ミスリルキャップ': {
            area: 'ラヴィリンソス', x: 37.3, y: 19.2,
        },
        'ヤーコウ': {
            area: 'ラヴィリンソス', x: 17.3, y: 9.8,
        },
        'ラヴィリンソス・スクリーマー': {
            area: 'ラヴィリンソス', x: 34.3, y: 16.9,
        },
        'リマスカブラ': {
            area: 'ラヴィリンソス', x: 17.5, y: 5.4,
        },
        'アキャーリクラブ': {
            area: 'サベネア島', x: 13.9, y: 30.0,
        },
        'アシュヴァッタ': {
            area: 'サベネア島', x: 27.8, y: 11.5,
        },
        'ヴァジュララングラ': {
            area: 'サベネア島', x: 13.1, y: 19.6,
        },
        'ヴァルラス': {
            area: 'サベネア島', x: 7.5, y: 12.1,
        },
        'オドカン': {
            area: 'サベネア島', x: 23.0, y: 17.5,
        },
        'ガジャ': {
            area: 'サベネア島', x: 22.7, y: 30.7,
        },
        'カチャパ': {
            area: 'サベネア島', x: 20.8, y: 33.7,
        },
        'グハーシャヤ': {
            area: 'サベネア島', x: 25.8, y: 27.0,
        },
        'サベネアンジャムメル': {
            area: 'サベネア島', x: 20.0, y: 11.5,
        },
        'シュトラムルグ': {
            area: 'サベネア島', x: 16.8, y: 15.0,
        },
        'スターマイト': {
            area: 'サベネア島', x: 17.2, y: 10.4,
        },
        'チャムロッシュ': {
            area: 'サベネア島', x: 9.0, y: 12.2,
        },
        'バブーン': {
            area: 'サベネア島', x: 26.5, y: 19.9,
        },
        'ハンサ': {
            area: 'サベネア島', x: 15.6, y: 25.9,
        },
        'ピシャーチャ': {
            area: 'サベネア島', x: 18.7, y: 23.6,
        },
        'ブンジャンガ': {
            area: 'サベネア島', x: 31.4, y: 14.5,
        },
        'マンジュサカ': {
            area: 'サベネア島', x: 13.4, y: 12.4,
        },
        'アルマスティ': {
            area: 'ガレマルド', x: 30.1, y: 30.3,
        },
        'イルサバード・トゥルスス': {
            area: 'ガレマルド', x: 26.1, y: 30.6,
        },
        'エブラーナ・アイストラップ': {
            area: 'ガレマルド', x: 28.0, y: 21.4,
        },
        'エブラーナベアー': {
            area: 'ガレマルド', x: 12.9, y: 27.6,
        },
        'オートマチック・アヴェンジャー': {
            area: 'ガレマルド', x: 12.7, y: 12.1,
        },
        'オートマチック・キャバルリー': {
            area: 'ガレマルド', x: 13.4, y: 16.4,
        },
        'オートマチック・コロッサス': {
            area: 'ガレマルド', x: 25.7, y: 14.3,
        },
        'オートマチック・サテライト': {
            area: 'ガレマルド', x: 21.0, y: 10.1,
        },
        'オートマチック・スラッシャー': {
            area: 'ガレマルド', x: 31.7, y: 11.4,
        },
        'オートマチック・デスマシーン': {
            area: 'ガレマルド', x: 22.6, y: 17.3,
        },
        'オートマチック・ビット': {
            area: 'ガレマルド', x: 23.5, y: 18.5,
        },
        'オートマチック・マグナローダー': {
            area: 'ガレマルド', x: 17.3, y: 11.6,
        },
        'オーバーグロウン・ローズ': {
            area: 'ガレマルド', x: 26.1, y: 27.0,
        },
        'オウヴィボス': {
            area: 'ガレマルド', x: 18.2, y: 28.4,
        },
        'カニスルピナス': {
            area: 'ガレマルド', x: 19.4, y: 27.6,
        },
        'セルリウムゾブラン': {
            area: 'ガレマルド', x: 30.5, y: 33.6,
        },
        'ヨトゥン': {
            area: 'ガレマルド', x: 23.0, y: 25.3,
        },
        'アーマルコライト': {
            area: '嘆きの海', x: 16.2, y: 29.7,
        },
        'ウィーパー': {
            area: '嘆きの海', x: 30.3, y: 32.2,
        },
        'オスキュレーター': {
            area: '嘆きの海', x: 24.0, y: 19.3,
        },
        'ケアテイカー': {
            area: '嘆きの海', x: 10.3, y: 9.0,
        },
        'サポーター': {
            area: '嘆きの海', x: 13.4, y: 10.0,
        },
        'シンカー': {
            area: '嘆きの海', x: 18.6, y: 19.9,
        },
        'スウィーパー': {
            area: '嘆きの海', x: 8.3, y: 35.3,
        },
        'スクレーパー': {
            area: '嘆きの海', x: 31.9, y: 9.9,
        },
        'ダイナマイト': {
            area: '嘆きの海', x: 11.7, y: 23.3,
        },
        'ダウンフォール・アラーム': {
            area: '嘆きの海', x: 30.5, y: 27.0,
        },
        'ダウンフォール・ドロイド': {
            area: '嘆きの海', x: 34.6, y: 27.0,
        },
        'ダウンフォール・ハンター': {
            area: '嘆きの海', x: 34.1, y: 28.4,
        },
        'ダフニア': {
            area: '嘆きの海', x: 22.7, y: 22.8,
        },
        'トリマー': {
            area: '嘆きの海', x: 23.0, y: 33.3,
        },
        'パノプト': {
            area: '嘆きの海', x: 8.0, y: 34.0,
        },
        'ムース': {
            area: '嘆きの海', x: 16.3, y: 24.6,
        },
        'レゴリス': {
            area: '嘆きの海', x: 27.9, y: 35.2,
        },
        'ワンダラー': {
            area: '嘆きの海', x: 26.2, y: 25.7,
        },
        'アカンサ': {
            area: 'エルピス', x: 26.6, y: 5.8,
        },
        'イグドリア': {
            area: 'エルピス', x: 18.3, y: 28.8,
        },
        'エルピスタウロス': {
            area: 'エルピス', x: 13.4, y: 19.9,
        },
        'オキュペテ': {
            area: 'エルピス', x: 23.6, y: 20.0,
        },
        'オピオタウロス': {
            area: 'エルピス', x: 14.1, y: 6.7,
        },
        'オピオン': {
            area: 'エルピス', x: 26.1, y: 33.8,
        },
        'グリュプス': {
            area: 'エルピス', x: 10.9, y: 30.4,
        },
        'バード・オブ・エルピス': {
            area: 'エルピス', x: 28.1, y: 24.5,
        },
        'ハルピュイア': {
            area: 'エルピス', x: 16.1, y: 9.7,
        },
        'ヒッペー': {
            area: 'エルピス', x: 32.7, y: 14.7,
        },
        'ファノプシュケ': {
            area: 'エルピス', x: 9.7, y: 35.1,
        },
        'ペガソス': {
            area: 'エルピス', x: 10.7, y: 13.8,
        },
        'マーカス・モルボル': {
            area: 'エルピス', x: 24.6, y: 10.1,
        },
        'メラニオン': {
            area: 'エルピス', x: 11.1, y: 23.7,
        },
        'モノセロス': {
            area: 'エルピス', x: 26.6, y: 29.9,
        },
        'リコペルシクム': {
            area: 'エルピス', x: 24.6, y: 14.5,
        },
        'レモラ': {
            area: 'エルピス', x: 31.2, y: 17.3,
        },
        'ロティス': {
            area: 'エルピス', x: 21.4, y: 12.2,
        },
        'アザーワン': {
            area: 'ウルティマ・トゥーレ', x: 14.3, y: 13.9,
        },
        'ステラ・アンフィプテレ': {
            area: 'ウルティマ・トゥーレ', x: 9.8, y: 31.1,
        },
        'ステラ・ブロビニャク': {
            area: 'ウルティマ・トゥーレ', x: 15.2, y: 28.8,
        },
        'デルタ': {
            area: 'ウルティマ・トゥーレ', x: 34.2, y: 28.2,
        },
        'ドリフティング・イーア': {
            area: 'ウルティマ・トゥーレ', x: 30.2, y: 13.5,
        },
        'ブロークン・オミクロン': {
            area: 'ウルティマ・トゥーレ', x: 30.3, y: 25.6,
        },
        'ベータ': {
            area: 'ウルティマ・トゥーレ', x: 36.7, y: 26.6,
        },
        'ラムダ': {
            area: 'ウルティマ・トゥーレ', x: 36.3, y: 25.8,
        },
        'レベルトリッカー': {
            area: 'ウルティマ・トゥーレ', x: 32.2, y: 26.8,
        },
    },
    '黄金': {
        // モンスターの座標はゲームエイトのデータ（https://game8.jp/ff14/629108）を一部修正
        // （ブロークン・セントリーR8とアウトライナーだけ座標を変更）
        'アルパカ': {
            area: 'オルコ・パチャ', x: 30.6, y: 13.1,
        },
        'シエナム': {
            area: 'オルコ・パチャ', x: 28.0, y: 16.8,
        },
        'シルバリオ': {
            area: 'オルコ・パチャ', x: 28.9, y: 15.8,
        },
        'スパインモール': {
            area: 'オルコ・パチャ', x: 22.7, y: 12.9,
        },
        'チーワグー・サベラー': {
            area: 'オルコ・パチャ', x: 21.3, y: 32.7,
        },
        'チャバ・ガーダン': {
            area: 'オルコ・パチャ', x: 27.9, y: 10.7,
        },
        'トラチュー': {
            area: 'オルコ・パチャ', x: 31.1, y: 17.6,
        },
        'トラルダイル': {
            area: 'オルコ・パチャ', x: 29.1, y: 29.5,
        },
        'トラルラーテル': {
            area: 'オルコ・パチャ', x: 29.9, y: 14.9,
        },
        'ナーヨードー': {
            area: 'オルコ・パチャ', x: 25.4, y: 27.0,
        },
        'ノトカクター': {
            area: 'オルコ・パチャ', x: 16.1, y: 13.3,
        },
        'バンデルクァール': {
            area: 'オルコ・パチャ', x: 23.5, y: 16.2,
        },
        'ビッグジョウ': {
            area: 'オルコ・パチャ', x: 25.1, y: 24.0,
        },
        'ブラッドサッカー': {
            area: 'オルコ・パチャ', x: 31.3, y: 29.6,
        },
        'フリント': {
            area: 'オルコ・パチャ', x: 18.3, y: 29.1,
        },
        'マウンテンベアー': {
            area: 'オルコ・パチャ', x: 18.5, y: 16.6,
        },
        'メガマゲイ': {
            area: 'オルコ・パチャ', x: 22.6, y: 14.1,
        },
        'モルテン・フォーバッド': {
            area: 'オルコ・パチャ', x: 33.0, y: 27.2,
        },
        'リッジトラップ': {
            area: 'オルコ・パチャ', x: 9.5, y: 24.7,
        },
        'ワジェペン': {
            area: 'オルコ・パチャ', x: 17.1, y: 25.6,
        },
        'ウィドウメイカー': {
            area: 'コザマル・カ', x: 30.1, y: 25.4,
        },
        'ウォツ': {
            area: 'コザマル・カ', x: 32.2, y: 18.6,
        },
        'ウォロン': {
            area: 'コザマル・カ', x: 15.5, y: 7.4,
        },
        'ウッドマン': {
            area: 'コザマル・カ', x: 32.7, y: 9.4,
        },
        'オセロット': {
            area: 'コザマル・カ', x: 33.1, y: 15.1,
        },
        'グロウフライ': {
            area: 'コザマル・カ', x: 12.1, y: 18.7,
        },
        'ジャングルイグアナ': {
            area: 'コザマル・カ', x: 13.3, y: 25.4,
        },
        'ジャングルオロボン': {
            area: 'コザマル・カ', x: 13.0, y: 15.5,
        },
        'ジャングルペリカン': {
            area: 'コザマル・カ', x: 14.1, y: 9.6,
        },
        'スティンクシェル': {
            area: 'コザマル・カ', x: 27.0, y: 12.2,
        },
        'スワンプモンク': {
            area: 'コザマル・カ', x: 18.7, y: 27.3,
        },
        'テグー': {
            area: 'コザマル・カ', x: 33.7, y: 27.3,
        },
        'トゥカリブリ': {
            area: 'コザマル・カ', x: 20.1, y: 14.4,
        },
        'トマトン': {
            area: 'コザマル・カ', x: 7.4, y: 30.9,
        },
        'トラルネツァク': {
            area: 'コザマル・カ', x: 10.5, y: 25.9,
        },
        'トラルモルボル': {
            area: 'コザマル・カ', x: 16.8, y: 30.8,
        },
        'バード・オブ・リガカ': {
            area: 'コザマル・カ', x: 17.8, y: 23.1,
        },
        'ハンマーヘッドダイル': {
            area: 'コザマル・カ', x: 10.4, y: 10.5,
        },
        'ペーパーワスプ': {
            area: 'コザマル・カ', x: 36.7, y: 34.3,
        },
        'ヘヴィ・マタマタ': {
            area: 'コザマル・カ', x: 21.6, y: 12.4,
        },
        'ポイズンフロッグ': {
            area: 'コザマル・カ', x: 31.1, y: 16.3,
        },
        'ライノビートル': {
            area: 'コザマル・カ', x: 17.3, y: 15.2,
        },
        'レッサーアポリオン': {
            area: 'コザマル・カ', x: 12.4, y: 22.6,
        },
        'アンテサンサン': {
            area: 'ヤクテル樹海', x: 27.5, y: 35.8,
        },
        'ヴァザラル・ブラーシャ': {
            area: 'ヤクテル樹海', x: 11.9, y: 10.6,
        },
        'キラーピラニア': {
            area: 'ヤクテル樹海', x: 24.8, y: 8.7,
        },
        'ジャティーカモス': {
            area: 'ヤクテル樹海', x: 26.7, y: 23.7,
        },
        'チャイチャ': {
            area: 'ヤクテル樹海', x: 19.8, y: 10.5,
        },
        'トォーソク': {
            area: 'ヤクテル樹海', x: 27.9, y: 15.2,
        },
        'トォーゾン': {
            area: 'ヤクテル樹海', x: 35.4, y: 16.7,
        },
        'ネクローシス': {
            area: 'ヤクテル樹海', x: 15.5, y: 16.5,
        },
        'バードロ': {
            area: 'ヤクテル樹海', x: 18.4, y: 6.0,
        },
        'ピッチャーウィード': {
            area: 'ヤクテル樹海', x: 33.0, y: 22.5,
        },
        'フライアガリク': {
            area: 'ヤクテル樹海', x: 15.7, y: 37.4,
        },
        'ブランチベアラー': {
            area: 'ヤクテル樹海', x: 22.2, y: 26.1,
        },
        'ブルーモルフォ': {
            area: 'ヤクテル樹海', x: 13.0, y: 29.7,
        },
        'ブルーリフキン': {
            area: 'ヤクテル樹海', x: 11.1, y: 28.6,
        },
        'モーナー': {
            area: 'ヤクテル樹海', x: 30.6, y: 28.7,
        },
        'ヤクテル・スクイブ': {
            area: 'ヤクテル樹海', x: 31.0, y: 12.7,
        },
        'リーフマンティス': {
            area: 'ヤクテル樹海', x: 12.2, y: 21.8,
        },
        'アスピス': {
            area: 'シャーローニ荒野', x: 12.8, y: 12.5,
        },
        'エヘヘケヤー': {
            area: 'シャーローニ荒野', x: 15.7, y: 30.9,
        },
        'グラスランドウォーム': {
            area: 'シャーローニ荒野', x: 27.6, y: 25.9,
        },
        'グリットクロウ': {
            area: 'シャーローニ荒野', x: 24.2, y: 15.0,
        },
        'ケラトラプトル': {
            area: 'シャーローニ荒野', x: 26.6, y: 17.2,
        },
        'サンビアード': {
            area: 'シャーローニ荒野', x: 28.4, y: 27.4,
        },
        'セルリックアナラ': {
            area: 'シャーローニ荒野', x: 12.7, y: 21.2,
        },
        'セルリックボム': {
            area: 'シャーローニ荒野', x: 18.8, y: 20.9,
        },
        'タンブルクラブ': {
            area: 'シャーローニ荒野', x: 31.2, y: 32.7,
        },
        'トーリ・アリゲーター': {
            area: 'シャーローニ荒野', x: 34.4, y: 8.8,
        },
        'トラルタイマイ': {
            area: 'シャーローニ荒野', x: 27.8, y: 8.6,
        },
        'フライングポポト': {
            area: 'シャーローニ荒野', x: 30.8, y: 25.4,
        },
        'ホーンリザード': {
            area: 'シャーローニ荒野', x: 11.7, y: 14.9,
        },
        'ルニュカワッパ': {
            area: 'シャーローニ荒野', x: 20.7, y: 34.5,
        },
        'ルニュヒーシャヘ': {
            area: 'シャーローニ荒野', x: 21.0, y: 30.1,
        },
        'ロネーク': {
            area: 'シャーローニ荒野', x: 23.5, y: 12.5, // ずれている気がしたので修正
        },
        'ワイルドダラ': {
            area: 'シャーローニ荒野', x: 18.0, y: 23.2,
        },
        'アイクロプス': {
            area: 'ヘリテージファウンド', x: 19.6, y: 29.3,
        },
        'アステロディア': {
            area: 'ヘリテージファウンド', x: 9.8, y: 14.3,
        },
        'アックスビーク': {
            area: 'ヘリテージファウンド', x: 31.9, y: 27.7,
        },
        'ウールバック': {
            area: 'ヘリテージファウンド', x: 19.0, y: 31.9,
        },
        'エーニシェーニ・バット': {
            area: 'ヘリテージファウンド', x: 35.4, y: 16.2,
        },
        'カトブレプタ': {
            area: 'ヘリテージファウンド', x: 34.1, y: 14.9,
        },
        'カワヘアロー': {
            area: 'ヘリテージファウンド', x: 28.9, y: 28.4,
        },
        'カワヘパ': {
            area: 'ヘリテージファウンド', x: 33.1, y: 24.9,
        },
        'ゴンフォテリウム': {
            area: 'ヘリテージファウンド', x: 11.5, y: 15.5,
        },
        'サンダースピリット': {
            area: 'ヘリテージファウンド', x: 30.5, y: 18.8,
        },
        'パイソン': {
            area: 'ヘリテージファウンド', x: 13.4, y: 35.5,
        },
        'ブロークン・エアロスタット': {
            area: 'ヘリテージファウンド', x: 15.2, y: 19.5,
        },
        'ブロークン・セントリーR8': {
            area: 'ヘリテージファウンド', x: 13.0, y: 20.6,
        },
        'ブロークン・セントリーS8': {
            area: 'ヘリテージファウンド', x: 31.7, y: 11.6,
        },
        'ブロークン・タレット': {
            area: 'ヘリテージファウンド', x: 33.6, y: 34.3,
        },
        'ボルトハウンド': {
            area: 'ヘリテージファウンド', x: 24.3, y: 17.4,
        },
        'ミリメロン': {
            area: 'ヘリテージファウンド', x: 27.0, y: 21.5,
        },
        'アウトランナー': {
            area: 'リビング・メモリー', x: 21.4, y: 21.4, r: 90,
        },
        'アガヴォイデス': {
            area: 'リビング・メモリー', x: 11.9, y: 18.4,
        },
        'アサルトシザー': {
            area: 'リビング・メモリー', x: 30.7, y: 16.7,
        },
        'ウォーキングツリー': {
            area: 'リビング・メモリー', x: 8.1, y: 15.6,
        },
        'ガルガンチュア': {
            area: 'リビング・メモリー', x: 33.4, y: 20.3,
        },
        'グリーンマン': {
            area: 'リビング・メモリー', x: 17.2, y: 14.5,
        },
        'シーカーバット': {
            area: 'リビング・メモリー', x: 26.2, y: 31.2,
        },
        'ジェムキーパー': {
            area: 'リビング・メモリー', x: 29.6, y: 29.1,
        },
        'トルバラン': {
            area: 'リビング・メモリー', x: 16.9, y: 31.4,
        },
        'パイナップル': {
            area: 'リビング・メモリー', x: 31.5, y: 13.6,
        },
        'ファイアソウル': {
            area: 'リビング・メモリー', x: 28.0, y: 17.4,
        },
        'フライングキャット': {
            area: 'リビング・メモリー', x: 33.5, y: 32.6,
        },
        'ブラウニー': {
            area: 'リビング・メモリー', x: 35.5, y: 32.8,
        },
        'フルイドソウル': {
            area: 'リビング・メモリー', x: 9.7, y: 35.3,
        },
        'マッチロック・スコーピオン': {
            area: 'リビング・メモリー', x: 26.8, y: 7.8,
        },
        'メモリーバード': {
            area: 'リビング・メモリー', x: 9.7, y: 31.7,
        },
        'ユー': {
            area: 'リビング・メモリー', x: 14.5, y: 22.1,
        },
    }
    /*
    '': {
        '': {
            area: '', x: 0, y: 0, r: 8,
        },
        '': {
            area: '', x: 0, y: 0, r: 8,
        },
    }
    */
}

const LEVELS = {
     // 難易度
     // 腹立つことに英語版では拡張ごとに各難易度の呼び名が異なる
    '漆黒': ['初級', '中級', '上級'],
    '暁月': ['初級', '中級', '上級'],
    '黄金': ['初級', '中級', '上級'],
}

const SET = {
    // モンスターの組み合わせ一覧
    '漆黒': {
        // ここは自前
        '初級': [
            ['アイランド・ウルフ', 'サンドモール', 'ウルヴァリン', 'キラービー', 'ホブゴブリン'],
            ['アイランド・レイル', 'ギガテンダー', 'ウェットランド・ワーグ', 'キラービー', 'ホップトラップ'],
            ['ウィップテール', 'シザージョウ', 'プロテロスクス', 'ローズベアー', 'マウルタッシュ'],
            ['コルシア・バイソン', 'シザージョウ', 'ノール', 'エーディンモス', 'チリアド・キャマ'],
            ['ジェルミナンツ', 'グラーム', 'ヤテベオ', 'フラワーバスケット', 'レイクバイパー'],
            ['トラゴパン', 'エンシェント・リザード', 'ヴァイオレット・トリフィド', 'エーディンモス', 'ウィップテール'],
            ['ホブゴブリン', 'サンドモール', 'レイクバイパー', 'エケボア', 'ウッドアイズ'],
            ['マウルタッシュ', 'ギガテンダー', 'チリアド・キャマ', 'ホーカー', 'ウェットランド・ワーグ'],
            /*
            ['', '', '', '', ''],
            */
        ],
        '中級': [
            ['ガーデン・コロコッタ', 'ウッドバット', 'ヴァンパイアヴァイン', 'フレイム・ゾヌール', 'モスフングス'],
            ['ガーデン・ポークシー', 'エコー', 'トマトル', 'デビタージュ', 'コヨーテ'],
            ['グリーングライダー', 'ギザマルーク', 'グレートウッドレイル', 'スパイクモール', 'ノーム'],
            ['グリーングライダー', 'トマトル', 'タリチャック', 'デビタージュ', 'イビルウェポン'],
            ['トートエイビス', 'スナップウィード', 'ヘルムビートル', 'ノーム', 'モラマンダー'],
            ['モスフングス', 'ヘルムビートル', 'カラカル', 'モラマンダー', 'ガーデン・ポークシー'],
            ['ラビットテール', 'ワイルドスワイン', 'ギザマルーク', 'フォルスラコス', 'レインボー・ロリキート'],
            ['レインボー・ロリキート', 'アトロシラプトル', 'クラックド・ロンカソーン', 'マスターレス・タロース', 'ラビットテール'],
        ],
        '上級': [
            ['クリフカイト', 'アンフィスバエナ', 'アトロシラプトル', 'ガーデン・コロコッタ', 'マスターレス・タロース'],
            ['クリフカイト', 'シーゼラチン', 'ヴァンパイアヴァイン', 'ウェットランド・ワーグ', 'スパイクモール'],
            ['クリフモール', 'カブス', 'タリチャック', 'レイクバイパー', 'エンシェント・リザード'],
            ['サイカニア', 'シーゼラチン', 'クラックド・ロンカドール', 'ラビットテール', 'グラーム'],
            ['サルファー・ビルゲン', 'ダゴン', 'カラカル', 'モスフングス', 'シザージョウ'],
            ['サルファー・ビルゲン', 'トリロバイト', 'ギザマルーク', 'グリーングライダー', 'デビタージュ'],
            ['スクリー・ノーム', 'ダゴン', 'ウッドバット', 'ローズベアー', 'ギガテンダー'],
            ['スクリー・ノーム', 'モーゴウル', 'エコー', 'トートエイビス', 'ノール'],
            ['デフェクティブ・タロース', 'クリオニッド', 'グレートウッドレイル', 'ホーカー', 'スミロドン'],
            ['デフェクティブ・タロース', 'モーゴウル', 'クラックド・ロンカソーン', 'エケボア', 'イビルウェポン'],
            ['ドワーヴン・オートマトン', 'テンペストスワロー', 'トマトル', 'ウェアウッド', 'ウルヴァリン'],
            ['ハイランド・ヒソプ', 'シーアネモネ', 'ヴァイオレット・トリフィド', 'キラービー', 'ノーム'],
            ['フルドゥ', 'シーアネモネ', 'クラックド・ロンカヴェッセル', 'フラワーバスケット', 'フォルスラコス'],
        ]
    },
    '暁月': {
        // ここはさにすとのにちじょう（https://www.sunny-stronger.com/）からの転載＋α
        '初級': [
            ['カリブー', 'カチャパ', 'マウンテンチキン', 'チャムロッシュ', 'エブラーナベアー'],
            ['カリブー', 'ピシャーチャ', 'マウンテンチキン', 'ヴァジュララングラ', 'イルサバード・トゥルスス'],
            ['トロル', 'ピシャーチャ', 'ゲノーモス', 'シュトラムルグ', 'アルマスティ'], //
            ['ラヴィリンソス・スクリーマー', 'ガジャ', 'ノーザン・スナップウィード', 'スターマイト', 'オウヴィボス'], //
            ['リマスカブラ', 'ハンサ', 'ヤーコウ', 'サベネアンジャムメル', 'エブラーナ・アイストラップ'], //
            // ここから追加分
            ['トロル', 'アキャーリクラブ', 'ゲノーモス', 'ヴァルラス', 'アルマスティ'],
            ['ミスリルキャップ', 'ガジャ', 'ペプレド', 'チャムロッシュ', 'オーバーグロウン・ローズ'],
            ['ミスリルキャップ', 'マンジュサカ', 'ペプレド', 'ヴァルラス', 'ヨトゥン'],
            ['ラヴィリンソス・スクリーマー', 'ハンサ', 'ノーザン・スナップウィード', 'シュトラムルグ', 'セルリウムゾブラン'],
            ['リマスカブラ', 'カチャパ', 'ヤーコウ', 'スターマイト', 'カニスルピナス'],
        ],
        '中級': [
            ['オートマチック・アヴェンジャー', 'ダウンフォール・アラーム', 'スウィーパー', 'スクレーパー', 'ブンジャンガ'],
            ['オートマチック・キャバルリー', 'ウィーパー', 'ダウンフォール・ドロイド', 'シンカー', 'ブンジャンガ'], //
            ['オートマチック・サテライト', 'パノプト', 'ワンダラー', 'スクレーパー', 'オドカン'],
            ['オートマチック・デスマシーン', 'ワンダラー', 'トリマー', 'ムース', 'グハーシャヤ'], //
            ['オートマチック・マグナローダー', 'トリマー', 'ダウンフォール・アラーム', 'ケアテイカー', 'オドカン'], //
            ['オートマチック・ビット', 'レゴリス', 'アーマルコライト', 'ダイナマイト', 'バブーン'], //
            // ここから追加分
            ['オートマチック・キャバルリー', 'ダウンフォール・ハンター', 'ウィーパー', 'ダフニア', 'バブーン'],
            ['オートマチック・コロッサス', 'アーマルコライト', 'ダウンフォール・ハンター', 'サポーター', 'グハーシャヤ'],
            ['オートマチック・サテライト', 'スウィーパー', 'レゴリス', 'ダフニア', 'アシュヴァッタ'],
            ['オートマチック・スラッシャー', 'ダウンフォール・ドロイド', 'パノプト', 'ムース', 'アシュヴァッタ'],
            ['ヤーコウ', 'ガジャ', 'レゴリス', 'ロティス', 'レベルトリッカー'],
        ],
        '上級': [
            ['アルマスティ', 'アキャーリクラブ', 'ダウンフォール・アラーム', 'ペガソス', 'ブロークン・オミクロン'], //
            ['オートマチック・アヴェンジャー', 'カチャパ', 'ワンダラー', 'グリュプス', 'デルタ'], //
            ['オートマチック・デスマシーン', 'ブンジャンガ', 'サポーター', 'オピオン', 'ブロークン・オミクロン'],
            ['オートマチック・マグナローダー', 'バブーン', 'スクレーパー', 'イグドリア', 'ドリフティング・イーア'],
            ['オウヴィボス', 'リマスカブラ', 'ダフニア', 'マーカス・モルボル', 'デルタ'],
            ['オーバーグロウン・ローズ', 'アシュヴァッタ', 'ケアテイカー', 'エルピスタウロス', 'ステラ・ブロビニャク'],
            ['ヨトゥン', 'チャムロッシュ', 'シンカー', 'リコペルシクム', 'ラムダ'],
            // ここから追加分
            ['イルサバード・トゥルスス', 'スターマイト', 'シンカー', 'オキュペテ', 'レベルトリッカー'],
            ['エブラーナ・アイストラップ', 'トロル', 'ダウンフォール・ハンター', 'ハルピュイア', 'ベータ'],
            ['エブラーナベアー', 'ヴァジュララングラ', 'ダウンフォール・ドロイド', 'ヒッペー', 'ドリフティング・イーア'],
            ['オートマチック・サテライト', 'グハーシャヤ', 'ムース', 'レモラ', 'アザーワン'],
            ['ノーザン・スナップウィード', 'ハンサ', 'ウィーパー', 'モノセロス', 'ラムダ'],
            ['ハンサ', 'ウィーパー', 'モノセロス', 'ラムダ', 'ノーザン・スナップウィード'],
            ['マウンテンチキン', 'シュトラムルグ', 'アーマルコライト', 'オピオタウロス', 'アザーワン'],
            ['ペプレド', 'サベネアンジャムメル', 'パノプト', 'ファノプシュケ', 'ステラ・ブロビニャク'],
            ['カニスルピナス', 'ヴァルラス', 'ダイナマイト', 'メラニオン', 'ステラ・アンフィプテレ'],
        ]
    },
    '黄金': {
        // ここはさにすとのにちじょう（https://www.sunny-stronger.com/）からの転載
        '初級': [
            ['アルパカ', 'トラルラーテル', 'トラルネツァク', 'レッサーアポリオン', 'スティンクシェル'], //
            ['シエナム', 'トラルダイル', 'スパインモール', 'ヘヴィ・マタマタ', 'トラルモルボル'],
            ['シルバリオ', 'ノトカクター', 'レッサーアポリオン', 'ウォロン', 'ウォツ'], //
            ['スパインモール', 'ナーヨードー', 'ハンマーヘッドダイル', 'ポイズンフロッグ', 'ウィドウメイカー'],
            ['チーワグー・サベラー', 'ワジェペン', 'アルパカ', 'トゥカリブリ', 'バード・オブ・リガカ'],
            ['チャバ・ガーダン', 'リッジトラップ', 'シルバリオ', 'グロウフライ', 'ペーパーワスプ'], //
            ['トラチュー', 'ビッグジョウ', 'ブラッドサッカー', 'ジャングルオロボン', 'テグー'],
            ['ブラッドサッカー', 'マウンテンベアー', 'ジャングルペリカン', 'スワンプモンク', 'オセロット'],
            ['フリント', 'モルテン・フォーバッド', 'メガマゲイ', 'ライノビートル', 'トマトン'],
            ['メガマゲイ', 'バンデルクァール', 'ジャングルイグアナ', 'ハンマーヘッドダイル', 'ウッドマン'], //
        ],
        '中級': [
            ['ヴァザラル・ブラーシャ', 'フライアガリク', 'トラルタイマイ', 'フライングポポト', 'ルニュヒーシャヘ'],
            ['キラーピラニア', 'チャイチャ', 'アスピス', 'トーリ・アリゲーター', 'タンブルクラブ'], //
            ['チャイチャ', 'トォーゾン', 'モーナー', 'タンブルクラブ', 'グラスランドウォーム'], //
            ['トォーソク', 'ネクローシス', 'フライングポポト', 'グリットクロウ', 'ケラトラプトル'],
            ['ネクローシス', 'アンテサンサン', 'ヴァザラル・ブラーシャ', 'セルリックアナラ', 'ワイルドダラ'],
            ['モーナー', 'ブルーモルフォ', 'バードロ', 'アスピス', 'ホーンリザード'],
            ['バードロ', 'リーフマンティス', 'グリットクロウ', 'サンビアード', 'ルニュカワッパ'], //
            ['ブランチベアラー', 'ピッチャーウィード', 'ブルーリフキン', 'ケラトラプトル', 'セルリックボム'], //
            ['ブルーリフキン', 'ジャティーカモス', 'ホーンリザード', 'ロネーク', 'エヘヘケヤー'],
            ['ヤクテル・スクイブ', 'ブランチベアラー', 'ロネーク', 'トラルタイマイ', 'セルリックアナラ'],
        ],
        '上級': [
            ['アルパカ', 'チャイチャ', 'タンブルクラブ', 'アックスビーク', 'アウトランナー'],
            ['ウィドウメイカー', 'ブルーモルフォ', 'ホーンリザード', 'パイソン', 'ユー'],
            ['ウォロン', 'トォーゾン', 'グラスランドウォーム', 'サンダースピリット', 'ガルガンチュア'], //
            ['シルバリオ', 'モーナー', 'アスピス', 'ゴンフォテリウム', 'フライングキャット'],
            ['スパインモール', 'ブルーリフキン', 'ロネーク', 'アイクロプス', 'トルバラン'],
            ['スワンプモンク', 'トォーソク', 'グリットクロウ', 'ウールバック', 'ファイアソウル'],
            ['トゥカリブリ', 'アンテサンサン', 'ワイルドダラ', 'カトブレプタ', 'アサルトシザー'],
            ['トマトン', 'フライアガリク', 'ルニュヒーシャヘ', 'カワヘアロー', 'ウォーキングツリー'],
            ['トラルモルボル', 'リーフマンティス', 'ルニュカワッパ', 'カワヘパ', 'グリーンマン'],
            ['バード・オブ・リガカ', 'ジャティーカモス', 'エヘヘケヤー', 'アステロディア', 'アガヴォイデス'], //
            ['バンデルクァール', 'ヴァザラル・ブラーシャ', 'フライングポポト', 'ブロークン・セントリーS8', 'フルイドソウル'],
            ['ハンマーヘッドダイル', 'ヤクテル・スクイブ', 'トラルタイマイ', 'ブロークン・タレット', 'マッチロック・スコーピオン'],
            ['ビッグジョウ', 'バードロ', 'サンビアード', 'ブロークン・セントリーR8', 'メモリーバード'],
            ['ブラッドサッカー', 'ネクローシス', 'セルリックアナラ', 'ボルトハウンド', 'ジェムキーパー'], //
            ['ポイズンフロッグ', 'ピッチャーウィード', 'セルリックボム', 'ミリメロン', 'パイナップル'], //
            ['メガマゲイ', 'ブランチベアラー', 'ケラトラプトル', 'エーニシェーニ・バット', 'シーカーバット'],
            ['レッサーアポリオン', 'キラーピラニア', 'トーリ・アリゲーター', 'ブロークン・エアロスタット', 'ブラウニー'],
        ]
    }
}
log('DATA: 組み合わせデータ検証開始');
for (let patch in SET) {
    for (let level in SET[patch]) {
        for (let mobs of SET[patch][level]) {
            for (let mob of mobs) {
                if (mob) {
                    if (MONSTER[patch][mob] === undefined) log('DATA: ' + mob + ' のデータが存在しません（名前間違い？）');
                } else {
                    log('DATA: 組み合わせに空白があります');
                }
            }
        }
    }
}
log('DATA: 組み合わせデータ検証終了');
// 先頭のモンスター名から逆引きできるようにしておく
// 暁月には1匹目が被るケースがあるらしい・・
// その場合は2匹目まで表示するようにするか？
