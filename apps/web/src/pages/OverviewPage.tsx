import { CalendarDays, Ghost, Sparkles, Waypoints } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AppLayoutContext } from '@/layouts/AppLayout';

const roster = [
  {
    name: 'Lady Grey',
    detail: 'Grand Hall · 7:00 PM',
    status: 'Confirmed',
    color: 'bg-violet-300 text-violet-950',
    initial: 'L',
  },
  {
    name: 'The Bellringer',
    detail: 'Clock Tower · 7:30 PM',
    status: 'Confirmed',
    color: 'bg-orange-300 text-orange-950',
    initial: 'B',
  },
  {
    name: 'Marlow',
    detail: 'West Wing · 8:00 PM',
    status: 'Needs review',
    color: 'bg-emerald-300 text-emerald-950',
    initial: 'M',
  },
];

const sightings = [
  {
    ghost: 'The Watcher',
    note: 'Observed near the east gate',
    confidence: 'High confidence',
  },
  {
    ghost: 'Eleanor Vane',
    note: 'Reported by event staff',
    confidence: 'Medium confidence',
  },
  {
    ghost: 'The Bellringer',
    note: 'Audio evidence attached',
    confidence: 'High confidence',
  },
];

export function OverviewPage() {
  const navigate = useNavigate();
  const { notify } = useOutletContext<AppLayoutContext>();
  return (
    <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
      <div className="mb-9 flex items-center justify-between gap-5">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[.16em] text-muted-foreground">
            SATURDAY, OCTOBER 31
          </p>
          <h1 className="text-3xl font-semibold tracking-[-.055em] text-foreground sm:text-4xl">
            Raven's Hollow operations{' '}
            <Sparkles className="inline size-5 fill-[#b8ff70] text-[#b8ff70]" />
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Tonight's event roster and field activity at a glance.
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
        <Metric label="UPCOMING EVENTS" value="5" detail="2 this weekend" icon={CalendarDays} />
        <Metric label="GHOSTS ASSIGNED" value="18" detail="6 on tonight's tour" icon={Ghost} />
        <Metric label="NEW SIGHTINGS" value="12" detail="3 since last check" icon={Waypoints} />
        <Metric
          label="SCHEDULING CONFLICTS"
          value="2"
          detail="Need review"
          tone="orange"
          icon={CalendarDays}
        />
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
              <p className="mt-1 text-xs text-[#9495a6]">
                Tonight · 7:00 PM · Raven's Hollow Estate
              </p>
            </div>
            <Button
              variant="link"
              onClick={() => navigate('/events')}
              className="h-auto p-0 text-xs text-primary hover:text-primary/80"
            >
              View event →
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="mb-2 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-bold tracking-[.12em] text-[#848597]">
              <span>ASSIGNED GHOSTS</span>
              <span>6 TOTAL</span>
            </div>
            {roster.map((ghost) => (
              <div
                key={ghost.name}
                className="flex items-center gap-3 border-t border-white/10 py-3.5"
              >
                <span
                  className={`grid size-8 place-items-center rounded-full text-xs font-bold ${ghost.color}`}
                >
                  {ghost.initial}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#e9e6ed]">{ghost.name}</p>
                  <p className="mt-1 text-[10px] text-[#88899b]">{ghost.detail}</p>
                </div>
                <Badge
                  className={`border-0 text-[9px] ${ghost.status === 'Needs review' ? 'bg-orange-300 text-orange-950' : 'bg-emerald-300 text-emerald-950'}`}
                >
                  {ghost.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">
                RECENT SIGHTINGS
              </p>
              <CardTitle className="mt-1 text-lg text-foreground">Field reports</CardTitle>
            </div>
            <Button
              variant="link"
              onClick={() => navigate('/sightings')}
              className="h-auto p-0 text-xs text-primary hover:text-primary/80"
            >
              View sightings →
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            {sightings.map((sighting) => (
              <div key={sighting.ghost} className="border-t border-white/10 py-3.5">
                <p className="text-xs font-semibold text-[#e9e6ed]">{sighting.ghost}</p>
                <p className="mt-1 text-[10px] text-[#88899b]">{sighting.note}</p>
                <Badge className="mt-2 border-0 bg-violet-300 text-[9px] text-violet-950">
                  {sighting.confidence}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <Card className="mt-4 shadow-none">
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">
              ACTIVITY PREVIEW
            </p>
            <CardTitle className="mt-1 text-lg text-foreground">
              Recent operational changes
            </CardTitle>
          </div>
          <Button
            variant="link"
            onClick={() => notify('Full activity history would open here.')}
            className="h-auto p-0 text-xs text-primary hover:text-primary/80"
          >
            View timeline →
          </Button>
        </CardHeader>
        <CardContent className="grid gap-3 border-t border-white/10 pt-4 md:grid-cols-3">
          <p className="border-l-2 border-[#b8ff70]/65 pl-3 text-xs leading-5 text-[#b6b5c4]">
            Lady Grey was assigned to Raven's Hollow Tour.
          </p>
          <p className="border-l-2 border-[#b8ff70]/65 pl-3 text-xs leading-5 text-[#b6b5c4]">
            Marlow's threat level changed to moderate.
          </p>
          <p className="border-l-2 border-[#b8ff70]/65 pl-3 text-xs leading-5 text-[#b6b5c4]">
            A new sighting was recorded for The Watcher.
          </p>
        </CardContent>
      </Card>
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
          <Icon className="size-4 text-[#858698]" />
        </div>
        <p className="mt-3 text-2xl font-semibold tracking-[-.04em] text-foreground">{value}</p>
        <p className={`mt-2 text-[11px] ${tone === 'mint' ? 'text-primary' : 'text-orange-300'}`}>
          {tone === 'mint' ? '↗' : '✦'} {detail}
        </p>
      </CardContent>
    </Card>
  );
}
