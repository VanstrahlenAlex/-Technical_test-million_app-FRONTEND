import Link from "next/link"

export function FooterSection() {
	return (
		<footer className="bg-primary text-primary-foreground py-16 border-t border-border">
			<div className="container mx-auto px-4 lg:px-8">
				<div className="grid md:grid-cols-4 gap-12 mb-12">
					{/* Brand */}
					<div className="space-y-4">
						<h3 className="font-bold text-2xl">MILLION LUXURY</h3>
						<p className="text-sm text-primary-foreground/70 leading-relaxed">
							Redefining luxury real estate with exceptional service and exclusive properties
						</p>
					</div>

					{/* Services */}
					<div className="space-y-4">
						<h4 className="font-semibold text-sm uppercase tracking-wider">Services</h4>
						<ul className="space-y-2 text-sm text-primary-foreground/70">
							<li>
								<Link href="/properties" className="hover:text-accent transition-colors">
									New Developments
								</Link>
							</li>
							<li>
								<Link href="/properties" className="hover:text-accent transition-colors">
									Luxury Sales
								</Link>
							</li>
							<li>
								<Link href="/properties" className="hover:text-accent transition-colors">
									Investment Advisory
								</Link>
							</li>
							<li>
								<Link href="/properties" className="hover:text-accent transition-colors">
									Property Management
								</Link>
							</li>
						</ul>
					</div>

					{/* Company */}
					<div className="space-y-4">
						<h4 className="font-semibold text-sm uppercase tracking-wider">Company</h4>
						<ul className="space-y-2 text-sm text-primary-foreground/70">
							<li>
								<Link href="#" className="hover:text-accent transition-colors">
									About Us
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-accent transition-colors">
									Our Team
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-accent transition-colors">
									Careers
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-accent transition-colors">
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div className="space-y-4">
						<h4 className="font-semibold text-sm uppercase tracking-wider">Contact</h4>
						<ul className="space-y-2 text-sm text-primary-foreground/70">
							<li>info@millionluxury.com</li>
							<li>+1 (555) 123-4567</li>
							<li className="pt-2">
								123 Luxury Avenue
								<br />
								New York, NY 10001
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
					<p>&copy; 2025 Million Luxury. All rights reserved.</p>
					<div className="flex gap-6">
						<Link href="#" className="hover:text-accent transition-colors">
							Privacy Policy
						</Link>
						<Link href="#" className="hover:text-accent transition-colors">
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
