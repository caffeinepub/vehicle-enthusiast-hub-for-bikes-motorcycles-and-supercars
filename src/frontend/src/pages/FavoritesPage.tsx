import RequireAuth from '../components/RequireAuth';
import { useFavoriteVehicles } from '../hooks/useFavorites';
import VehicleCard from '../components/VehicleCard';
import { LoadingGrid } from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

function FavoritesContent() {
  const { data: vehicles = [], isLoading, error, refetch } = useFavoriteVehicles();

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <Heart className="h-8 w-8 text-destructive fill-destructive" />
          My Favorites
        </h1>
        <p className="text-muted-foreground">Your saved vehicles collection</p>
      </div>

      {isLoading ? (
        <LoadingGrid />
      ) : error ? (
        <ErrorState message="Failed to load favorites" onRetry={refetch} />
      ) : vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id.toString()} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center space-y-4">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
            <div>
              <p className="text-lg font-medium mb-2">No favorites yet</p>
              <p className="text-muted-foreground mb-4">
                Start exploring and save your favorite vehicles
              </p>
              <Button asChild>
                <Link to="/">Browse Vehicles</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <RequireAuth>
      <FavoritesContent />
    </RequireAuth>
  );
}
