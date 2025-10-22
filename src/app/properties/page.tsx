

'use client';

import { useState } from 'react';
import { useProperties } from '@/app/_components/hooks/useProperties';
import { PropertyFilters as IPropertyFilters } from '@/core/domain/entities/property.entity';
import { PropertyFilters } from '@/app/_components/PropertyFilters';
import { PropertyCard } from '@/app/_components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, Home, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PropertiesPage() {
	const [filters, setFilters] = useState<IPropertyFilters>({
		PageNumber: 1,
		PageSize: 12,
		SortDescending: false,
	});

	const { data, isLoading, isError, error } = useProperties(filters);

	const handleFiltersChange = (newFilters: IPropertyFilters) => {
		setFilters({ ...newFilters, PageNumber: 1, PageSize: 12 });
	};

	const handlePageChange = (newPage: number) => {
		setFilters({ ...filters, PageNumber: newPage });
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-10">
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-3">
							<Home className="w-8 h-8 text-blue-600" />
							<div>
								<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
									Available Properties
								</h1>
								<p className="text-gray-600 dark:text-gray-400 text-lg">
									Find the perfect property for you
								</p>
							</div>
						</div>
						<Link href={'/properties/create'}>
						<Button
							size="lg"
							className="gap-2"
						>
							<PlusCircle className="w-5 h-5" />
							New Property
						</Button>
					</Link>
					</div>
				</div>

				{/* Filtros */}
				<div className="mb-8">
					<PropertyFilters
						onFiltersChange={handleFiltersChange}
						initialFilters={filters}
					/>
				</div>

				
				{isLoading && (
					<div className="space-y-6">
						<div className="flex justify-center items-center py-12">
							<Loader2 className="w-12 h-12 animate-spin text-blue-600" />
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{[...Array(8)].map((_, i) => (
								<div key={i} className="space-y-4">
									<Skeleton className="h-56 w-full rounded-lg" />
									<Skeleton className="h-4 w-3/4" />
									<Skeleton className="h-4 w-1/2" />
								</div>
							))}
						</div>
					</div>
				)}

				
				{isError && (
					<Alert variant="destructive">
						<AlertCircle className="h-5 w-5" />
						<AlertTitle>Error loading properties</AlertTitle>
						<AlertDescription>
							{error instanceof Error ? error.message : 'Error desconocido'}
						</AlertDescription>
					</Alert>
				)}

				
				{data && !isLoading && (
					<>
						
						<div className="mb-6 flex items-center justify-between">
							<div className="text-sm text-gray-600 dark:text-gray-400">
								Showing{' '}
								<span className="font-semibold text-gray-900 dark:text-white">
									{data.Items.length}
								</span>{' '}
								of{' '}
								<span className="font-semibold text-gray-900 dark:text-white">
									{data.TotalCount}
								</span>{' '}
								properties
								{data.TotalPages > 1 && (
									<>
										{' · Página '}
										<span className="font-semibold text-gray-900 dark:text-white">
											{data.PageNumber}
										</span>
										{' de '}
										<span className="font-semibold text-gray-900 dark:text-white">
											{data.TotalPages}
										</span>
									</>
								)}
							</div>
						</div>

						
						{data.Items.length === 0 ? (
							<div className="text-center py-20">
								<Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
								<h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
									No properties found
								</h3>
								<p className="text-gray-500 dark:text-gray-400">
									Try adjusting your search filters
								</p>
							</div>
						) : (
							<>
								
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
									{data.Items.map((property) => (
										<PropertyCard key={property.Id} property={property} />
									))}
								</div>

								
								{data.TotalPages > 1 && (
									<div className="flex items-center justify-center gap-2">
										<Button
											variant="outline"
											size="lg"
											onClick={() => handlePageChange(data.PageNumber - 1)}
											disabled={!data.HasPreviousPage}
										>
											<ChevronLeft className="w-4 h-4 mr-2" />
												Former
										</Button>

										<div className="flex items-center gap-2">
											{[...Array(Math.min(data.TotalPages, 5))].map((_, i) => {
												const pageNum = i + 1;
												return (
													<Button
														key={pageNum}
														variant={pageNum === data.PageNumber ? 'default' : 'outline'}
														size="lg"
														onClick={() => handlePageChange(pageNum)}
													>
														{pageNum}
													</Button>
												);
											})}
										</div>

										<Button
											variant="outline"
											size="lg"
											onClick={() => handlePageChange(data.PageNumber + 1)}
											disabled={!data.HasNextPage}
										>
											Next
											<ChevronRight className="w-4 h-4 ml-2" />
										</Button>
									</div>
								)}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}