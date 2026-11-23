import { ArrowLeft, CalendarDays, Check, MapPin, Pencil, ShieldCheck, X } from 'lucide-react';
import { NavLink, Navigate, useParams } from 'react-router';
import { EventInfoCard } from '@/components/events/EventInfoCard';
import { EventRoster } from '@/components/events/EventRoster';
import { EventStatusBadge } from '@/components/events/EventStatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEvent } from '@/hooks/use-events';
import { formatEventDate, formatEventTimeRange } from '@/utilities';

export function EventDetailPage() {
  const { eventId } = useParams();
  const { event, isError, isLoading } = useEvent(eventId);

  if (!eventId || isError) return <Navigate to="/events" replace />;

  if (isLoading || !event) {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-11 text-sm text-muted-foreground">
        Loading event...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
      <Button asChild variant="ghost" className="-ml-2 text-muted-foreground">
        <NavLink to="/events">
          <ArrowLeft /> Back to events
        </NavLink>
      </Button>
      <div className="mt-7 flex flex-wrap items-start justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-[-.055em] text-foreground">
              {event.title}
            </h1>
            <EventStatusBadge status={event.status} />
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {event.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Pencil /> Edit event
          </Button>
          <Button variant="destructive">
            <X /> Cancel event
          </Button>
        </div>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <EventInfoCard
          icon={CalendarDays}
          label="WHEN"
          value={formatEventDate(event.startsAt)}
          detail={formatEventTimeRange(event.startsAt, event.endsAt)}
        />
        <EventInfoCard
          icon={MapPin}
          label="VENUE"
          value={event.venue.name}
          detail={event.venue.address}
        />
        <EventInfoCard
          icon={ShieldCheck}
          label="SCHEDULING"
          value="Conflict-free"
          detail="Ghost and venue availability confirmed"
        />
      </section>

      <section className="mt-7 grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
        <EventRoster
          roster={event.roster}
          venueName={event.venue.name}
          startsAt={event.startsAt}
          endsAt={event.endsAt}
        />
        <Card className="shadow-none">
          <CardHeader>
            <p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">
              COORDINATOR CHECKLIST
            </p>
            <CardTitle className="mt-1 text-lg text-foreground">Ready for tonight</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 border-t border-border pt-5 text-sm text-muted-foreground">
            <p>
              <Check className="mr-2 inline size-4 text-primary" /> Venue availability confirmed
            </p>
            <p>
              <Check className="mr-2 inline size-4 text-primary" /> All roster ghosts are
              conflict-free
            </p>
            <p>
              <Check className="mr-2 inline size-4 text-primary" /> Staff attendance is due after
              the event
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
