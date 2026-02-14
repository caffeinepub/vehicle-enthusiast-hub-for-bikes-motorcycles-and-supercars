import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useFavorites, useToggleFavorite, useIsFavorite } from '../hooks/useFavorites';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  vehicleId: bigint;
}

export default function FavoriteButton({ vehicleId }: FavoriteButtonProps) {
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  
  const { data: isFavorite = false } = useIsFavorite(vehicleId);
  const toggleFavorite = useToggleFavorite();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.info('Please sign in to save favorites');
      login();
      return;
    }

    toggleFavorite.mutate(vehicleId, {
      onSuccess: (isNowFavorite) => {
        toast.success(isNowFavorite ? 'Added to favorites' : 'Removed from favorites');
      },
      onError: () => {
        toast.error('Failed to update favorite');
      },
    });
  };

  return (
    <Button
      variant={isFavorite ? 'default' : 'outline'}
      size="sm"
      onClick={handleToggle}
      disabled={toggleFavorite.isPending}
      className="gap-2 w-full"
    >
      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
      {isFavorite ? 'Favorited' : 'Add to Favorites'}
    </Button>
  );
}
