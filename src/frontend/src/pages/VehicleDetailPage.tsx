import { useParams, Link } from '@tanstack/react-router';
import { useVehicle } from '../hooks/useVehicle';
import { LoadingDetail } from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FavoriteButton from '../components/FavoriteButton';
import { formatBigInt } from '../lib/formatters';

export default function VehicleDetailPage() {
  const { id } = useParams({ from: '/vehicle/$id' });
  const { data: vehicle, isLoading, error, refetch } = useVehicle(BigInt(id));

  if (isLoading) {
    return (
      <div className="container py-12">
        <LoadingDetail />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="container py-12">
        <ErrorState message="Vehicle not found" onRetry={refetch} />
      </div>
    );
  }

  const specs = vehicle.specs;
  const firstImage = vehicle.images[0] || '';

  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/category/$type" params={{ type: vehicle.vehicleType }}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {vehicle.vehicleType}s
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            {firstImage ? (
              <img
                src={firstImage}
                alt={`${vehicle.make} ${specs.model}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No Image Available
              </div>
            )}
          </div>
          {vehicle.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {vehicle.images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="aspect-video overflow-hidden rounded bg-muted">
                  <img src={img} alt={`View ${idx + 2}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-4xl font-bold">
                {vehicle.make} {specs.model}
              </h1>
              <Badge variant="secondary">{vehicle.vehicleType}</Badge>
            </div>
            <p className="text-xl text-muted-foreground">{formatBigInt(specs.year)}</p>
          </div>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Engine</p>
                  <p className="font-medium">{specs.engine}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Power</p>
                  <p className="font-medium">{formatBigInt(specs.power)} HP</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Top Speed</p>
                  <p className="font-medium">{formatBigInt(specs.topSpeed)} km/h</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">0-60 mph</p>
                  <p className="font-medium">{specs.acceleration}s</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{formatBigInt(specs.weight)} kg</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{formatBigInt(specs.year)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <FavoriteButton vehicleId={vehicle.id} />
        </div>
      </div>
    </div>
  );
}
