import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useAllVehicles } from '../hooks/useVehicles';
import VehicleCard from '../components/VehicleCard';
import { LoadingGrid } from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function HomePage() {
  const { data: vehicles = [], isLoading, error, refetch } = useAllVehicles();

  const featuredVehicles = vehicles.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1920x800.png"
          alt="Vehicle Enthusiast Hub"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/50" />
        <div className="container relative h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your Ultimate Vehicle Hub
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore the world's most incredible bikes, motorcycles, and supercars. Curated for
              enthusiasts, by enthusiasts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/category/$type" params={{ type: 'Bike' }}>
                  Explore Bikes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/category/$type" params={{ type: 'Bike' }}>
            <Card className="group cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 flex items-center justify-center">
                  <img
                    src="/assets/generated/icon-bike.dim_256x256.png"
                    alt="Bikes"
                    className="h-full w-full object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <CardTitle>Bikes</CardTitle>
                <CardDescription>High-performance bicycles for speed and endurance</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/category/$type" params={{ type: 'Motorcycle' }}>
            <Card className="group cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 flex items-center justify-center">
                  <img
                    src="/assets/generated/icon-motorcycle.dim_256x256.png"
                    alt="Motorcycles"
                    className="h-full w-full object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <CardTitle>Motorcycles</CardTitle>
                <CardDescription>Powerful two-wheeled machines built for the road</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/category/$type" params={{ type: 'Car' }}>
            <Card className="group cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 flex items-center justify-center">
                  <img
                    src="/assets/generated/icon-supercar.dim_256x256.png"
                    alt="Supercars"
                    className="h-full w-full object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <CardTitle>Supercars</CardTitle>
                <CardDescription>The pinnacle of automotive engineering and design</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="container py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Vehicles</h2>
          {isLoading ? (
            <LoadingGrid />
          ) : error ? (
            <ErrorState message="Failed to load vehicles" onRetry={refetch} />
          ) : featuredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id.toString()} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No vehicles available yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
