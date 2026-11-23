import { useQuery } from '@tanstack/react-query';
import { listVenuesOptions } from '@/api/generated/@tanstack/react-query.gen';

export function useVenues() {
  const query = useQuery(listVenuesOptions());

  return {
    venues: query.data?.venues ?? [],
    isError: query.isError,
    isLoading: query.isPending,
  };
}
