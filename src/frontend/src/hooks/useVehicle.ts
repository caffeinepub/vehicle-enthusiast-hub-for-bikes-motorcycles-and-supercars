import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Vehicle } from '../backend';

export function useVehicle(vehicleId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Vehicle>({
    queryKey: ['vehicle', vehicleId.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getVehicleById(vehicleId);
    },
    enabled: !!actor && !isFetching,
  });
}
