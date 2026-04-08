export type EventFact = {
    label: string;
    value: string;
};

export type FeatureItem = {
    title: string;
    description: string;
};

export type TimelineItem = {
    time: string;
    title: string;
    detail: string;
};

export type FaqItem = {
    question: string;
    answer: string;
};

export const lt2Event = {
    name: "湘南藤沢高専 LT会",
    eventCode: "LT VOL.02",
    tagline: "新学期の空気のなかで、5分だけ話してみる。校内で気軽に参加できるライトニングトークイベント。",
    description:
        "技術の話も、制作の話も、最近ハマっていることも歓迎。初参加でも緊張しすぎず、次の挑戦につながる場を目指したLT会です。",
    date: "2026年4月25日(土) 14:00-16:30",
    dateNote: "開場 13:30 / 新入生歓迎 / 途中参加OK / 視聴のみ歓迎",
    venue: "Discord内講堂",
    accessNote: "参加者は Discord サーバー内の講堂チャンネルから視聴・登壇する想定です。",
    audienceLine: "高専生・教員・技術に興味のある学生向け",
    registerPath: "/events/lt2/register",
    votePath: "/events/lt2/vote/presenter",
    joinUrl: "https://discord.gg/TvY8AP43vA",
    contact: "lt@sample-kosen.ac.jp",
    navItems: [
        { href: "#overview", label: "開催概要" },
        { href: "#about", label: "LT会とは" },
        { href: "#speakers", label: "登壇募集" },
        { href: "#faq", label: "FAQ" },
        { href: "#access", label: "アクセス" },
    ],
    heroFacts: [
        { label: "日時", value: "2026.04.25 SAT / 14:00-16:30" },
        { label: "会場", value: "Discord内講堂" },
        { label: "参加", value: "視聴のみOK / 途中入退室OK" },
        { label: "登壇", value: "発表5分 + 質疑2分" },
    ] satisfies EventFact[],
    overviewFacts: [
        { label: "イベント名", value: "湘南藤沢高専 LT会" },
        { label: "開催形式", value: "Discord内講堂で開催" },
        { label: "参加対象", value: "学生・教員・技術に興味のある人" },
        { label: "登壇時間", value: "1人 7分程度" },
    ] satisfies EventFact[],
    ltBasics: [
        {
            title: "短く話せる",
            description: "長い発表を準備しなくても大丈夫。5分だからこそ、いま話したいことを気軽に出せます。",
        },
        {
            title: "ジャンルが広い",
            description: "プログラミング、制作、研究、趣味、推しツールなど、技術に近い話題なら幅広く歓迎します。",
        },
        {
            title: "初参加でも安心",
            description: "学内イベントとして、質問しやすく、聞くだけでも入りやすい空気を大切にします。",
        },
    ] satisfies FeatureItem[],
    audienceGroups: [
        {
            title: "何か作っている人",
            description: "授業外で作っているもの、部活や個人開発の話を軽やかに共有したい人に向いています。",
        },
        {
            title: "まだ登壇したことがない人",
            description: "大きな発表会は緊張するけれど、一度は話してみたい人の最初の一歩としてちょうどよい規模です。",
        },
        {
            title: "刺激をもらいたい人",
            description: "他の学生が何に熱中しているかを知りたい、次の挑戦のきっかけがほしい人にもおすすめです。",
        },
    ] satisfies FeatureItem[],
    speakerAppeal: [
        "完成度よりも、今いちばん話したいことを歓迎します。",
        "スライドがシンプルでも大丈夫。口頭中心でも進行できます。",
        "タイトルと短い概要だけ先に出して、細部はあとから詰められます。",
    ],
    speakerSteps: [
        { title: "1. 登壇登録", description: "タイトルと概要を入力してエントリーします。" },
        { title: "2. 運営から確認", description: "Discord で順番や準備事項を案内します。" },
        { title: "3. 当日発表", description: "会場または Discord から 5 分で発表します。" },
    ] satisfies FeatureItem[],
    timeline: [
        { time: "13:30", title: "開場・接続確認", detail: "会場案内、Discord 参加チェック" },
        { time: "14:00", title: "オープニング", detail: "趣旨説明と発表ルールの共有" },
        { time: "14:10", title: "LT セッション前半", detail: "4-5本程度の発表を予定" },
        { time: "15:00", title: "休憩", detail: "感想共有・次セッション準備" },
        { time: "15:15", title: "LT セッション後半", detail: "追加発表とクロストーク" },
        { time: "16:10", title: "クロージング", detail: "感想共有・次回案内" },
    ] satisfies TimelineItem[],
    faqs: [
        {
            question: "聞くだけで参加してもいいですか？",
            answer: "大丈夫です。視聴だけの参加も歓迎です。まずは雰囲気を見るところからでも問題ありません。",
        },
        {
            question: "技術の話じゃないとだめですか？",
            answer: "技術イベントらしさは意識しつつ、制作、研究、日々の工夫、推しツールの紹介なども歓迎です。",
        },
        {
            question: "登壇内容がまだ固まっていません。",
            answer: "仮タイトルの登録でも大丈夫です。登録後に Discord で相談しながら整えられる前提にしています。",
        },
        {
            question: "スライドは必須ですか？",
            answer: "必須ではありません。画面共有、簡単なメモ、デモ中心など、伝わる形であれば問題ありません。",
        },
    ] satisfies FaqItem[],
    accessPoints: [
        "会場: 湘南藤沢高専 Discord サーバー内 講堂チャンネル",
        "入室方法: イベント案内チャンネルから当日の案内を確認して参加",
        "登壇方法: 画面共有または音声発表で参加可能",
    ],
    footerLinks: [
        { label: "登壇登録", href: "/events/lt2/register", external: false },
        { label: "Discord参加", href: "https://discord.gg/TvY8AP43vA", external: true },
    ],
} as const;
