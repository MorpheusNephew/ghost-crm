import { describe, expect, it } from 'vitest';
import { listDemoVenues } from '../src/data/venues';

describe('demo venue service', () => {
  it('returns the available venues', () => {
    expect(listDemoVenues()).toHaveLength(2);
  });
});
