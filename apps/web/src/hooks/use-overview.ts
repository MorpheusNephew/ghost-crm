import { useQuery } from '@tanstack/react-query';
import { getOverviewOptions } from '@/api/generated/@tanstack/react-query.gen';

export function useOverview() {
  const query = useQuery(getOverviewOptions());

  return {
    overview: query.data,
    isError: query.isError,
    isLoading: query.isPending,
  };
}
