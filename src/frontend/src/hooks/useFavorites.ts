import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { Vehicle } from '../backend';

export function useFavorites() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  return useQuery<bigint[]>({
    queryKey: ['favorites', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getUserFavorites(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useIsFavorite(vehicleId: bigint) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  return useQuery<boolean>({
    queryKey: ['favorite', vehicleId.toString(), identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isFavorite(vehicleId);
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useToggleFavorite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();

  return useMutation({
    mutationFn: async (vehicleId: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.toggleFavorite(vehicleId);
    },
    onSuccess: (_, vehicleId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favorite', vehicleId.toString()] });
    },
  });
}

export function useFavoriteVehicles() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const { data: favoriteIds = [] } = useFavorites();

  return useQuery<Vehicle[]>({
    queryKey: ['favoriteVehicles', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || favoriteIds.length === 0) return [];
      
      const vehicles = await Promise.all(
        favoriteIds.map((id) => actor.getVehicleById(id))
      );
      
      return vehicles;
    },
    enabled: !!actor && !isFetching && favoriteIds.length > 0,
  });
}
