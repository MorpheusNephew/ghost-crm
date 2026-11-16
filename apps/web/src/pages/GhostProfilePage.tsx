import { ArrowLeft, CalendarDays, MapPin, ShieldAlert } from "lucide-react";
import { NavLink, Navigate, useParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ghosts } from "@/lib/ghosts";

export function GhostProfilePage({
  notify,
}: {
  notify: (message: string) => void;
}) {
  const { ghostId } = useParams();
  const ghost = ghosts.find((profile) => profile.id === ghostId);
  if (!ghost) return <Navigate to="/ghosts" replace />;
  const availability =
    ghost.status === "Needs review"
      ? "Needs coordinator review"
      : ghost.status === "Assigned"
        ? "Assigned to upcoming event"
        : "Available for assignment";

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
          <span
            className={`grid size-16 place-items-center rounded-full text-xl font-bold ${ghost.color}`}
          >
            {ghost.initial}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-semibold tracking-[-.055em] text-foreground">
                {ghost.name}
              </h1>
              <Badge className="border-0 bg-white/10 text-[9px] text-[#e3e1e8]">
                Active
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {ghost.descriptor}
            </p>
          </div>
        </div>
        <Button
          onClick={() => notify("Ghost profile editing would open here.")}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Edit profile
        </Button>
      </div>
      <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatusCard
          label="LIFECYCLE"
          value="Active"
          detail="Eligible for assignments"
        />
        <StatusCard
          label="THREAT LEVEL"
          value={ghost.threat}
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
          label="LAST SIGHTING"
          value={ghost.lastSighting}
          detail="Derived from sighting records"
        />
      </section>
      <section className="mt-7 grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="shadow-none">
          <CardHeader>
            <p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">
              UPCOMING ASSIGNMENT
            </p>
            <CardTitle className="mt-1 text-lg text-foreground">
              {ghost.nextEvent}
            </CardTitle>
          </CardHeader>
          <CardContent className="border-t border-white/10 pt-5">
            {ghost.nextEvent === "No upcoming event" ? (
              <p className="text-sm text-[#a5a4b4]">
                This ghost has no upcoming assignment and is available for the
                next eligible event.
              </p>
            ) : (
              <div className="space-y-4">
                <p className="flex items-center gap-2 text-sm text-[#d5d4df]">
                  <CalendarDays className="size-4 text-[#b8ff70]" />
                  Saturday, October 31 · 7:00 PM
                </p>
                <p className="flex items-center gap-2 text-sm text-[#d5d4df]">
                  <MapPin className="size-4 text-[#b8ff70]" />
                  Raven's Hollow Estate
                </p>
                <p className="flex items-center gap-2 text-sm text-[#d5d4df]">
                  <ShieldAlert className="size-4 text-orange-300" />
                  No scheduling conflict detected
                </p>
                <Button
                  variant="outline"
                  className="mt-2 border-white/10 bg-white/[.045] text-[#d9d8e3] hover:bg-white/10 hover:text-white"
                >
                  View event roster
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader>
            <p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">
              OPEN OPERATIONAL CONCERNS
            </p>
            <CardTitle className="mt-1 text-lg text-foreground">
              Current review
            </CardTitle>
          </CardHeader>
          <CardContent className="border-t border-white/10 pt-5">
            <p className="text-sm text-[#a5a4b4]">
              {ghost.status === "Needs review"
                ? "This profile requires coordinator review before another assignment."
                : "No unresolved operational concerns."}
            </p>
            <Button
              variant="link"
              className="mt-4 h-auto p-0 text-xs text-[#b8ff70] hover:text-[#d3ffa9]"
            >
              View activity timeline →
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
  tone?: "mint" | "orange";
}) {
  return (
    <Card className="py-5 shadow-none">
      <CardContent>
        <p className="text-[10px] font-bold tracking-[.1em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-3 text-lg font-semibold tracking-[-.03em] text-foreground">
          {value}
        </p>
        <p
          className={`mt-2 text-[11px] ${tone === "mint" ? "text-primary" : tone === "orange" ? "text-orange-300" : "text-muted-foreground"}`}
        >
          {detail}
        </p>
      </CardContent>
    </Card>
  );
}
