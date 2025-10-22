import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<img src="/1.png" alt="Luxury Property" className="w-full h-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
			</div>

			{/* Content */}
			<div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
				<div className="max-w-5xl mx-auto space-y-12">
					{/* Main Stats */}
					<div className="grid md:grid-cols-2 gap-12 md:gap-24">
						<div className="space-y-4">
							<h2 className="font-bold text-5xl md:text-7xl leading-tight text-balance">
								#1 Team
								<br />
								In The US
							</h2>
							<p className="text-xl md:text-2xl text-white/90 uppercase tracking-wider">In New Construction</p>
						</div>

						<div className="space-y-4">
							<h2 className="font-bold text-5xl md:text-7xl leading-tight text-balance">
								More Than
								<br />
								$2.1 Billion
							</h2>
							<p className="text-xl md:text-2xl text-white/90 uppercase tracking-wider">In Sales</p>
						</div>
					</div>

					{/* Tagline */}
					<div className="pt-8">
						<p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
							Redefining luxury real estate with unparalleled expertise, exclusive properties, and exceptional service
						</p>
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
						<Button asChild size="lg" className="bg-white text-black hover:bg-white/90 text-base px-8">
							<Link href="/properties">View Properties</Link>
						</Button>
						<Button
							asChild
							size="lg"
							variant="outline"
							className="border-white text-white hover:bg-white hover:text-black text-base px-8 bg-transparent"
						>
							<Link href="#contact">Contact Us</Link>
						</Button>
					</div>
				</div>
			</div>

			{/* Scroll Indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
				<div className="animate-bounce">
					<svg
						className="w-6 h-6 text-white/60"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
					</svg>
				</div>
			</div>
		</section>
	)
}
