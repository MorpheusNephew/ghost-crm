import { ArrowLeft, CalendarDays, MapPin, ShieldAlert } from 'lucide-react';
import { NavLink, Navigate, useParams } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGhost } from '@/hooks/use-ghosts';
import { formatEventDate, formatEventTimeRange } from '@/utilities';

export function GhostProfilePage() {
  const { ghostId } = useParams();
  const { ghost, isError, isLoading } = useGhost(ghostId);
  if (!ghostId || isError) return <Navigate to="/ghosts" replace />;
  if (isLoading || !ghost) {
    return (
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 text-sm text-muted-foreground">
        Loading ghost...
      </div>
    );
  }
  const availability =
    ghost.availability === 'needs_review'
      ? 'Needs coordinator review'
      : ghost.availability === 'assigned'
        ? 'Assigned to upcoming event'
        : 'Available for assignment';

  return (
    <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
      <Button
        asChild
        variant="ghost"
        className="-ml-2 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <NavLink to="/ghosts">
          <ArrowLeft />
          Back to ghosts
        </NavLink>
      </Button>
      <div className="mt-7 flex flex-wrap items-start justify-between gap-5">
        <div className="flex items-center gap-4">
          <span className="grid size-16 place-items-center rounded-full bg-violet-300 text-xl font-bold text-violet-950">
            {ghost.name.at(0)}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-semibold tracking-[-.055em] text-foreground">
                {ghost.name}
              </h1>
              <Badge className="border-0 bg-white/10 text-[9px] text-[#e3e1e8]">
                {ghost.lifecycle}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{ghost.description}</p>
          </div>
        </div>
      </div>
      <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatusCard
          label="LIFECYCLE"
          value={ghost.lifecycle}
          detail="Eligibility for new assignments"
        />
        <StatusCard
          label="THREAT LEVEL"
          value={ghost.threatLevel}
          detail="Audited when changed"
          tone="orange"
        />
        <StatusCard
          label="AVAILABILITY"
          value={availability}
          detail="Derived from assignments"
          tone="mint"
        />
        <StatusCard
          label="ASSIGNMENTS"
          value={ghost.availability}
          detail="Derived from the event roster"
        />
      </section>
      <section className="mt-7 grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="shadow-none">
          <CardHeader>
            <p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">
              UPCOMING ASSIGNMENT
            </p>
            <CardTitle className="mt-1 text-lg text-foreground">
              {ghost.upcomingAssignment?.eventTitle ?? 'No upcoming event'}
            </CardTitle>
          </CardHeader>
          <CardContent className="border-t border-white/10 pt-5">
            {ghost.upcomingAssignment ? (
              <div className="space-y-4">
                <p className="flex items-center gap-2 text-sm text-[#d5d4df]">
                  <CalendarDays className="size-4 text-[#b8ff70]" />
                  {formatEventDate(ghost.upcomingAssignment.startsAt)} -{' '}
                  {formatEventTimeRange(
                    ghost.upcomingAssignment.startsAt,
                    ghost.upcomingAssignment.endsAt,
                  )}
                </p>
                <p className="flex items-center gap-2 text-sm text-[#d5d4df]">
                  <MapPin className="size-4 text-[#b8ff70]" />
                  {ghost.upcomingAssignment.venue.name}
                </p>
                <p className="flex items-center gap-2 text-sm text-[#d5d4df]">
                  <ShieldAlert className="size-4 text-orange-300" />
                  No scheduling conflict detected
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-2 border-white/10 bg-white/[.045] text-[#d9d8e3] hover:bg-white/10 hover:text-white"
                >
                  <NavLink to={`/events/${ghost.upcomingAssignment.eventId}`}>
                    View event roster
                  </NavLink>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-[#a5a4b4]">
                This ghost has no upcoming assignment and is available for the next eligible event.
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader>
            <p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">
              OPEN OPERATIONAL CONCERNS
            </p>
            <CardTitle className="mt-1 text-lg text-foreground">Scheduling status</CardTitle>
          </CardHeader>
          <CardContent className="border-t border-white/10 pt-5">
            <p className="text-sm text-[#a5a4b4]">
              {ghost.availability === 'needs_review'
                ? 'This profile needs a coordinator review before it is scheduled.'
                : 'Availability is confirmed when creating a new event.'}
            </p>
            <Button
              variant="link"
              className="mt-4 h-auto p-0 text-xs text-[#b8ff70] hover:text-[#d3ffa9]"
            >
              View event roster -&gt;
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function StatusCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone?: 'mint' | 'orange';
}) {
  return (
    <Card className="py-5 shadow-none">
      <CardContent>
        <p className="text-[10px] font-bold tracking-[.1em] text-muted-foreground">{label}</p>
        <p className="mt-3 text-lg font-semibold tracking-[-.03em] text-foreground">{value}</p>
        <p
          className={`mt-2 text-[11px] ${tone === 'mint' ? 'text-primary' : tone === 'orange' ? 'text-orange-300' : 'text-muted-foreground'}`}
        >
          {detail}
        </p>
      </CardContent>
    </Card>
  );
}
