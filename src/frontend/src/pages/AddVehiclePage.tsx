import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Plus, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useActor } from '../hooks/useActor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import type { Specs } from '../backend';

export default function AddVehiclePage() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  const [formData, setFormData] = useState({
    vehicleType: '',
    make: '',
    model: '',
    year: '',
    engine: '',
    power: '',
    topSpeed: '',
    acceleration: '',
    weight: '',
    price: '',
    images: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
    if (!formData.make.trim()) newErrors.make = 'Make is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year.trim()) newErrors.year = 'Year is required';
    else if (isNaN(Number(formData.year)) || Number(formData.year) < 1900 || Number(formData.year) > 2100) {
      newErrors.year = 'Year must be a valid number between 1900 and 2100';
    }
    if (!formData.engine.trim()) newErrors.engine = 'Engine is required';
    if (!formData.power.trim()) newErrors.power = 'Power is required';
    else if (isNaN(Number(formData.power)) || Number(formData.power) <= 0) {
      newErrors.power = 'Power must be a positive number';
    }
    if (!formData.topSpeed.trim()) newErrors.topSpeed = 'Top speed is required';
    else if (isNaN(Number(formData.topSpeed)) || Number(formData.topSpeed) <= 0) {
      newErrors.topSpeed = 'Top speed must be a positive number';
    }
    if (!formData.acceleration.trim()) newErrors.acceleration = 'Acceleration is required';
    else if (isNaN(Number(formData.acceleration)) || Number(formData.acceleration) <= 0) {
      newErrors.acceleration = 'Acceleration must be a positive number';
    }
    if (!formData.weight.trim()) newErrors.weight = 'Weight is required';
    else if (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      newErrors.weight = 'Weight must be a positive number';
    }
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    else if (isNaN(Number(formData.price))) {
      newErrors.price = 'Price must be a valid number';
    }
    if (!formData.images.trim()) newErrors.images = 'At least one image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !actor) return;

    setIsSubmitting(true);

    try {
      const specs: Specs = {
        model: formData.model.trim(),
        year: BigInt(formData.year),
        engine: formData.engine.trim(),
        power: BigInt(formData.power),
        topSpeed: BigInt(formData.topSpeed),
        acceleration: parseFloat(formData.acceleration),
        weight: BigInt(formData.weight),
      };

      const imageUrls = formData.images
        .split('\n')
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      const vehicleId = await actor.addVehicle(
        formData.vehicleType,
        formData.make.trim(),
        specs,
        BigInt(formData.price),
        imageUrls
      );

      // Invalidate all vehicle queries to refresh lists
      await queryClient.invalidateQueries({ queryKey: ['vehicles'] });

      toast.success('Vehicle added successfully!');

      // Navigate to the newly created vehicle detail page
      navigate({ to: '/vehicle/$id', params: { id: vehicleId.toString() } });
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast.error('Failed to add vehicle. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeedVehicles = async () => {
    if (!actor) return;

    setIsSeeding(true);

    try {
      const sampleVehicles = [
        {
          vehicleType: 'Bike',
          make: 'Trek',
          specs: {
            model: 'Domane SL 7',
            year: BigInt(2024),
            engine: 'Human Power',
            power: BigInt(250),
            topSpeed: BigInt(45),
            acceleration: 8.5,
            weight: BigInt(8),
          },
          price: BigInt(7500),
          images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800'],
        },
        {
          vehicleType: 'Motorcycle',
          make: 'Ducati',
          specs: {
            model: 'Panigale V4',
            year: BigInt(2024),
            engine: '1103cc V4',
            power: BigInt(214),
            topSpeed: BigInt(299),
            acceleration: 2.8,
            weight: BigInt(198),
          },
          price: BigInt(28000),
          images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'],
        },
        {
          vehicleType: 'Car',
          make: 'Ferrari',
          specs: {
            model: 'SF90 Stradale',
            year: BigInt(2024),
            engine: '4.0L V8 Hybrid',
            power: BigInt(986),
            topSpeed: BigInt(340),
            acceleration: 2.5,
            weight: BigInt(1570),
          },
          price: BigInt(625000),
          images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'],
        },
        {
          vehicleType: 'Bike',
          make: 'Specialized',
          specs: {
            model: 'S-Works Tarmac SL8',
            year: BigInt(2024),
            engine: 'Human Power',
            power: BigInt(300),
            topSpeed: BigInt(50),
            acceleration: 7.2,
            weight: BigInt(6),
          },
          price: BigInt(13000),
          images: ['https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800'],
        },
        {
          vehicleType: 'Motorcycle',
          make: 'Kawasaki',
          specs: {
            model: 'Ninja H2R',
            year: BigInt(2024),
            engine: '998cc Inline-4',
            power: BigInt(310),
            topSpeed: BigInt(400),
            acceleration: 2.5,
            weight: BigInt(216),
          },
          price: BigInt(55000),
          images: ['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800'],
        },
        {
          vehicleType: 'Car',
          make: 'Lamborghini',
          specs: {
            model: 'Revuelto',
            year: BigInt(2024),
            engine: '6.5L V12 Hybrid',
            power: BigInt(1001),
            topSpeed: BigInt(350),
            acceleration: 2.5,
            weight: BigInt(1772),
          },
          price: BigInt(608000),
          images: ['https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800'],
        },
      ];

      for (const vehicle of sampleVehicles) {
        await actor.addVehicle(
          vehicle.vehicleType,
          vehicle.make,
          vehicle.specs,
          vehicle.price,
          vehicle.images
        );
      }

      // Invalidate all vehicle queries to refresh lists
      await queryClient.invalidateQueries({ queryKey: ['vehicles'] });

      toast.success(`Successfully seeded ${sampleVehicles.length} sample vehicles!`);
    } catch (error) {
      console.error('Error seeding vehicles:', error);
      toast.error('Failed to seed vehicles. Please try again.');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Add Vehicle</h1>
        <p className="text-muted-foreground">
          Add a new bike, motorcycle, or supercar to the catalog
        </p>
      </div>

      <div className="mb-6">
        <Button
          onClick={handleSeedVehicles}
          disabled={isSeeding || !actor}
          variant="outline"
          className="w-full sm:w-auto"
        >
          {isSeeding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Seeding vehicles...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Seed Sample Vehicles
            </>
          )}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Quickly add sample vehicles across all categories to get started
        </p>
      </div>

      <Separator className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Details</CardTitle>
          <CardDescription>
            Fill in all required fields to add a new vehicle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">
                Vehicle Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.vehicleType}
                onValueChange={(value) => handleInputChange('vehicleType', value)}
              >
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bike">Bike</SelectItem>
                  <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="Car">Supercar</SelectItem>
                </SelectContent>
              </Select>
              {errors.vehicleType && (
                <p className="text-sm text-destructive">{errors.vehicleType}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="make">
                  Make <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => handleInputChange('make', e.target.value)}
                  placeholder="e.g., Ferrari, Ducati, Trek"
                />
                {errors.make && <p className="text-sm text-destructive">{errors.make}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">
                  Model <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="e.g., SF90 Stradale"
                />
                {errors.model && <p className="text-sm text-destructive">{errors.model}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="year">
                  Year <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  placeholder="e.g., 2024"
                />
                {errors.year && <p className="text-sm text-destructive">{errors.year}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="engine">
                  Engine <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="engine"
                  value={formData.engine}
                  onChange={(e) => handleInputChange('engine', e.target.value)}
                  placeholder="e.g., 4.0L V8 Hybrid"
                />
                {errors.engine && <p className="text-sm text-destructive">{errors.engine}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="power">
                  Power (HP) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="power"
                  type="number"
                  value={formData.power}
                  onChange={(e) => handleInputChange('power', e.target.value)}
                  placeholder="e.g., 986"
                />
                {errors.power && <p className="text-sm text-destructive">{errors.power}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="topSpeed">
                  Top Speed (km/h) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="topSpeed"
                  type="number"
                  value={formData.topSpeed}
                  onChange={(e) => handleInputChange('topSpeed', e.target.value)}
                  placeholder="e.g., 340"
                />
                {errors.topSpeed && (
                  <p className="text-sm text-destructive">{errors.topSpeed}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="acceleration">
                  0-60 mph (sec) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="acceleration"
                  type="number"
                  step="0.1"
                  value={formData.acceleration}
                  onChange={(e) => handleInputChange('acceleration', e.target.value)}
                  placeholder="e.g., 2.5"
                />
                {errors.acceleration && (
                  <p className="text-sm text-destructive">{errors.acceleration}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="weight">
                  Weight (kg) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="e.g., 1570"
                />
                {errors.weight && <p className="text-sm text-destructive">{errors.weight}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  Price (USD) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="e.g., 625000"
                />
                {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">
                Image URLs <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="images"
                value={formData.images}
                onChange={(e) => handleInputChange('images', e.target.value)}
                placeholder="Enter one or more image URLs (one per line)"
                rows={4}
              />
              <p className="text-sm text-muted-foreground">
                Enter one URL per line. First image will be the primary image.
              </p>
              {errors.images && <p className="text-sm text-destructive">{errors.images}</p>}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting || !actor} className="flex-1">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding vehicle...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Vehicle
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: '/' })}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
