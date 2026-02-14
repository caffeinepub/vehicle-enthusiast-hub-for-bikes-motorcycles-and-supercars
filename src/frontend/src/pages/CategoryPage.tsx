import { useParams } from '@tanstack/react-router';
import { useVehiclesByType } from '../hooks/useVehicles';
import VehicleCard from '../components/VehicleCard';
import { LoadingGrid } from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { Card, CardContent } from '@/components/ui/card';
import { getCategoryLabel } from '../lib/vehicleTypes';

export default function CategoryPage() {
  const { type } = useParams({ from: '/category/$type' });
  const { data: vehicles = [], isLoading, error, refetch } = useVehiclesByType(type);

  const categoryLabel = getCategoryLabel(type);

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{categoryLabel}</h1>
        <p className="text-muted-foreground">
          Explore our curated collection of {categoryLabel.toLowerCase()}
        </p>
      </div>

      {isLoading ? (
        <LoadingGrid />
      ) : error ? (
        <ErrorState message="Failed to load vehicles" onRetry={refetch} />
      ) : vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id.toString()} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No {categoryLabel.toLowerCase()} available yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
