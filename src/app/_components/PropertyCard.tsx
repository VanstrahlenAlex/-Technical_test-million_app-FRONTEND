'use client';

import { useState } from 'react';
import { PropertyEntity, PropertyHelpers } from '@/core/domain/entities/property.entity';
import { MapPin, DollarSign, User, Calendar, Building2, Trash2, Edit, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDeleteProperty } from './hooks/useProperties';

interface PropertyCardProps {
	property: PropertyEntity;
	showActions?: boolean; // Mostrar botones de editar/eliminar
}

export function PropertyCard({ property, showActions = true }: PropertyCardProps) {
	const router = useRouter();
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const deleteProperty = useDeleteProperty();

	const imageUrl = PropertyHelpers.getImageUrl(property.ImageUrl);
	const formattedPrice = PropertyHelpers.formatPrice(property.Price, property.Currency);

	const handleDelete = async () => {
		try {
			await deleteProperty.mutateAsync(property.Id);
			setShowDeleteDialog(false);
		} catch (error) {
			console.error('Error deleting property:', error);
		}
	};

	const handleEdit = () => {
		router.push(`/properties/edit/${property.Id}`);
	};

	const handleView = () => {
		router.push(`/properties/${property.Id}`);
	};

	return (
		<>
			<Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl group">
				
				<div className="relative h-56 w-full overflow-hidden bg-gray-100">
					<Image
						src={imageUrl}
						alt={property.Name}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-110"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority={false}
					/>

					
					<div className="absolute top-3 right-3">
						<Badge variant="secondary" className="bg-white/90 backdrop-blur">
							<Calendar className="w-3 h-3 mr-1" />
							{property.Year}
						</Badge>
					</div>

					<div className="absolute top-3 left-3">
						<Badge variant="default" className="bg-blue-600">
							<Building2 className="w-3 h-3 mr-1" />
							{property.City}
						</Badge>
					</div>

					
					{showActions && (
						<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
							<Button
								size="sm"
								variant="secondary"
								onClick={handleView}
							>
								<Eye className="w-4 h-4 mr-1" />
								Ver
							</Button>
							<Button
								size="sm"
								variant="secondary"
								onClick={handleEdit}
							>
								<Edit className="w-4 h-4 mr-1" />
								Editar
							</Button>
							<Button
								size="sm"
								variant="destructive"
								onClick={() => setShowDeleteDialog(true)}
							>
								<Trash2 className="w-4 h-4 mr-1" />
								Eliminar
							</Button>
						</div>
					)}
				</div>

				
				<div onClick={handleView} className="cursor-pointer">
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
				</div>
			</Card>

			{/* Dialog de Confirmación de Eliminación */}
			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
						<AlertDialogDescription>
							Esta acción no se puede deshacer. Se eliminará permanentemente la propiedad{' '}
							<span className="font-semibold">{property.Name}</span>.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={deleteProperty.isPending}>
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={deleteProperty.isPending}
							className="bg-red-600 hover:bg-red-700"
						>
							{deleteProperty.isPending ? 'Eliminando...' : 'Eliminar'}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}