'use client';

import { useParams, useRouter } from 'next/navigation';
import { PropertyForm } from '@/app/_components/PropertyForm';
import { usePropertyDetail, useUpdateProperty } from '@/app/_components/hooks/useProperties';
import { CreatePropertyDto } from '@/core/domain/entities/property.entity';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Edit, AlertCircle, Loader2 } from 'lucide-react';

export default function EditPropertyPage() {
	const params = useParams();
	const router = useRouter();
	const id = params.id as string;

	const { data: property, isLoading, isError, error } = usePropertyDetail(id);
	const updateProperty = useUpdateProperty();

	const handleSubmit = async (data: CreatePropertyDto) => {
		try {
			await updateProperty.mutateAsync({ id, data });
			router.push(`/properties/${id}`);
		} catch (error) {
			console.error('Error updating property:', error);
		}
	};

	const handleCancel = () => {
		router.back();
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
				<div className="container mx-auto px-4 py-8 max-w-4xl">
					<Skeleton className="h-10 w-32 mb-6" />
					<Skeleton className="h-12 w-64 mb-8" />
					<div className="space-y-6">
						<Skeleton className="h-32" />
						<Skeleton className="h-32" />
						<Skeleton className="h-32" />
					</div>
				</div>
			</div>
		);
	}

	if (isError || !property) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
				<div className="container mx-auto px-4 py-8 max-w-4xl">
					<Alert variant="destructive">
						<AlertCircle className="h-5 w-5" />
						<AlertTitle>Error loading property</AlertTitle>
						<AlertDescription>
							{error instanceof Error ? error.message : 'Propiedad no encontrada'}
						</AlertDescription>
					</Alert>
					<Button
						onClick={() => router.push('/properties')}
						variant="outline"
						className="mt-4"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Return to properties
					</Button>
				</div>
			</div>
		);
	}


	const initialData: CreatePropertyDto = {
		IdOwner: property.IdOwner,
		OwnerName: property.OwnerName,
		Name: property.Name,
		Address: property.Address,
		Price: property.Price,
		Currency: property.Currency,
		ImageUrl: property.ImageUrl || undefined,
		City: property.City,
		State: property.State,
		Year: property.Year,
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-15">
			<div className="container mx-auto px-4 py-8 max-w-4xl">

				<div className="mb-6">
					<Button
						variant="outline"
						size="lg"
						onClick={() => router.back()}
						className="mb-4"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back
					</Button>

					<div className="flex items-center gap-3">
						<Edit className="w-8 h-8 text-blue-600" />
						<div>
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
								Edit Property
							</h1>
							<p className="text-gray-600 dark:text-gray-400">
								Modify the information of {property.Name}
							</p>
						</div>
					</div>
				</div>

				<PropertyForm
					initialData={initialData}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					isLoading={updateProperty.isPending}
					mode="edit"
				/>
			</div>
		</div>
	);
}