import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { useVenues } from '@/hooks/use-venues';
import { server } from '../mocks';
import { createQueryWrapper } from '../test-utils';

describe('venue hook', () => {
  it('loads venues', async () => {
    const { result } = renderHook(() => useVenues(), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(result.current.venues).toHaveLength(2));
  });

  it('reports an API error', async () => {
    server.use(
      http.get('http://localhost/api/venues', () => new HttpResponse(null, { status: 500 })),
    );
    const { result } = renderHook(() => useVenues(), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
