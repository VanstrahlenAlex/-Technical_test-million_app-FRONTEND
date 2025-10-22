
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePropertyDtoSchema, CreatePropertyDto } from '@/core/domain/entities/property.entity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, X } from 'lucide-react';

interface PropertyFormProps {
	initialData?: Partial<CreatePropertyDto>;
	onSubmit: (data: CreatePropertyDto) => Promise<void>;
	onCancel?: () => void;
	isLoading?: boolean;
	mode?: 'create' | 'edit';
}

export function PropertyForm({
	initialData,
	onSubmit,
	onCancel,
	isLoading = false,
	mode = 'create',
}: PropertyFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreatePropertyDto>({
		resolver: zodResolver(CreatePropertyDtoSchema),
		defaultValues: initialData || {
			IdOwner: '',
			OwnerName: '',
			Name: '',
			Address: '',
			Price: 0,
			Currency: '', 
			ImageUrl: '',
			City: '',
			State: '',
			Year: new Date().getFullYear(),
		},
	});

	const handleFormSubmit = async (data: CreatePropertyDto) => {
		try {
			await onSubmit(data);
			if (mode === 'create') {
				reset();
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					{mode === 'create' ? 'Crear Nueva Propiedad' : 'Editar Propiedad'}
				</CardTitle>
				<CardDescription>
					{mode === 'create'
						? 'Completa los datos para agregar una nueva propiedad'
						: 'Actualiza la información de la propiedad'}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
					
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Owner Information</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="IdOwner">
									Owner ID <span className="text-red-500">*</span>
								</Label>
								<Input
									id="IdOwner"
									{...register('IdOwner')}
									placeholder="507f1f77bcf86cd799439011"
									disabled={isLoading}
								/>
								{errors.IdOwner && (
									<p className="text-sm text-red-500">{errors.IdOwner.message}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="OwnerName">
									Owner&#8217;s Name <span className="text-red-500">*</span>
								</Label>
								<Input
									id="OwnerName"
									{...register('OwnerName')}
									placeholder="Juan Pérez García"
									disabled={isLoading}
								/>
								{errors.OwnerName && (
									<p className="text-sm text-red-500">{errors.OwnerName.message}</p>
								)}
							</div>
						</div>
					</div>


					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Property Information</h3>

						<div className="space-y-2">
							<Label htmlFor="Name">
								Property Name <span className="text-red-500">*</span>
							</Label>
							<Input
								id="Name"
								{...register('Name')}
								placeholder="Casa Moderna en El Poblado"
								disabled={isLoading}
							/>
							{errors.Name && (
								<p className="text-sm text-red-500">{errors.Name.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="Address">
								Full Address <span className="text-red-500">*</span>
							</Label>
							<Input
								id="Address"
								{...register('Address')}
								placeholder="Carrera 43A #14-55, Medellín, Antioquia"
								disabled={isLoading}
							/>
							{errors.Address && (
								<p className="text-sm text-red-500">{errors.Address.message}</p>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="City">
									City <span className="text-red-500">*</span>
								</Label>
								<Input
									id="City"
									{...register('City')}
									placeholder="Medellín"
									disabled={isLoading}
								/>
								{errors.City && (
									<p className="text-sm text-red-500">{errors.City.message}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="State">
									State/Department <span className="text-red-500">*</span>
								</Label>
								<Input
									id="State"
									{...register('State')}
									placeholder="Antioquia"
									disabled={isLoading}
								/>
								{errors.State && (
									<p className="text-sm text-red-500">{errors.State.message}</p>
								)}
							</div>
						</div>
					</div>

					{/* Información Financiera */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Financial Information</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="Price">
									Price <span className="text-red-500">*</span>
								</Label>
								<Input
									id="Price"
									type="number"
									step="1000"
									{...register('Price', { valueAsNumber: true })}
									placeholder="450000"
									disabled={isLoading}
								/>
								{errors.Price && (
									<p className="text-sm text-red-500">{errors.Price.message}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="Currency">Currency</Label>
								<select
									id="Currency"
									{...register('Currency')}
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									disabled={isLoading}
								>
									<option value="USD">USD - Dólar</option>
									<option value="COP">COP - Peso Colombiano</option>
									<option value="EUR">EUR - Euro</option>
								</select>
								{errors.Currency && (
									<p className="text-sm text-red-500">{errors.Currency.message}</p>
								)}
							</div>
						</div>
					</div>

					{/* Información Adicional */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Additional information</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="Year">Year of Construction</Label>
								<Input
									id="Year"
									type="number"
									min="1900"
									max={new Date().getFullYear() + 1}
									{...register('Year', { valueAsNumber: true })}
									placeholder={new Date().getFullYear().toString()}
									disabled={isLoading}
								/>
								{errors.Year && (
									<p className="text-sm text-red-500">{errors.Year.message}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="ImageUrl">URL of Image</Label>
								<Input
									id="ImageUrl"
									type="url"
									{...register('ImageUrl')}
									placeholder="https://images.unsplash.com/photo-..."
									disabled={isLoading}
								/>
								{errors.ImageUrl && (
									<p className="text-sm text-red-500">{errors.ImageUrl.message}</p>
								)}
								<p className="text-xs text-gray-500">
									Optional. You can use Unsplash URLs or similar.
								</p>
							</div>
						</div>
					</div>

					
					{Object.keys(errors).length > 0 && (
						<Alert variant="destructive">
							<AlertDescription>
								Please correct any errors in the form before continuing.
							</AlertDescription>
						</Alert>
					)}

					
					<div className="flex gap-3 pt-4">
						<Button
							type="submit"
							disabled={isLoading}
							className="flex-1"
							size="lg"
						>
							{isLoading ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Saving...
								</>
							) : (
								<>
									<Save className="w-4 h-4 mr-2" />
									{mode === 'create' ? 'Crear Propiedad' : 'Guardar Cambios'}
								</>
							)}
						</Button>

						{onCancel && (
							<Button
								type="button"
								variant="outline"
								onClick={onCancel}
								disabled={isLoading}
								size="lg"
							>
								<X className="w-4 h-4 mr-2" />
								Cancel
							</Button>
						)}
					</div>
				</form>
			</CardContent>
		</Card>
	);
}