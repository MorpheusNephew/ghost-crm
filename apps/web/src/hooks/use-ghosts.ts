import { useQuery } from '@tanstack/react-query';
import { listGhostsOptions } from '@/api/generated/@tanstack/react-query.gen';

export function useGhosts() {
  const query = useQuery(listGhostsOptions());

  return {
    ghosts: query.data?.ghosts ?? [],
    isError: query.isError,
    isLoading: query.isPending,
  };
}
