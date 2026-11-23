import { CalendarCheck, CalendarDays, Ghost, Sparkles, Users } from 'lucide-react';
import { NavLink } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOverview } from '@/hooks/use-overview';
import { formatEventDate, formatEventTimeRange } from '@/utilities';

export function OverviewPage() {
  const { overview, isError, isLoading } = useOverview();

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 text-sm text-destructive">
        Unable to load overview.
      </div>
    );
  }
  if (isLoading || !overview) {
    return (
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 text-sm text-muted-foreground">
        Loading overview...
      </div>
    );
  }

  const { metrics, nextEvent } = overview;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
      <div className="mb-9 flex items-center justify-between gap-5">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[.16em] text-muted-foreground">
            {formatEventDate(nextEvent.startsAt)}
          </p>
          <h1 className="text-3xl font-semibold tracking-[-.055em] text-foreground sm:text-4xl">
            Raven's Hollow operations{' '}
            <Sparkles className="inline size-5 fill-primary text-primary" />
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Upcoming event, scheduling health, and attendance at a glance.
          </p>
        </div>
        <div className="grid size-16 shrink-0 place-items-center rounded-[45%_45%_42%_42%] bg-[radial-gradient(circle_at_35%_28%,#ebffd9,#b8ff70_58%,#719b4f)] text-[#243220] shadow-[0_0_45px_rgba(184,255,112,.18)]">
          <Ghost className="size-8" />
        </div>
      </div>
      <section
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Operational summary"
      >
        <Metric
          label="UPCOMING EVENTS"
          value={metrics.upcomingEvents}
          detail="Across the current program"
          icon={CalendarDays}
        />
        <Metric
          label="GHOSTS SCHEDULED"
          value={metrics.scheduledGhosts}
          detail="On the next roster"
          icon={Ghost}
        />
        <Metric
          label="ATTENDANCE DUE"
          value={metrics.attendanceDue}
          detail="For the next event"
          icon={CalendarCheck}
          tone="orange"
        />
        <Metric
          label="SCHEDULING CONFLICTS"
          value={metrics.schedulingConflicts}
          detail="No conflicts found"
          icon={Users}
        />
      </section>
      <section className="mt-7 grid gap-4 xl:grid-cols-[1.25fr_.9fr]">
        <Card className="shadow-none">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">
                NEXT EVENT
              </p>
              <CardTitle className="mt-1 text-lg text-foreground">{nextEvent.title}</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatEventDate(nextEvent.startsAt)} -{' '}
                {formatEventTimeRange(nextEvent.startsAt, nextEvent.endsAt)} -{' '}
                {nextEvent.venue.name}
              </p>
            </div>
            <Button asChild variant="link" className="h-auto p-0 text-xs">
              <NavLink to={`/events/${nextEvent.id}`}>View event -&gt;</NavLink>
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="mb-2 flex items-center justify-between border-t border-border pt-3 text-[10px] font-bold tracking-[.12em] text-muted-foreground">
              <span>GHOST ROSTER</span>
              <span>{nextEvent.roster.length} TOTAL</span>
            </div>
            {nextEvent.roster.map((ghost, index) => (
              <div key={ghost.id} className="flex items-center gap-3 border-t border-border py-3.5">
                <span
                  className={`grid size-8 place-items-center rounded-full text-xs font-bold ${avatarTone(index)}`}
                >
                  {ghost.name.at(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground">{ghost.name}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {nextEvent.venue.name} -{' '}
                    {formatEventTimeRange(nextEvent.startsAt, nextEvent.endsAt)}
                  </p>
                </div>
                <AttendanceBadge attendance={ghost.attendance} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader>
            <p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">
              SCHEDULING CHECK
            </p>
            <CardTitle className="mt-1 text-lg text-foreground">Ready to schedule</CardTitle>
          </CardHeader>
          <CardContent className="border-t border-border pt-5">
            <p className="text-sm leading-6 text-muted-foreground">
              New events remain drafts until their selected ghosts and venue have no overlapping
              scheduled event.
            </p>
            <Button asChild className="mt-5">
              <NavLink to="/events/new">Create event</NavLink>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  detail,
  tone = 'mint',
  icon: Icon,
}: {
  label: string;
  value: number;
  detail: string;
  tone?: 'mint' | 'orange';
  icon: typeof Ghost;
}) {
  return (
    <Card className="py-5 shadow-none">
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-[.1em] text-muted-foreground">{label}</p>
          <Icon className="size-4 text-muted-foreground" />
        </div>
        <p className="mt-3 text-2xl font-semibold tracking-[-.04em] text-foreground">{value}</p>
        <p className={`mt-2 text-[11px] ${tone === 'mint' ? 'text-primary' : 'text-orange-300'}`}>
          {tone === 'mint' ? '+' : '*'} {detail}
        </p>
      </CardContent>
    </Card>
  );
}

function AttendanceBadge({ attendance }: { attendance: 'pending' | 'attended' | 'no_show' }) {
  const label =
    attendance === 'no_show' ? 'No-show' : attendance === 'attended' ? 'Attended' : 'Pending';
  const colors =
    attendance === 'attended'
      ? 'bg-emerald-300 text-emerald-950'
      : attendance === 'no_show'
        ? 'bg-red-300 text-red-950'
        : 'bg-violet-300 text-violet-950';
  return <Badge className={`border-0 text-[9px] ${colors}`}>{label}</Badge>;
}

function avatarTone(index: number) {
  const tones = [
    'bg-violet-300 text-violet-950',
    'bg-orange-300 text-orange-950',
    'bg-emerald-300 text-emerald-950',
    'bg-sky-300 text-sky-950',
  ];
  return tones[index % tones.length];
}
