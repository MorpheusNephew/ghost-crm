import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { useEvent, useEvents } from '@/hooks/use-events';
import { server } from '../mocks';
import { createQueryWrapper } from '../test-utils';
describe('event hooks', () => {
  it('fails while verifying the web CI check', () => {
    expect(true).toBe(false);
  });

  it('loads event summaries through the generated client', async () => {
    const { result } = renderHook(() => useEvents(), { wrapper: createQueryWrapper() });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.events).toHaveLength(1));
    expect(result.current.events[0]?.title).toBe("Raven's Hollow Haunted Tour");
  });
  it('reports an API error', async () => {
    server.use(
      http.get('http://localhost/api/events', () => new HttpResponse(null, { status: 500 })),
    );
    const { result } = renderHook(() => useEvents(), { wrapper: createQueryWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
  it('loads a selected event and leaves an absent identifier disabled', async () => {
    const selected = renderHook(() => useEvent('ravens-hollow-haunted-tour'), {
      wrapper: createQueryWrapper(),
    });
    const absent = renderHook(() => useEvent(undefined), { wrapper: createQueryWrapper() });
    await waitFor(() => expect(selected.result.current.event?.roster).toHaveLength(3));
    expect(absent.result.current.event).toBeUndefined();
  });
});
