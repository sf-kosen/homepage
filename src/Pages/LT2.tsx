import HeroSection from "../Components/lt2/HeroSection";
import SiteHeader from "../Components/lt2/SiteHeader";
import OverviewSection from "../Components/lt2/OverviewSection";
import AboutLtSection from "../Components/lt2/AboutLtSection";
import AudienceSection from "../Components/lt2/AudienceSection";
import CallForSpeakersSection from "../Components/lt2/CallForSpeakersSection";
import TimetableSection from "../Components/lt2/TimetableSection";
import FaqSection from "../Components/lt2/FaqSection";
import AccessSection from "../Components/lt2/AccessSection";
import SiteFooter from "../Components/lt2/SiteFooter";

export default function LT2() {
    return (
        <div className="lt-page lt-shell min-h-screen bg-[var(--bg)] text-[var(--text-strong)]">
            <SiteHeader />
            <main>
                <HeroSection />
                <OverviewSection />
                <AboutLtSection />
                <AudienceSection />
                <CallForSpeakersSection />
                <TimetableSection />
                <FaqSection />
                <AccessSection />
            </main>
            <SiteFooter />
        </div>
    );
}
