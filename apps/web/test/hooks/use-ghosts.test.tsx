import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { useGhost, useGhosts } from '@/hooks/use-ghosts';
import { server } from '../mocks';
import { createQueryWrapper } from '../test-utils';

describe('ghost hooks', () => {
  it('loads ghost summaries through the generated client', async () => {
    const { result } = renderHook(() => useGhosts(), { wrapper: createQueryWrapper() });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.ghosts).toHaveLength(2));
    expect(result.current.ghosts[0]?.name).toBe('Lady Grey');
  });

  it('reports an API error', async () => {
    server.use(
      http.get('http://localhost/api/ghosts', () => new HttpResponse(null, { status: 500 })),
    );
    const { result } = renderHook(() => useGhosts(), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('loads a selected ghost and leaves an absent identifier disabled', async () => {
    const selected = renderHook(() => useGhost('lady-grey'), { wrapper: createQueryWrapper() });
    const absent = renderHook(() => useGhost(undefined), { wrapper: createQueryWrapper() });

    await waitFor(() => expect(selected.result.current.ghost?.availability).toBe('assigned'));
    expect(absent.result.current.ghost).toBeUndefined();
  });
});
