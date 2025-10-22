export function StatsSection() {
	const stats = [
		{ value: "$2.1B+", label: "Total Sales Volume" },
		{ value: "500+", label: "Properties Sold" },
		{ value: "#1", label: "Team in the US" },
		{ value: "15+", label: "Years of Excellence" },
	]

	return (
		<section className="py-24 bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 lg:px-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-12">
					{stats.map((stat, index) => (
						<div key={index} className="text-center space-y-3">
							<div className="font-bold text-4xl md:text-6xl text-accent">{stat.value}</div>
							<div className="text-sm md:text-base uppercase tracking-wider text-primary-foreground/80">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
