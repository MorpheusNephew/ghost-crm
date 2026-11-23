import { CalendarDays, MapPin, Plus, Users } from 'lucide-react';
import { NavLink } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const events = [
  {
    id: 'ravens-hollow-haunted-tour',
    name: "Raven's Hollow Haunted Tour",
    status: 'Scheduled',
    date: 'Saturday, October 31',
    time: '7:00 PM - 10:00 PM',
    venue: "Raven's Hollow Estate",
    ghosts: ['Lady Grey', 'The Bellringer', 'Marlow'],
  },
  {
    id: 'moonlit-manor-walkthrough',
    name: 'Moonlit Manor Walkthrough',
    status: 'Draft',
    date: 'Friday, November 6',
    time: '8:00 PM - 9:30 PM',
    venue: 'Blackwater Manor',
    ghosts: ['Eleanor Vane'],
  },
  {
    id: 'east-gate-investigation',
    name: 'East Gate Investigation',
    status: 'Cancelled',
    date: 'Thursday, October 29',
    time: '6:30 PM - 8:00 PM',
    venue: "Raven's Hollow Estate",
    ghosts: ['The Watcher'],
  },
];

export function EventsPage() {
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

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.name} className="shadow-none">
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-lg text-foreground">{event.name}</CardTitle>
                  <EventStatus status={event.status} />
                </div>
                <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" /> {event.date} - {event.time}
                </p>
                <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" /> {event.venue}
                </p>
              </div>
              <Button asChild variant="outline">
                <NavLink to={`/events/${event.id}`}>View event</NavLink>
              </Button>
            </CardHeader>
            <CardContent className="border-t border-border pt-4">
              <p className="flex items-center gap-2 text-[10px] font-bold tracking-[.12em] text-muted-foreground">
                <Users className="size-3.5" /> ASSIGNED GHOSTS - {event.ghosts.length}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {event.ghosts.map((ghost) => (
                  <Badge key={ghost} variant="secondary">
                    {ghost}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function EventStatus({ status }: { status: string }) {
  const style =
    status === 'Scheduled'
      ? 'bg-emerald-300 text-emerald-950'
      : status === 'Draft'
        ? 'bg-violet-300 text-violet-950'
        : 'bg-red-300 text-red-950';
  return <Badge className={`border-0 text-[9px] ${style}`}>{status}</Badge>;
}
