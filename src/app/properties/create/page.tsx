'use client';

import { useRouter } from 'next/navigation';
import { PropertyForm } from '@/app/_components/PropertyForm';
import { useCreateProperty } from '@/app/_components/hooks/useProperties';
import { CreatePropertyDto } from '@/core/domain/entities/property.entity';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlusCircle } from 'lucide-react';

export default function CreatePropertyPage() {
	const router = useRouter();
	const createProperty = useCreateProperty();

	const handleSubmit = async (data: CreatePropertyDto) => {
		try {
			await createProperty.mutateAsync(data);
			router.push('/properties');
		} catch (error) {
			console.error('Error creating property:', error);

		}
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-15">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				{/* Header */}
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
						<PlusCircle className="w-8 h-8 text-blue-600" />
						<div>
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
								New Propertie
							</h1>
							<p className="text-gray-600 dark:text-gray-400">
								Agrega una nueva propiedad al sistema
							</p>
						</div>
					</div>
				</div>

				{/* Formulario */}
				<PropertyForm
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					isLoading={createProperty.isPending}
					mode="create"
				/>
			</div>
		</div>
	);
}