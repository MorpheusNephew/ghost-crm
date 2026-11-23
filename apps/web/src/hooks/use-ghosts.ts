import { useQuery } from '@tanstack/react-query';
import { getGhostOptions, listGhostsOptions } from '@/api/generated/@tanstack/react-query.gen';

export function useGhosts() {
  const query = useQuery(listGhostsOptions());

  return {
    ghosts: query.data?.ghosts ?? [],
    isError: query.isError,
    isLoading: query.isPending,
  };
}

export function useGhost(ghostId: string | undefined) {
  const query = useQuery({
    ...getGhostOptions({ path: { ghostId: ghostId ?? '' } }),
    enabled: Boolean(ghostId),
  });

  return {
    ghost: query.data?.ghost,
    isError: query.isError,
    isLoading: query.isPending,
  };
}
