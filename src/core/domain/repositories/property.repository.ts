
import {
	PropertyEntity,
	PropertyFilters,
	PropertyListResponse,
	PropertyDetailResponse,
	CreatePropertyDto,
	ApiResponse
} from '../entities/property.entity';


export interface IPropertyRepository {

	getAll(filters?: PropertyFilters): Promise<PropertyListResponse>;
	getById(id: string): Promise<PropertyDetailResponse>;
	create(property: CreatePropertyDto): Promise<PropertyDetailResponse>;
	update(id: string, property: Partial<CreatePropertyDto>): Promise<PropertyDetailResponse>;
	delete(id: string): Promise<ApiResponse<boolean>>;
	healthCheck(): Promise<boolean>;
}