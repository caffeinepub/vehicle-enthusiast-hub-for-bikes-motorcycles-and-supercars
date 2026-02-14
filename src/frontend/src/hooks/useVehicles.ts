import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Vehicle } from '../backend';

export function useAllVehicles() {
  const { actor, isFetching } = useActor();

  return useQuery<Vehicle[]>({
    queryKey: ['vehicles', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVehicles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVehiclesByType(vehicleType: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Vehicle[]>({
    queryKey: ['vehicles', 'type', vehicleType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVehiclesByType(vehicleType);
    },
    enabled: !!actor && !isFetching,
  });
}
