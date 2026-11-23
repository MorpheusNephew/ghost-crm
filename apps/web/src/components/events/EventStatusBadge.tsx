import { Badge } from '@/components/ui/badge';

type EventStatus = 'draft' | 'scheduled' | 'cancelled';

export function EventStatusBadge({ status }: { status: EventStatus }) {
  const style =
    status === 'scheduled'
      ? 'bg-emerald-300 text-emerald-950'
      : status === 'draft'
        ? 'bg-violet-300 text-violet-950'
        : 'bg-red-300 text-red-950';

  return <Badge className={`border-0 text-[9px] ${style}`}>{status}</Badge>;
}
