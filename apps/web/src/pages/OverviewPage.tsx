import { CalendarCheck, CalendarDays, Ghost, Sparkles, Users } from 'lucide-react';
import { NavLink } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const roster = [
  {
    name: 'Lady Grey',
    detail: "Raven's Hollow Estate - 7:00 PM",
    attendance: 'Pending',
    initial: 'L',
    color: 'bg-violet-300 text-violet-950',
  },
  {
    name: 'The Bellringer',
    detail: "Raven's Hollow Estate - 7:00 PM",
    attendance: 'Pending',
    initial: 'B',
    color: 'bg-orange-300 text-orange-950',
  },
  {
    name: 'Marlow',
    detail: "Raven's Hollow Estate - 7:00 PM",
    attendance: 'Attended',
    initial: 'M',
    color: 'bg-emerald-300 text-emerald-950',
  },
];

export function OverviewPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
      <div className="mb-9 flex items-center justify-between gap-5">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[.16em] text-muted-foreground">
            SATURDAY, OCTOBER 31
          </p>
          <h1 className="text-3xl font-semibold tracking-[-.055em] text-foreground sm:text-4xl">
            Raven's Hollow operations{' '}
            <Sparkles className="inline size-5 fill-primary text-primary" />
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Today's event roster, scheduling health, and attendance at a glance.
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
          value="3"
          detail="1 scheduled tonight"
          icon={CalendarDays}
        />
        <Metric label="GHOSTS SCHEDULED" value="8" detail="3 on tonight's roster" icon={Ghost} />
        <Metric
          label="ATTENDANCE DUE"
          value="2"
          detail="For tonight's event"
          icon={CalendarCheck}
          tone="orange"
        />
        <Metric label="SCHEDULING CONFLICTS" value="0" detail="No conflicts found" icon={Users} />
      </section>

      <section className="mt-7 grid gap-4 xl:grid-cols-[1.25fr_.9fr]">
        <Card className="shadow-none">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">
                NEXT EVENT
              </p>
              <CardTitle className="mt-1 text-lg text-foreground">
                Raven's Hollow Haunted Tour
              </CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                Tonight - 7:00 PM - 10:00 PM - Raven's Hollow Estate
              </p>
            </div>
            <Button asChild variant="link" className="h-auto p-0 text-xs">
              <NavLink to="/events">View events -&gt;</NavLink>
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="mb-2 flex items-center justify-between border-t border-border pt-3 text-[10px] font-bold tracking-[.12em] text-muted-foreground">
              <span>GHOST ROSTER</span>
              <span>3 TOTAL</span>
            </div>
            {roster.map((ghost) => (
              <div
                key={ghost.name}
                className="flex items-center gap-3 border-t border-border py-3.5"
              >
                <span
                  className={`grid size-8 place-items-center rounded-full text-xs font-bold ${ghost.color}`}
                >
                  {ghost.initial}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground">{ghost.name}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{ghost.detail}</p>
                </div>
                <Badge
                  className={`border-0 text-[9px] ${ghost.attendance === 'Attended' ? 'bg-emerald-300 text-emerald-950' : 'bg-violet-300 text-violet-950'}`}
                >
                  {ghost.attendance}
                </Badge>
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
  value: string;
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
