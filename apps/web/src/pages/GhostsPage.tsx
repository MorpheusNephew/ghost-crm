import { SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ghosts } from "@/lib/ghosts";

export function GhostsPage({ notify }: { notify: (message: string) => void }) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[.16em] text-muted-foreground">
            GHOST DIRECTORY
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-.055em] text-foreground">
            Ghost profiles
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Monitor operational status and upcoming assignments.
          </p>
        </div>
        <Button
          onClick={() => notify("A new ghost profile form would open here.")}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          + Add ghost
        </Button>
      </div>
      <div className="mb-4">
        <Button
          variant="outline"
          className="border-input bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        >
          <SlidersHorizontal /> Filters{" "}
          <Badge className="ml-1 border-0 bg-violet-300 text-[9px] text-violet-950">
            2
          </Badge>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ghosts.map((ghost) => (
          <Card key={ghost.id} className="shadow-none">
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <span
                  className={`grid size-10 place-items-center rounded-full text-sm font-bold ${ghost.color}`}
                >
                  {ghost.initial}
                </span>
                <ThreatBadge level={ghost.threat} />
              </div>
              <h2 className="mt-4 text-base font-semibold text-foreground">
                {ghost.name}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {ghost.descriptor}
              </p>
              <div className="mt-5 space-y-3 border-t border-border pt-4 text-xs">
                <p className="text-muted-foreground">
                  <span className="block text-[9px] font-bold tracking-[.1em] text-muted-foreground">
                    LAST SIGHTING
                  </span>
                  {ghost.lastSighting}
                </p>
                <p className="text-muted-foreground">
                  <span className="block text-[9px] font-bold tracking-[.1em] text-muted-foreground">
                    NEXT EVENT
                  </span>
                  {ghost.nextEvent}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate(`/ghosts/${ghost.id}`)}
                className="mt-5 w-full"
              >
                View profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ThreatBadge({ level }: { level: string }) {
  const colors =
    level === "High"
      ? "bg-red-300 text-red-950"
      : level === "Moderate"
        ? "bg-orange-300 text-orange-950"
        : "bg-emerald-300 text-emerald-950";
  return <Badge className={`border-0 text-[9px] ${colors}`}>{level}</Badge>;
}
