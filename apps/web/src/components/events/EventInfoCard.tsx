import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function EventInfoCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card className="py-5 shadow-none">
      <CardContent>
        <p className="flex items-center gap-2 text-[10px] font-bold tracking-[.1em] text-muted-foreground">
          <Icon className="size-3.5" /> {label}
        </p>
        <p className="mt-3 text-base font-semibold text-foreground">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}
