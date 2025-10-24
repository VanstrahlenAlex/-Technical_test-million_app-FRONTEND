/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPropertyRepository } from '@/core/domain/repositories/property.repository';
import {
	PropertyFilters,
	PropertyListResponse,
	PropertyEntity,
	PropertyDetailResponse,
	CreatePropertyDto,
	PropertyFiltersSchema,
	CreatePropertyDtoSchema,
} from '@/core/domain/entities/property.entity';
import { ZodError } from 'zod';

export class GetPropertiesUseCase {
	constructor(private propertyRepository: IPropertyRepository) { }

	async execute(filters?: PropertyFilters): Promise<PropertyListResponse> {
		try {
			
			if (filters) {
				const validatedFilters = PropertyFiltersSchema.parse(filters);
				const result = await this.propertyRepository.getAll(validatedFilters);

				if (!result.Success) {
					throw new Error(result.Message || 'Error al obtener propiedades');
				}

				return result;
			}

			const result = await this.propertyRepository.getAll();

			if (!result.Success) {
				throw new Error(result.Message || 'Error al obtener propiedades');
			}

			return result;
		} catch (error) {
			if (error instanceof ZodError) {
				const firstError = error.issues[0];
				throw new Error(`Error de validación: ${firstError.message}`);
			}

			if (error instanceof Error) {
				throw error;
			}

			throw new Error('Error desconocido al obtener propiedades');
		}
	}
}


export class GetPropertyDetailUseCase {
	constructor(private propertyRepository: IPropertyRepository) { }

	async execute(id: string): Promise<PropertyEntity> {
		if (!id || id.trim().length === 0) {
			throw new Error('El ID de la propiedad es requerido');
		}

		try {
			const result = await this.propertyRepository.getById(id);

			if (!result.Success || !result.Data) {
				throw new Error(result.Message || 'Propiedad no encontrada');
			}

			return result.Data;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error al obtener la propiedad');
		}
	}
}


export class CreatePropertyUseCase {
	constructor(private propertyRepository: IPropertyRepository) { }

	async execute(propertyData: CreatePropertyDto): Promise<PropertyEntity> {
		try {
			const validatedData = CreatePropertyDtoSchema.parse(propertyData);

			const result = await this.propertyRepository.create(validatedData);

			if (!result.Success || !result.Data) {
				throw new Error(result.Message || 'Error creating property');
			}

			return result.Data;
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.issues.map((e : any) => e.message).join(', ');
				throw new Error(`Validation errors: ${errors}`);
			}

			if (error instanceof Error) {
				throw error;
			}

			throw new Error('Unknown error creating property');
		}
	}
}


export class UpdatePropertyUseCase {
	constructor(private propertyRepository: IPropertyRepository) { }

	async execute(
		id: string,
		propertyData: Partial<CreatePropertyDto>
	): Promise<PropertyEntity> {
		if (!id || id.trim().length === 0) {
			throw new Error('Property ID is required');
		}

		try {

			const validatedData = CreatePropertyDtoSchema.partial().parse(propertyData);

			const result = await this.propertyRepository.update(id, validatedData);

			if (!result.Success || !result.Data) {
				throw new Error(result.Message || 'Error updating property');
			}

			return result.Data;
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.issues.map((e) => e.message).join(', ');
				throw new Error(`Validation errors: ${errors}`);
			}

			if (error instanceof Error) {
				throw error;
			}

			throw new Error('Unknown error while updating property');
		}
	}
}


export class DeletePropertyUseCase {
	constructor(private propertyRepository: IPropertyRepository) { }

	async execute(id: string): Promise<boolean> {
		if (!id || id.trim().length === 0) {
			throw new Error('El ID de la propiedad es requerido');
		}

		try {
			const result = await this.propertyRepository.delete(id);

			if (!result.Success) {
				throw new Error(result.Message || 'Error al eliminar la propiedad');
			}

			return true;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error desconocido al eliminar la propiedad');
		}
	}
}