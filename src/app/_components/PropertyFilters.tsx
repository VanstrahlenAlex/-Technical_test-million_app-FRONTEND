
'use client';

import { useState } from 'react';
import { PropertyFilters as IPropertyFilters } from '@/core/domain/entities/property.entity';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X, Filter } from 'lucide-react';

interface PropertyFiltersProps {
	onFiltersChange: (filters: IPropertyFilters) => void;
	initialFilters?: IPropertyFilters;
}

export function PropertyFilters({ onFiltersChange, initialFilters }: PropertyFiltersProps) {
	const [name, setName] = useState(initialFilters?.Name || '');
	const [address, setAddress] = useState(initialFilters?.Address || '');
	const [city, setCity] = useState(initialFilters?.City || '');
	const [state, setState] = useState(initialFilters?.State || '');
	const [minPrice, setMinPrice] = useState(initialFilters?.MinPrice?.toString() || '');
	const [maxPrice, setMaxPrice] = useState(initialFilters?.MaxPrice?.toString() || '');
	const [year, setYear] = useState(initialFilters?.Year?.toString() || '');

	const handleSearch = () => {
		const filters: IPropertyFilters = {
			PageNumber: 1,
			PageSize: 12,
			SortDescending: false,
		};

		if (name.trim()) filters.Name = name.trim();
		if (address.trim()) filters.Address = address.trim();
		if (city.trim()) filters.City = city.trim();
		if (state.trim()) filters.State = state.trim();
		if (minPrice) filters.MinPrice = parseFloat(minPrice);
		if (maxPrice) filters.MaxPrice = parseFloat(maxPrice);
		if (year) filters.Year = parseInt(year);

		onFiltersChange(filters);
	};

	const handleClear = () => {
		setName('');
		setAddress('');
		setCity('');
		setState('');
		setMinPrice('');
		setMaxPrice('');
		setYear('');

		onFiltersChange({
			PageNumber: 1,
			PageSize: 12,
			SortDescending: false,
		});
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Filter className="w-5 h-5" />
					Filter Properties
				</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
					{/* Nombre */}
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							placeholder="Casa moderna..."
							value={name}
							onChange={(e) => setName(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
					</div>

				
					<div className="space-y-2">
						<Label htmlFor="address">Address</Label>
						<Input
							id="address"
							type="text"
							placeholder="Carrera 43A..."
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
					</div>

					
					<div className="space-y-2">
						<Label htmlFor="city">City</Label>
						<Input
							id="city"
							type="text"
							placeholder="Bogotá, Medellín..."
							value={city}
							onChange={(e) => setCity(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
					</div>

					
					<div className="space-y-2">
						<Label htmlFor="state">State/Department</Label>
						<Input
							id="state"
							type="text"
							placeholder="Cundinamarca..."
							value={state}
							onChange={(e) => setState(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
					</div>

					
					<div className="space-y-2">
						<Label htmlFor="minPrice">Min price ($)</Label>
						<Input
							id="minPrice"
							type="number"
							placeholder="0"
							value={minPrice}
							onChange={(e) => setMinPrice(e.target.value)}
							onKeyPress={handleKeyPress}
							min="0"
							step="1000"
						/>
					</div>

					
					<div className="space-y-2">
						<Label htmlFor="maxPrice">Max Price ($)</Label>
						<Input
							id="maxPrice"
							type="number"
							placeholder="Sin límite"
							value={maxPrice}
							onChange={(e) => setMaxPrice(e.target.value)}
							onKeyPress={handleKeyPress}
							min="0"
							step="1000"
						/>
					</div>

					
					<div className="space-y-2">
						<Label htmlFor="year">Year of Build</Label>
						<Input
							id="year"
							type="number"
							placeholder="2020"
							value={year}
							onChange={(e) => setYear(e.target.value)}
							onKeyPress={handleKeyPress}
							min="1900"
							max={new Date().getFullYear() + 1}
						/>
					</div>
				</div>

				
				<div className="flex flex-col sm:flex-row gap-3 pt-2">
					<Button
						onClick={handleSearch}
						className="flex-1 sm:flex-initial"
						size="lg"
					>
						<Search className="w-4 h-4 mr-2" />
						Search Properties
					</Button>

					<Button
						onClick={handleClear}
						variant="outline"
						size="lg"
					>
						<X className="w-4 h-4 mr-2" />
						Clean Filters
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}