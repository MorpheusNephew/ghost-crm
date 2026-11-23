import { describe, expect, it } from 'vitest';
import { listDemoGhosts } from '../src/data/ghosts';

describe('demo ghost service', () => {
  it('returns valid ghost summaries', () => {
    expect(listDemoGhosts()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'lady-grey',
          lifecycle: 'active',
          threatLevel: 'low',
        }),
      ]),
    );
  });
});
