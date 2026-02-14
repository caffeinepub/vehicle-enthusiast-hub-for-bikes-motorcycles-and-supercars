import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';
import type { Vehicle } from '../backend';
import FavoriteButton from './FavoriteButton';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const firstImage = vehicle.images[0] || '';
  const specs = vehicle.specs;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
      <Link to="/vehicle/$id" params={{ id: vehicle.id.toString() }}>
        <div className="relative aspect-video overflow-hidden bg-muted">
          {firstImage ? (
            <img
              src={firstImage}
              alt={`${vehicle.make} ${specs.model}`}
              className="h-full w-full object-cover transition-transform group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur">
              {vehicle.vehicleType}
            </Badge>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to="/vehicle/$id" params={{ id: vehicle.id.toString() }}>
          <h3 className="font-bold text-lg mb-1 hover:text-primary transition-colors">
            {vehicle.make} {specs.model}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{specs.year}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">{Number(specs.power)} HP</Badge>
          <Badge variant="outline">{Number(specs.topSpeed)} km/h</Badge>
          <Badge variant="outline">{specs.acceleration}s 0-60</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <FavoriteButton vehicleId={vehicle.id} />
      </CardFooter>
    </Card>
  );
}
