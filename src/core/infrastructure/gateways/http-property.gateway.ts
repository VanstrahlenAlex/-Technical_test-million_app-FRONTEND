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
					console.log(`[API Response Success] ${response.status} ${response.config.url}`, response.data);
				}
				return response;
			},
			(error: AxiosError) => {
				console.error('[API Response Error Interceptor]', {
					url: error.config?.url,
					method: error.config?.method,
					status: error.response?.status,
					statusText: error.response?.statusText,
					data: error.response?.data,
					headers: error.response?.headers,
				});
				return Promise.reject(error);
			}
		);
	}



	private handleError(error: AxiosError): never {
		if (error.response) {
			const responseData = error.response.data as any;

			console.error('[API Error Full Response]', {
				status: error.response.status,
				statusText: error.response.statusText,
				data: responseData,
				url: error.config?.url,
				method: error.config?.method,
			});

			let errorMessage = 'Error en la petición al servidor';
			let errorDetails: string[] = [];


			if (responseData) {
				if (responseData.Message) {
					errorMessage = responseData.Message;
				} else if (responseData.message) {
					errorMessage = responseData.message;
				} else if (typeof responseData === 'string') {
					errorMessage = responseData;
				} else if (Array.isArray(responseData.errors)) {
					errorDetails = responseData.errors.filter((err: any) => typeof err === 'string');
					errorMessage = errorDetails.length > 0 ? 'Errores de validación' : errorMessage;
				} else if (responseData.errors && typeof responseData.errors === 'object') {
					try {
						errorDetails = Object.values(responseData.errors)
							.flat()
							.filter((err: any) => typeof err === 'string') as string[];
						errorMessage = errorDetails.length > 0 ? 'Errores de validación' : errorMessage;
					} catch (e) {
						console.warn('[API Error] No se pudieron extraer detalles del error:', e);
					}
				} else if (responseData.title) {
					errorMessage = responseData.title;
					if (responseData.detail) {
						errorDetails = [responseData.detail];
					}
				}
			}

			if (errorMessage === 'Error en la petición al servidor' && error.response.status) {
				errorMessage = `Error ${error.response.status}: ${error.response.statusText || 'Error del servidor'}`;
			}

			const finalMessage = errorDetails.length > 0
				? `${errorMessage}: ${errorDetails.join(', ')}`
				: errorMessage;

			throw new Error(finalMessage);

		} else if (error.request) {
			console.error('[Network Error]', {
				message: error.message,
				request: error.request
			});
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

			const validatedData = PropertyListResponseSchema.parse(response.data);

			return validatedData;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error getting properties');
		}
	}


	async getById(id: string): Promise<PropertyDetailResponse> {
		try {
			const response = await this.api.get(`/Properties/${id}`);


			const validatedData = PropertyDetailResponseSchema.parse(response.data);

			if (!validatedData.Success || !validatedData.Data) {
				throw new Error(validatedData.Message || 'Property not found');
			}

			return validatedData;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error getting property');
		}
	}

	async create(property: CreatePropertyDto): Promise<PropertyDetailResponse> {
		try {
			const response = await this.api.post('/Properties', property);

			const validatedData = PropertyDetailResponseSchema.parse(response.data);

			return validatedData;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error creating property');
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
			throw new Error('Error updating property');
		}
	}

	async delete(id: string): Promise<ApiResponse<boolean>> {
		try {
			const response = await this.api.delete(`/Properties/${id}`);

			return {
				Success: true,
				Data: true,
				Message: 'Property successfully deleted',
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