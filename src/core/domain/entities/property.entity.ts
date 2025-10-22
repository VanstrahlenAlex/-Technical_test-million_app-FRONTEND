import { z } from 'zod';

export const PropertyEntitySchema = z.object({
	Id: z.string().min(1, 'ID is required'),
	IdOwner: z.string().min(1, 'Owner ID is required'),
	OwnerName: z.string().min(1, 'The owners name is required'),
	Name: z.string().min(1, 'The property name is required'),
	Address: z.string().min(1, 'The address is required'),
	Price: z.number().positive('The price must be positive'),
	Currency: z.string(),
	ImageUrl: z.string().url('Invalid image URL').optional().nullable(),
	City: z.string().min(1, 'The city is wanted'),
	State: z.string().min(1, 'The state/department is required'),
	Year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
});

export type PropertyEntity = z.infer<typeof PropertyEntitySchema>;

export const PagedResultSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
	z.object({
		Items: z.array(itemSchema),
		TotalCount: z.number().int().nonnegative(),
		PageNumber: z.number().int().positive(),
		PageSize: z.number().int().positive(),
		TotalPages: z.number().int().nonnegative(),
		HasPreviousPage: z.boolean(),
		HasNextPage: z.boolean(),
	});

export type PagedResult<T> = {
	Items: T[];
	TotalCount: number;
	PageNumber: number;
	PageSize: number;
	TotalPages: number;
	HasPreviousPage: boolean;
	HasNextPage: boolean;
};

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	z.object({
		Success: z.boolean(),
		Data: dataSchema,
		Message: z.string(),
		Errors: z.array(z.string()).default([]),
		Timestamp: z.string().datetime(),
	});

export type ApiResponse<T> = {
	Success: boolean;
	Data: T;
	Message: string;
	Errors: string[];
	Timestamp: string;
};

export const PropertyListResponseSchema = ApiResponseSchema(
	PagedResultSchema(PropertyEntitySchema)
);

export type PropertyListResponse = z.infer<typeof PropertyListResponseSchema>;

export const PropertyDetailResponseSchema = ApiResponseSchema(PropertyEntitySchema);

export type PropertyDetailResponse = z.infer<typeof PropertyDetailResponseSchema>;

export const PropertyFiltersSchema = z.object({
	Name: z.string().optional(),
	Address: z.string().optional(),
	City: z.string().optional(),
	State: z.string().optional(),
	MinPrice: z.number().nonnegative().optional(),
	MaxPrice: z.number().nonnegative().optional(),
	Year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
	PageNumber: z.number().int().positive().default(1),
	PageSize: z.number().int().positive().max(100).default(10),
	SortBy: z.enum(['Price', 'Year', 'Name', 'City']).optional(),
	SortDescending: z.boolean().default(false),
});

export type PropertyFilters = z.infer<typeof PropertyFiltersSchema>;

export const CreatePropertyDtoSchema = z.object({
	IdOwner: z.string().min(1, 'Owner ID is required'),
	OwnerName: z.string().min(2, 'The name must have at least 2 characters'),
	Name: z.string().min(3, 'The name must have at least 3 characters'),
	Address: z.string().min(5, 'The address must have at least 5 characters'),
	Price: z.number().positive('The price must be greater than 0'),
	Currency: z.string(),
	ImageUrl: z.string().url('Invalid URL').optional(),
	City: z.string().min(2, 'The city is wanted'),
	State: z.string().min(2, 'The state is required'),
	Year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
});

export type CreatePropertyDto = z.infer<typeof CreatePropertyDtoSchema>;

export class PropertyHelpers {

	static formatPrice(price: number, currency: string = 'USD'): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(price);
	}

	static getImageUrl(imageUrl?: string | null): string {
		if (!imageUrl) {
			return 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop';
		}
		return imageUrl;
	}
	
	static validateProperty(data: unknown): PropertyEntity {
		return PropertyEntitySchema.parse(data);
	}

	static validateProperties(data: unknown[]): PropertyEntity[] {
		return z.array(PropertyEntitySchema).parse(data);
	}


	static validatePropertyListResponse(data: unknown): PropertyListResponse {
		return PropertyListResponseSchema.parse(data);
	}
}