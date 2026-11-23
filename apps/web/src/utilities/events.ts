export function formatEventDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));
}

export function formatEventTimeRange(startsAt: string, endsAt: string) {
  const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${formatter.format(new Date(startsAt))} - ${formatter.format(new Date(endsAt))}`;
}

export function formatEventWindow(startsAt: string, endsAt: string) {
  return `${formatEventDate(startsAt)} - ${formatEventTimeRange(startsAt, endsAt)}`;
}
