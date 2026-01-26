import { Link } from "react-router-dom";
import Section from "../Components/layout/Section";
import Button from "../Components/ui/Button";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-indigo-900 text-white font-serif font-bold text-xl">
                            SF
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 leading-tight">湘南藤沢高等専門学校</h1>
                            <p className="text-xs text-gray-500">Shonan Fujisawa National College of Technology</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                            <Link to="/coming-soon" className="hover:text-indigo-900 transition-colors">学校案内</Link>
                            <Link to="/coming-soon" className="hover:text-indigo-900 transition-colors">学科紹介</Link>
                            <Link to="/coming-soon" className="hover:text-indigo-900 transition-colors">学生生活</Link>
                            <Link to="/coming-soon" className="hover:text-indigo-900 transition-colors">入試情報</Link>
                            <Link to="/coming-soon" className="hover:text-indigo-900 transition-colors">企業・地域の方へ</Link>
                        </nav>
                        <div className="flex gap-3">
                            <Button variant="secondary" size="sm" to="/join">Discord参加</Button>
                            <Button variant="primary" size="sm" to="/coming-soon" className="animate-pulse">Access</Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative bg-gray-900 py-24 sm:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
                        alt="Campus background"
                        className="h-full w-full object-cover object-center opacity-40"
                    />
                </div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-serif animate-fade-in-up">
                        未来を創る、<br className="sm:hidden" />技術者の原点。
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
                        実践的な技術教育と豊かな人間形成。<br />
                        湘南藤沢高専は、社会を支えるエンジニアを育成します。
                    </p>
                </div>
            </div>

            {/* News / Important Notice */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Left: News */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-900 pb-2 mb-6">
                            重要なお知らせ
                        </h3>
                        <div className="space-y-6">
                            <Link to="/events/lt-1" className="block group transition-all duration-300 hover:-translate-y-1">
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                    <div className="shrink-0 w-24 text-sm text-gray-500 font-mono">2026.01.26</div>
                                    <div>
                                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mb-2">イベント</span>
                                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">
                                            【学生会主催】第1回 LT会「好きを、語れ。」開催決定
                                        </h4>
                                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                            学生同士の技術交流を目的としたライトニングトーク大会を開催します。今回のテーマは「情熱」。Discordでのオンライン開催となりますので、奮ってご参加ください。
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <hr className="border-gray-100" />

                            {/* Dummy News Items */}
                            {[
                                { date: "2025.12.15", cat: "入試", title: "令和8年度 学力選抜検査の実施について", link: "/coming-soon" },
                            ].map((item, i) => (
                                <Link to={item.link} key={i} className="flex flex-col sm:flex-row gap-4 items-start group cursor-pointer">
                                    <div className="shrink-0 w-24 text-sm text-gray-500 font-mono">{item.date}</div>
                                    <div>
                                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 mb-2">{item.cat}</span>
                                        <h4 className="text-base font-medium text-gray-900 group-hover:text-indigo-600 transition">
                                            {item.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right: Banners / Quick Links */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-4">受験生の方へ</h4>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/coming-soon" className="flex items-center text-gray-600 hover:text-indigo-700">▶ オープンキャンパス情報</Link></li>
                                <li><Link to="/coming-soon" className="flex items-center text-gray-600 hover:text-indigo-700">▶ 入試要項ダウンロード</Link></li>
                                <li><Link to="/coming-soon" className="flex items-center text-gray-600 hover:text-indigo-700">▶ 進路状況</Link></li>
                            </ul>
                        </div>

                        <Link to="/events/lt-1" className="block relative overflow-hidden rounded-xl group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <div className="absolute inset-0 bg-indigo-900/90 mix-blend-multiply transition group-hover:bg-indigo-900/80" />
                            <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80" alt="" className="h-40 w-full object-cover" />
                            <div className="absolute inset-0 p-6 flex flex-col justify-center">
                                <span className="text-yellow-400 font-bold text-xs tracking-wider uppercase mb-1">Pick Up</span>
                                <h3 className="text-xl font-bold text-white mb-2">第1回 LT会<br />参加者募集中</h3>
                                <span className="text-white/80 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    詳細を見る <span>→</span>
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="mx-auto max-w-7xl px-4 text-center sm:text-left">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">独立行政法人国立高等専門学校機構<br />湘南藤沢高等専門学校</h2>
                            <p className="text-sm">〒251-0000 神奈川県藤沢市（架空）</p>
                        </div>
                        <div className="text-sm space-y-2 md:text-right">
                            <p><Link to="/coming-soon" className="hover:text-white">サイトマップ</Link></p>
                            <p><Link to="/coming-soon" className="hover:text-white">プライバシーポリシー</Link></p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
                        &copy; 2026 Shonan Fujisawa College of Technology. All Rights Reserved. (Parody Site)
                    </div>
                </div>
            </footer>
        </div>
    );
}
