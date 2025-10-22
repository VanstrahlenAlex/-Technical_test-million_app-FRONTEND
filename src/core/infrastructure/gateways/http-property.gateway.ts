/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosError } from 'axios';

import {
	PropertyFilters,
	PropertyListResponse,
	PropertyDetailResponse,
	CreatePropertyDto,
	ApiResponse,
	PropertyListResponseSchema,
	PropertyDetailResponseSchema,
	PropertyHelpers
} from '@/core/domain/entities/property.entity';
import { IPropertyRepository } from '@/core/domain/repositories/property.repository';


export class HttpPropertyGateway implements IPropertyRepository {
	private api: AxiosInstance;
	private readonly baseURL: string;

	constructor(baseURL?: string) {
		this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5160/api/v1';

		this.api = axios.create({
			baseURL: this.baseURL,
			headers: {
				'Content-Type': 'application/json',
				'accept': 'application/json',
			},
			timeout: 15000,
		});

		this.setupInterceptors();
	}


	private setupInterceptors(): void {
		// Request interceptor
		this.api.interceptors.request.use(
			(config) => {
				if (process.env.NODE_ENV === 'development') {
					console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
						params: config.params,
						data: config.data,
					});
				}
				return config;
			},
			(error) => {
				console.error('[API Request Error]', error);
				return Promise.reject(error);
			}
		);


		this.api.interceptors.response.use(
			(response) => {
				if (process.env.NODE_ENV === 'development') {
					console.log(`[API Response] ${response.config.url}`, response.data);
				}
				return response;
			},
			(error: AxiosError) => {
				return this.handleError(error);
			}
		);
	}


	private handleError(error: AxiosError): never {
		if (error.response) {
			const apiError = error.response.data as ApiResponse<any>;
			const errorMessage = apiError?.Message || 'Error en la petición al servidor';

			console.error('[API Error]', {
				status: error.response.status,
				message: errorMessage,
				errors: apiError?.Errors,
				url: error.config?.url,
			});

			throw new Error(errorMessage);
		} else if (error.request) {
			console.error('[Network Error]', error.message);
			throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
		} else {
			console.error('[Request Setup Error]', error.message);
			throw new Error(error.message || 'Error desconocido');
		}
	}

	private buildQueryParams(filters?: PropertyFilters): string {
		if (!filters) return '';

		const params = new URLSearchParams();

		// filters of text
		if (filters.Name) params.append('Name', filters.Name);
		if (filters.Address) params.append('Address', filters.Address);
		if (filters.City) params.append('City', filters.City);
		if (filters.State) params.append('State', filters.State);

		// filters numbers
		if (filters.MinPrice !== undefined) params.append('MinPrice', filters.MinPrice.toString());
		if (filters.MaxPrice !== undefined) params.append('MaxPrice', filters.MaxPrice.toString());
		if (filters.Year !== undefined) params.append('Year', filters.Year.toString());

		// pagination
		params.append('PageNumber', (filters.PageNumber || 1).toString());
		params.append('PageSize', (filters.PageSize || 10).toString());

		// Order
		if (filters.SortBy) {
			params.append('SortBy', filters.SortBy);
			params.append('SortDescending', (filters.SortDescending || false).toString());
		}

		return params.toString();
	}


	async getAll(filters?: PropertyFilters): Promise<PropertyListResponse> {
		try {
			const queryString = this.buildQueryParams(filters);
			const url = queryString ? `/Properties?${queryString}` : '/Properties';

			const response = await this.api.get(url);

			// Validar respuesta con Zod
			const validatedData = PropertyListResponseSchema.parse(response.data);

			return validatedData;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error al obtener propiedades');
		}
	}


	async getById(id: string): Promise<PropertyDetailResponse> {
		try {
			const response = await this.api.get(`/Properties/${id}`);


			const validatedData = PropertyDetailResponseSchema.parse(response.data);

			if (!validatedData.Success || !validatedData.Data) {
				throw new Error(validatedData.Message || 'Propiedad no encontrada');
			}

			return validatedData;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error al obtener la propiedad');
		}
	}

	async create(property: CreatePropertyDto): Promise<PropertyDetailResponse> {
		try {
			const response = await this.api.post('/Properties', property);

			// Validar respuesta con Zod
			const validatedData = PropertyDetailResponseSchema.parse(response.data);

			return validatedData;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error al crear la propiedad');
		}
	}


	async update(
		id: string,
		property: Partial<CreatePropertyDto>
	): Promise<PropertyDetailResponse> {
		try {
			const response = await this.api.put(`/Properties/${id}`, property);


			const validatedData = PropertyDetailResponseSchema.parse(response.data);

			return validatedData;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error al actualizar la propiedad');
		}
	}

	async delete(id: string): Promise<ApiResponse<boolean>> {
		try {
			const response = await this.api.delete(`/Properties/${id}`);

			return {
				Success: true,
				Data: true,
				Message: 'Propiedad eliminada exitosamente',
				Errors: [],
				Timestamp: new Date().toISOString(),
			};
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error al eliminar la propiedad');
		}
	}


	async healthCheck(): Promise<boolean> {
		try {
			const healthUrl = this.baseURL.replace('/api/v1', '/health');
			await axios.get(healthUrl, { timeout: 3000 });
			return true;
		} catch (error) {
			console.error('[Health Check Failed]', error);
			return false;
		}
	}
}


export const createPropertyGateway = (): HttpPropertyGateway => {
	return new HttpPropertyGateway();
};