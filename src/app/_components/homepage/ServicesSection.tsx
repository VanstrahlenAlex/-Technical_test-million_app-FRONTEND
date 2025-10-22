import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function ServicesSection() {
	const services = [
		{
			title: "New Developments",
			description: "Exclusive access to the most prestigious new construction projects in prime locations.",
			image: "/2.png",
		},
		{
			title: "Luxury Sales",
			description: "Curated portfolio of exceptional properties for discerning buyers seeking the extraordinary.",
			image: "/3.png",
		},
		{
			title: "Investment Advisory",
			description: "Strategic guidance for high-net-worth individuals looking to maximize their real estate portfolio.",
			image: "/4.png",
		},
	]

	return (
		<section className="py-24 bg-background" id="services">
			<div className="container mx-auto px-4 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="font-bold text-4xl md:text-6xl mb-6 text-balance">
						Exceptional Service,
						<br />
						Extraordinary Results
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						We specialize in connecting visionary buyers with iconic properties that define luxury living
					</p>
				</div>

				{/* Services Grid */}
				<div className="grid md:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<Card
							key={index}
							className="overflow-hidden group cursor-pointer border-border hover:border-primary transition-all duration-300"
						>
							<div className="relative h-80 overflow-hidden">
								<img
									src={service.image || "/placeholder.svg"}
									alt={service.title}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
							</div>
							<div className="p-8 space-y-4">
								<h3 className="font-bold text-2xl">{service.title}</h3>
								<p className="text-muted-foreground leading-relaxed">{service.description}</p>
								<Button
									asChild
									variant="outline"
									className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
								>
									<Link href="/properties">Learn More</Link>
								</Button>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
