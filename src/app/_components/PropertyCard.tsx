// src/app/_components/PropertyCard.tsx

'use client';

import { PropertyEntity, PropertyHelpers } from '@/core/domain/entities/property.entity';
import { MapPin, DollarSign, User, Calendar, Building2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
	property: PropertyEntity;
}

export function PropertyCard({ property }: PropertyCardProps) {
	const imageUrl = PropertyHelpers.getImageUrl(property.ImageUrl);
	const formattedPrice = PropertyHelpers.formatPrice(property.Price, property.Currency);

	return (
		<Link href={`/properties/${property.Id}`} className="block group">
			<Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
				{/* Imagen */}
				<div className="relative h-56 w-full overflow-hidden bg-gray-100">
					<Image
						src={imageUrl}
						alt={property.Name}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-110"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority={false}
					/>

					{/* Badge de Año */}
					<div className="absolute top-3 right-3">
						<Badge variant="secondary" className="bg-white/90 backdrop-blur">
							<Calendar className="w-3 h-3 mr-1" />
							{property.Year}
						</Badge>
					</div>

					{/* Badge de Ciudad */}
					<div className="absolute top-3 left-3">
						<Badge variant="default" className="bg-blue-600">
							<Building2 className="w-3 h-3 mr-1" />
							{property.City}
						</Badge>
					</div>
				</div>

				<CardHeader className="pb-3">
					<h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
						{property.Name}
					</h3>
				</CardHeader>

				<CardContent className="space-y-3 pb-3">
					{/* Dirección */}
					<div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
						<MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
						<p className="line-clamp-2">{property.Address}</p>
					</div>

					{/* Propietario */}
					<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
						<User className="w-4 h-4 flex-shrink-0 text-gray-500" />
						<p className="truncate">{property.OwnerName}</p>
					</div>

					{/* Estado */}
					<div className="text-xs text-gray-500">
						{property.State}
					</div>
				</CardContent>

				<CardFooter className="pt-3 border-t">
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-1">
							<DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
							<span className="text-2xl font-bold text-green-600 dark:text-green-400">
								{formattedPrice}
							</span>
						</div>

						<Badge variant="outline" className="text-xs">
							{property.Currency}
						</Badge>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}