import { useQuery } from '@tanstack/react-query';
import { getEventOptions, listEventsOptions } from '@/api/generated/@tanstack/react-query.gen';

export function useEvents() {
  const query = useQuery(listEventsOptions());

  return {
    events: query.data?.events ?? [],
    isError: query.isError,
    isLoading: query.isPending,
  };
}

export function useEvent(eventId: string | undefined) {
  const query = useQuery({
    ...getEventOptions({ path: { eventId: eventId ?? '' } }),
    enabled: Boolean(eventId),
  });

  return {
    event: query.data?.event,
    isError: query.isError,
    isLoading: query.isPending,
  };
}
