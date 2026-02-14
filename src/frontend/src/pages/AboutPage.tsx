import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { Bike, Zap, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">About VehicleHub</h1>
          <p className="text-xl text-muted-foreground">
            Your ultimate destination for bikes, motorcycles, and supercars
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            <p className="text-lg">
              VehicleHub is a curated platform for vehicle enthusiasts who appreciate the art,
              engineering, and performance of bikes, motorcycles, and supercars. Whether you're a
              casual admirer or a dedicated collector, we bring you the most exciting vehicles from
              around the world.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
              <div className="text-center space-y-2">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bike className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">Curated Collection</h3>
                <p className="text-sm text-muted-foreground">
                  Hand-picked vehicles showcasing the best in design and performance
                </p>
              </div>

              <div className="text-center space-y-2">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">Detailed Specs</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive specifications for every vehicle in our catalog
                </p>
              </div>

              <div className="text-center space-y-2">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">Personal Collection</h3>
                <p className="text-sm text-muted-foreground">
                  Save your favorites and build your dream garage
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We believe that vehicles are more than just transportation—they're expressions of
              innovation, craftsmanship, and passion. Our mission is to celebrate these incredible
              machines and connect enthusiasts from around the world.
            </p>
            <p>
              From high-performance bicycles to cutting-edge motorcycles and the world's most
              exclusive supercars, we showcase vehicles that push the boundaries of what's possible.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/">Start Exploring</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
