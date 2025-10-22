import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
	return (
		<section className="py-32 bg-background" id="contact">
			<div className="container mx-auto px-4 lg:px-8">
				<div className="max-w-4xl mx-auto text-center space-y-8">
					<h2 className="font-bold text-4xl md:text-6xl text-balance leading-tight">
						Ready to Find Your Dream Property?
					</h2>
					<p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
						Connect with our team of experts to explore exclusive listings and discover properties that exceed your
						expectations
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
						<Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
							<Link href="/properties">Schedule a Consultation</Link>
						</Button>
						<Button
							asChild
							size="lg"
							variant="outline"
							className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-8 bg-transparent"
						>
							<Link href="/properties">View Properties</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
