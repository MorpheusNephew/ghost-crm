import { describe, expect, it } from 'vitest';
import { formatEventDate, formatEventTimeRange, formatEventWindow } from '@/utilities';
const startsAt = '2026-10-31T19:00:00-04:00';
const endsAt = '2026-10-31T22:00:00-04:00';
describe('event formatters', () => {
  it('formats the date', () => expect(formatEventDate(startsAt)).toBe('Saturday, October 31'));
  it('formats the time range', () =>
    expect(formatEventTimeRange(startsAt, endsAt)).toBe('7:00 PM - 10:00 PM'));
  it('formats the complete event window', () =>
    expect(formatEventWindow(startsAt, endsAt)).toBe('Saturday, October 31 - 7:00 PM - 10:00 PM'));
});
