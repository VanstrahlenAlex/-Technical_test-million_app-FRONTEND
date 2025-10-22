import { CTASection } from "./_components/homepage/CTASection";
import { FooterSection } from "./_components/homepage/FooterSection";
import { HeroSection } from "./_components/homepage/HeroSection";
import { PressSection } from "./_components/homepage/PressSection";
import { ServicesSection } from "./_components/homepage/ServicesSection";
import { StatsSection } from "./_components/homepage/StatsSection";


export default function Home() {
	return (
		<main className="min-h-screen">
			<HeroSection />
			<PressSection />
			<ServicesSection />
			<StatsSection />
			<CTASection />
			<FooterSection />
		</main>
	)
}
