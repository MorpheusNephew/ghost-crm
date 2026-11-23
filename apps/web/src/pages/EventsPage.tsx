import { CalendarDays, MapPin, Plus, Users } from 'lucide-react';
import { NavLink } from 'react-router';
import { EventStatusBadge } from '@/components/events/EventStatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEvents } from '@/hooks/use-events';
import { formatEventWindow } from '@/utilities';

export function EventsPage() {
  const { events, isError, isLoading } = useEvents();

  return (
    <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[.16em] text-muted-foreground">
            EVENT SCHEDULE
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-.055em] text-foreground">Events</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create one-time events, build a roster, and keep availability clear.
          </p>
        </div>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <NavLink to="/events/new">
            <Plus /> New event
          </NavLink>
        </Button>
      </div>

      {isLoading ? <p className="text-sm text-muted-foreground">Loading events...</p> : null}
      {isError ? <p className="text-sm text-destructive">Unable to load events.</p> : null}
      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="shadow-none">
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-lg text-foreground">{event.title}</CardTitle>
                  <EventStatusBadge status={event.status} />
                </div>
                <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />{' '}
                  {formatEventWindow(event.startsAt, event.endsAt)}
                </p>
                <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" /> {event.venue.name}
                </p>
              </div>
              <Button asChild variant="outline">
                <NavLink to={`/events/${event.id}`}>View event</NavLink>
              </Button>
            </CardHeader>
            <CardContent className="border-t border-border pt-4">
              <p className="flex items-center gap-2 text-[10px] font-bold tracking-[.12em] text-muted-foreground">
                <Users className="size-3.5" /> ASSIGNED GHOSTS - {event.ghostCount}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                View the event for its full roster.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
