import { ArrowLeft, CalendarDays, ShieldCheck, Users } from 'lucide-react';
import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ghosts } from '@/lib/ghosts';

export function EventCreatePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
      <Button asChild variant="ghost" className="-ml-2 text-muted-foreground">
        <NavLink to="/events">
          <ArrowLeft /> Back to events
        </NavLink>
      </Button>
      <div className="mt-7">
        <p className="text-[10px] font-bold tracking-[.16em] text-muted-foreground">NEW EVENT</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.055em] text-foreground">
          Create an event
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Start in draft, then schedule once the venue and ghost roster are conflict-free.
        </p>
      </div>

      <form className="mt-8 grid gap-4">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Event details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-medium">
              Title
              <Input placeholder="e.g. Raven's Hollow Haunted Tour" />
            </label>
            <label className="grid gap-2 text-xs font-medium">
              Venue
              <select className="h-8 rounded-lg border border-input bg-muted px-2 text-sm">
                <option>Raven's Hollow Estate</option>
                <option>Blackwater Manor</option>
              </select>
            </label>
            <label className="grid gap-2 text-xs font-medium">
              Date
              <Input type="date" />
            </label>
            <label className="grid gap-2 text-xs font-medium">
              Start time
              <Input type="time" />
            </label>
            <label className="grid gap-2 text-xs font-medium">
              End time
              <Input type="time" />
            </label>
            <label className="grid gap-2 text-xs font-medium sm:col-span-2">
              Description
              <textarea
                className="min-h-24 rounded-lg border border-input bg-muted px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="What should the team know about this event?"
              />
            </label>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-4" /> Ghost roster
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 border-t border-border pt-5 sm:grid-cols-2">
            {ghosts.map((ghost) => (
              <label
                key={ghost.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-3 text-sm"
              >
                <input type="checkbox" className="size-4 accent-[var(--primary)]" />
                <span
                  className={`grid size-7 place-items-center rounded-full text-xs font-bold ${ghost.color}`}
                >
                  {ghost.initial}
                </span>
                <span>{ghost.name}</span>
              </label>
            ))}
          </CardContent>
        </Card>
        <div className="rounded-xl border border-primary/25 bg-primary/10 p-4 text-sm text-foreground">
          <ShieldCheck className="mr-2 inline size-4 text-primary" />
          <strong>Availability check:</strong> scheduling will check the selected ghosts and venue
          before this draft becomes scheduled.
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" type="button">
            Save draft
          </Button>
          <Button type="button">
            <CalendarDays /> Check and schedule
          </Button>
        </div>
      </form>
    </div>
  );
}
