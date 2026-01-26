import { useRef, useState, useEffect } from "react";
import Button from "../Components/ui/Button";
import Badge from "../Components/ui/Badge";
import Section from "../Components/layout/Section";

export default function LT1() {
    const cfpRef = useRef<HTMLDivElement | null>(null);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const scrollToCfp = () => {
        cfpRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            {/* Splash Screen */}
            <div
                className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-all duration-700 ${showSplash ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                <div className="text-center overflow-hidden">
                    <div className="overflow-hidden">
                        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl splash-title">
                            好きを、語れ。
                        </h1>
                    </div>
                    <div className="overflow-hidden mt-4">
                        <p className="text-lg text-gray-400 splash-subtitle">湘南藤沢高専 LT会</p>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <div className="splash-line" />
                    </div>
                </div>
                <style>{`
                    @keyframes slideUp {
                        0% { transform: translateY(100%); opacity: 0; }
                        100% { transform: translateY(0); opacity: 1; }
                    }
                    @keyframes fadeSlideUp {
                        0% { transform: translateY(20px); opacity: 0; }
                        100% { transform: translateY(0); opacity: 1; }
                    }
                    @keyframes drawLine {
                        0% { width: 0; }
                        100% { width: 120px; }
                    }
                    .splash-title {
                        animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                    .splash-subtitle {
                        animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
                        opacity: 0;
                    }
                    .splash-line {
                        height: 2px;
                        background: linear-gradient(90deg, transparent, #1f2937, transparent);
                        animation: drawLine 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
                        width: 0;
                    }
                `}</style>
            </div>

            <div className="min-h-screen bg-white text-gray-900">
                {/* Header */}
                <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" to="/">
                                ← Home
                            </Button>
                            <div className="h-4 w-px bg-gray-300" />
                            <div className="text-sm font-semibold">好きを、語れ。</div>
                        </div>
                        <nav className="hidden gap-5 text-sm text-gray-600 md:flex">
                            <a className="hover:text-gray-900" href="#about">
                                概要
                            </a>
                            <a className="hover:text-gray-900" href="#timetable">
                                TS
                            </a>
                            <a className="hover:text-gray-900" href="#join">
                                参加方法
                            </a>
                            <a className="hover:text-gray-900" href="#faq">
                                FAQ
                            </a>
                        </nav>
                        <Button variant="primary" to="/events/lt-1/register">
                            参加登録
                        </Button>
                    </div>
                </header>

                {/* Hero */}
                <div className="bg-white">
                    <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-14">
                        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <Badge label="参加登録〆 TBD" />
                                </div>

                                <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                    好きを、語れ。
                                </h1>
                                <p className="mt-3 text-lg font-medium text-gray-900">
                                    湘南藤沢高専 LT会
                                </p>
                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    Discord開催｜参加者募集中
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Button variant="primary" to="/events/lt-1/register">
                                        参加登録
                                    </Button>
                                    <Button variant="secondary" to="/join">
                                        Discord参加
                                    </Button>
                                </div>

                                <p className="mt-6 text-xs text-gray-500">
                                    正式名称：好きを語れ！湘南藤沢高専LT会！！
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
                                <div className="aspect-video w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-gray-200">
                                    <iframe
                                        className="h-full w-full"
                                        src={import.meta.env.VITE_YOUTUBE_URL}
                                        title="PR動画"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Section
                    id="about"
                    title="開催概要"
                    description="目的・対象・形式（Discord）をコンパクトにまとめます。"
                >
                    <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-sm font-semibold">テーマ「情熱を語れ」</h3>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                情熱をもって取り組んでいることを熱く語ってほしい！初学者にもわかるように、かつ自分の好きなモノの魅力を伝えよう。
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-6">
                            <h3 className="text-sm font-semibold">こんな人におすすめ</h3>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                                <li>人の「好き」を聞きたい（聴講のみも歓迎）</li>
                                <li>ライトに登壇してみたい</li>
                                <li>技術・制作の刺激が欲しい</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                        <h3 className="text-sm font-semibold font-mono">景品</h3>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                            <li>登壇者から抽選で <span className="font-medium">Discord Nitro</span> をプレゼント！</li>
                            <li>学生会長選出の優秀発表者には <span className="font-medium">「教員」ロール</span> を付与！</li>
                        </ul>
                    </div>
                </Section>


                <Section id="timetable" title="タイムテーブル（暫定）">
                    <div className="overflow-hidden rounded-2xl border border-gray-200">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="px-4 py-3">時間</th>
                                    <th className="px-4 py-3">内容</th>
                                    <th className="px-4 py-3">所要</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-3">19:00</td>
                                    <td className="px-4 py-3">オープニング・挨拶</td>
                                    <td className="px-4 py-3">10分</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3">19:10</td>
                                    <td className="px-4 py-3">LT発表（発表5分＋質疑2分）× n組</td>
                                    <td className="px-4 py-3">TBD</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3">-</td>
                                    <td className="px-4 py-3 text-gray-500">休憩（司会交代など）</td>
                                    <td className="px-4 py-3">5分</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3">20:30頃</td>
                                    <td className="px-4 py-3">総括・次回テーマ発表</td>
                                    <td className="px-4 py-3">15分</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-4 py-3">20:45〜</td>
                                    <td className="px-4 py-3">任意交流会（VC分けて感想会など）</td>
                                    <td className="px-4 py-3">自由</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-xs text-gray-500">※ 開催日時はメンバー確定後にアンケートで決定予定</p>
                </Section>

                <Section id="join" title="参加方法（Discord）">
                    <div className="grid gap-4 lg:grid-cols-3">
                        {[
                            { t: "1. 参加登録", d: "登録フォームから参加・LT応募のエントリーをします。" },
                            { t: "2. Discord参加", d: "完了画面のリンク等から、Discordサーバーに参加します。" },
                            { t: "3. 当日参加", d: "開始時間にイベント用ボイスチャンネルに接続します。" },
                        ].map((x) => (
                            <div key={x.t} className="rounded-2xl border border-gray-200 p-6">
                                <h3 className="text-sm font-semibold">{x.t}</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-600">{x.d}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section id="faq" title="FAQ">
                    <div className="rounded-2xl border border-gray-200 p-6">
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li>
                                <span className="font-medium text-gray-900">Q.</span> 聴講のみの参加もOK？
                                <br />
                                <span className="font-medium text-gray-900">A.</span> もちろん歓迎です！途中退出も自由です。
                            </li>
                            <li>
                                <span className="font-medium text-gray-900">Q.</span> 初心者でも登壇できますか？
                                <br />
                                <span className="font-medium text-gray-900">A.</span> 大歓迎！初学者にもわかるように語るのがテーマです。
                            </li>
                            <li>
                                <span className="font-medium text-gray-900">Q.</span> 発表中のルールは？
                                <br />
                                <span className="font-medium text-gray-900">A.</span> 登壇者以外はミュートをお願いします。質疑応答で発言できます。
                            </li>
                            <li>
                                <span className="font-medium text-gray-900">Q.</span> 録画はありますか？
                                <br />
                                <span className="font-medium text-gray-900">A.</span> ポリシーに従い、必要に応じて案内します。
                            </li>
                        </ul>
                    </div>
                </Section>

                <footer className="border-t border-gray-200 py-10">
                    <div className="mx-auto max-w-6xl px-4 text-sm text-gray-600">
                        <div className="font-medium text-gray-900">
                            好きを語れ！湘南藤沢高専LT会！！
                        </div>
                        <p className="mt-2">主催：LT会運営</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
