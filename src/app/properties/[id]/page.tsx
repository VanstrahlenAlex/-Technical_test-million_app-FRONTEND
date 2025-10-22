'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePropertyDetail } from '@/app/_components/hooks/useProperties';
import { PropertyHelpers } from '@/core/domain/entities/property.entity';
import { MapPin, DollarSign, User, Calendar, ArrowLeft, Building2, MapPinned } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: property, isLoading, isError, error } = usePropertyDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Skeleton className="h-10 w-32 mb-6" />
          <div className="space-y-6">
            <Skeleton className="h-96 w-full rounded-xl" />
            <Skeleton className="h-12 w-3/4" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Error al cargar la propiedad</AlertTitle>
              <AlertDescription>
                {error instanceof Error ? error.message : 'Propiedad no encontrada'}
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => router.push('/properties')} 
              variant="outline"
              className="w-full mt-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a propiedades
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const imageUrl = PropertyHelpers.getImageUrl(property.ImageUrl);
  const formattedPrice = PropertyHelpers.formatPrice(property.Price, property.Currency);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-15">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        <Button 
          onClick={() => router.back()} 
          variant="outline"
          size="lg"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>


        <Card className="overflow-hidden mb-6">
          <div className="relative h-96 md:h-[500px] w-full bg-gray-200 dark:bg-gray-700">
            <Image
              src={imageUrl}
              alt={property.Name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            

            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-blue-600 text-white">
                <Building2 className="w-3 h-3 mr-1" />
                {property.City}
              </Badge>
              <Badge variant="secondary" className="bg-white/90">
                <Calendar className="w-3 h-3 mr-1" />
                {property.Year}
              </Badge>
            </div>
          </div>
        </Card>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Columna Principal */}
          <div className="lg:col-span-2 space-y-6">

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                  {property.Name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600" />
                  <p className="text-lg">{property.Address}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPinned className="w-4 h-4" />
                    <span>{property.State}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Año {property.Year}</span>
                  </div>
                </div>
              </CardContent>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información del Propietario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Nombre:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {property.OwnerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">ID:</span>
                    <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                      {property.IdOwner}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>


          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Precio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {formattedPrice}
                  </p>
                  <Badge variant="outline">{property.Currency}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">ID Propiedad:</span>
                    <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
                      {property.Id}
                    </span>
                  </div>
                </div>


                <Button className="w-full" size="lg">
                  Contactar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}