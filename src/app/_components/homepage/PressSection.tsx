export function PressSection() {
	const pressLogos = [
		{ name: "Bloomberg", width: "w-32" },
		{ name: "The Wall Street Journal", width: "w-48" },
		{ name: "The New York Times", width: "w-48" },
		{ name: "Forbes", width: "w-28" },
	]

	return (
		<section className="py-16 bg-muted/30">
			<div className="container mx-auto px-4 lg:px-8">
				<p className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-12">As Featured In</p>
				<div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
					{pressLogos.map((logo) => (
						<div key={logo.name} className={`${logo.name} opacity-60 hover:opacity-100 transition-opacity`}>
							<div className="text-center font-semibold text-lg md:text-xl">{logo.name}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
