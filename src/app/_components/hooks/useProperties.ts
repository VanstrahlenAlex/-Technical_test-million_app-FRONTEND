
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PropertyFilters, CreatePropertyDto } from '@/core/domain/entities/property.entity';
import { HttpPropertyGateway } from '@/core/infrastructure/gateways/http-property.gateway';
import {
	GetPropertiesUseCase,
	GetPropertyDetailUseCase,
	CreatePropertyUseCase,
	UpdatePropertyUseCase,
	DeletePropertyUseCase,
} from '@/core/application/useCases/get-properties.usecase';
import { toast } from 'sonner';


const propertyGateway = new HttpPropertyGateway();


const getPropertiesUseCase = new GetPropertiesUseCase(propertyGateway);
const getPropertyDetailUseCase = new GetPropertyDetailUseCase(propertyGateway);
const createPropertyUseCase = new CreatePropertyUseCase(propertyGateway);
const updatePropertyUseCase = new UpdatePropertyUseCase(propertyGateway);
const deletePropertyUseCase = new DeletePropertyUseCase(propertyGateway);

// ===== QUERY KEYS =====
export const propertyKeys = {
	all: ['properties'] as const,
	lists: () => [...propertyKeys.all, 'list'] as const,
	list: (filters?: PropertyFilters) => [...propertyKeys.lists(), filters] as const,
	details: () => [...propertyKeys.all, 'detail'] as const,
	detail: (id: string) => [...propertyKeys.details(), id] as const,
};

// ===== HOOKS =====


export function useProperties(filters?: PropertyFilters) {
	return useQuery({
		queryKey: propertyKeys.list(filters),
		queryFn: async () => {
			const response = await getPropertiesUseCase.execute(filters);
			return response.Data; 
		},
		staleTime: 1000 * 60 * 5, 
		gcTime: 1000 * 60 * 30, 
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
	});
}


export function usePropertyDetail(id: string, enabled = true) {
	return useQuery({
		queryKey: propertyKeys.detail(id),
		queryFn: () => getPropertyDetailUseCase.execute(id),
		enabled: enabled && !!id && id.length > 0,
		staleTime: 1000 * 60 * 10, // 10 minutos
		retry: 1,
	});
}


export function useCreateProperty() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (property: CreatePropertyDto) =>
			createPropertyUseCase.execute(property),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
			toast.success('✅ Propiedad creada exitosamente', {
				description: data.Name,
			});
		},
		onError: (error: Error) => {
			toast.error('❌ Error al crear propiedad', {
				description: error.message,
			});
		},
	});
}


export function useUpdateProperty() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<CreatePropertyDto> }) =>
			updatePropertyUseCase.execute(id, data),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
			queryClient.invalidateQueries({ queryKey: propertyKeys.detail(variables.id) });
			toast.success('✅ Propiedad actualizada', {
				description: data.Name,
			});
		},
		onError: (error: Error) => {
			toast.error('❌ Error al actualizar', {
				description: error.message,
			});
		},
	});
}


export function useDeleteProperty() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deletePropertyUseCase.execute(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
			toast.success('✅ Propiedad eliminada');
		},
		onError: (error: Error) => {
			toast.error('❌ Error al eliminar', {
				description: error.message,
			});
		},
	});
}


export function useApiHealth() {
	return useQuery({
		queryKey: ['api-health'],
		queryFn: () => propertyGateway.healthCheck(),
		staleTime: 1000 * 30, // 30 segundos
		gcTime: 1000 * 60, // 1 minuto
		retry: 3,
		retryDelay: 1000,
	});
}