import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { useOverview } from '@/hooks/use-overview';
import { server } from '../mocks';
import { createQueryWrapper } from '../test-utils';

describe('overview hook', () => {
  it('loads the overview', async () => {
    const { result } = renderHook(() => useOverview(), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(result.current.overview?.metrics.attendanceDue).toBe(2));
  });

  it('reports an API error', async () => {
    server.use(
      http.get('http://localhost/api/overview', () => new HttpResponse(null, { status: 500 })),
    );
    const { result } = renderHook(() => useOverview(), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
