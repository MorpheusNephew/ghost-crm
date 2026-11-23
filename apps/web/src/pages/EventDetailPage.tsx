import { useState } from "react";
import { ArrowLeft, CalendarDays, Check, MapPin, Pencil, ShieldCheck, Users, X } from "lucide-react";
import { NavLink, Navigate, useParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Attendance = "Pending" | "Attended" | "No-show";

type RosterGhost = {
  id: string;
  name: string;
  initial: string;
  color: string;
  attendance: Attendance;
  note?: string;
  history?: string;
};

const initialRoster: RosterGhost[] = [
  { id: "lady-grey", name: "Lady Grey", initial: "L", color: "bg-violet-300 text-violet-950", attendance: "Pending" },
  { id: "bellringer", name: "The Bellringer", initial: "B", color: "bg-orange-300 text-orange-950", attendance: "Pending" },
  { id: "marlow", name: "Marlow", initial: "M", color: "bg-emerald-300 text-emerald-950", attendance: "Attended", note: "Arrived before guest check-in.", history: "Marked attended by event staff." },
];

export function EventDetailPage() {
  const { eventId } = useParams();
  const [roster, setRoster] = useState(initialRoster);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [reason, setReason] = useState("");

  if (eventId !== "ravens-hollow-haunted-tour") return <Navigate to="/events" replace />;

  const saveAttendance = (ghostId: string, attendance: Attendance) => {
    const prior = roster.find((ghost) => ghost.id === ghostId);
    if (!prior) return;
    const isCorrection = prior.attendance !== "Pending";
    if (isCorrection && !reason.trim()) return;
    setRoster((current) => current.map((ghost) => ghost.id === ghostId ? {
      ...ghost,
      attendance,
      note: note.trim() || undefined,
      history: isCorrection ? `${prior.attendance} corrected to ${attendance}: ${reason.trim()}` : `Marked ${attendance.toLowerCase()} by event staff.`,
    } : ghost));
    setEditingId(null);
    setNote("");
    setReason("");
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
      <Button asChild variant="ghost" className="-ml-2 text-muted-foreground"><NavLink to="/events"><ArrowLeft /> Back to events</NavLink></Button>
      <div className="mt-7 flex flex-wrap items-start justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-2"><h1 className="text-3xl font-semibold tracking-[-.055em] text-foreground">Raven's Hollow Haunted Tour</h1><Badge className="border-0 bg-emerald-300 text-[9px] text-emerald-950">Scheduled</Badge></div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">A guided evening tour through Raven's Hollow Estate, with character appearances staged across the grounds.</p>
        </div>
        <div className="flex flex-wrap gap-2"><Button variant="outline"><Pencil /> Edit event</Button><Button variant="destructive"><X /> Cancel event</Button></div>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <InfoCard icon={CalendarDays} label="WHEN" value="Saturday, October 31" detail="7:00 PM - 10:00 PM" />
        <InfoCard icon={MapPin} label="VENUE" value="Raven's Hollow Estate" detail="1200 Ravenswood Lane" />
        <InfoCard icon={ShieldCheck} label="SCHEDULING" value="Conflict-free" detail="Ghost and venue availability confirmed" />
      </section>

      <section className="mt-7 grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
        <Card className="shadow-none">
          <CardHeader className="flex-row items-start justify-between gap-4"><div><p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">EVENT ROSTER</p><CardTitle className="mt-1 text-lg text-foreground">Ghost attendance</CardTitle><p className="mt-1 text-xs text-muted-foreground">Staff records attendance for each scheduled ghost.</p></div><Button variant="outline"><Users /> Add ghost</Button></CardHeader>
          <CardContent className="border-t border-border pt-3">
            {roster.map((ghost) => (
              <div key={ghost.id} className="border-b border-border py-4 last:border-b-0">
                <div className="flex flex-wrap items-center gap-3"><span className={`grid size-9 place-items-center rounded-full text-xs font-bold ${ghost.color}`}>{ghost.initial}</span><div className="min-w-32 flex-1"><p className="text-sm font-semibold text-foreground">{ghost.name}</p><p className="mt-0.5 text-[11px] text-muted-foreground">Raven's Hollow Estate - 7:00 PM - 10:00 PM</p></div><AttendanceBadge value={ghost.attendance} />
                  {ghost.attendance === "Pending" ? <div className="flex gap-2"><Button size="sm" onClick={() => { setEditingId(ghost.id); setNote(""); setReason(""); }}>Record attendance</Button></div> : <Button size="sm" variant="outline" onClick={() => { setEditingId(ghost.id); setNote(ghost.note ?? ""); setReason(""); }}>Correct</Button>}
                </div>
                {editingId === ghost.id ? <AttendanceEditor ghost={ghost} note={note} reason={reason} onNote={setNote} onReason={setReason} onCancel={() => setEditingId(null)} onSave={saveAttendance} /> : null}
                {ghost.note || ghost.history ? <div className="ml-12 mt-3 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">{ghost.note ? <p>{ghost.note}</p> : null}{ghost.history ? <p className="mt-1 text-[11px]">{ghost.history}</p> : null}</div> : null}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-none"><CardHeader><p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">COORDINATOR CHECKLIST</p><CardTitle className="mt-1 text-lg text-foreground">Ready for tonight</CardTitle></CardHeader><CardContent className="space-y-4 border-t border-border pt-5 text-sm text-muted-foreground"><p><Check className="mr-2 inline size-4 text-primary" /> Venue availability confirmed</p><p><Check className="mr-2 inline size-4 text-primary" /> All roster ghosts are conflict-free</p><p><Check className="mr-2 inline size-4 text-primary" /> Staff attendance is due after the event</p></CardContent></Card>
      </section>
    </div>
  );
}

function AttendanceEditor({ ghost, note, reason, onNote, onReason, onCancel, onSave }: { ghost: RosterGhost; note: string; reason: string; onNote: (value: string) => void; onReason: (value: string) => void; onCancel: () => void; onSave: (id: string, attendance: Attendance) => void }) {
  const needsReason = ghost.attendance !== "Pending";
  return <div className="ml-12 mt-4 grid gap-3 rounded-lg border border-border bg-muted/40 p-3"><p className="text-xs font-medium text-foreground">Record attendance for {ghost.name}</p><div className="flex flex-wrap gap-2"><Button size="sm" onClick={() => onSave(ghost.id, "Attended")} disabled={needsReason && !reason.trim()}><Check /> Attended</Button><Button size="sm" variant="outline" onClick={() => onSave(ghost.id, "No-show")} disabled={needsReason && !reason.trim()}><X /> No-show</Button><Button size="sm" variant="ghost" onClick={onCancel}>Cancel</Button></div><label className="grid gap-1 text-xs text-muted-foreground">Optional note<Input value={note} onChange={(event) => onNote(event.target.value)} placeholder="Add context for the team" /></label>{needsReason ? <label className="grid gap-1 text-xs text-muted-foreground">Reason for correction <Input value={reason} onChange={(event) => onReason(event.target.value)} placeholder="Required to change an existing record" /></label> : null}</div>;
}

function AttendanceBadge({ value }: { value: Attendance }) {
  const style = value === "Attended" ? "bg-emerald-300 text-emerald-950" : value === "No-show" ? "bg-red-300 text-red-950" : "bg-violet-300 text-violet-950";
  return <Badge className={`border-0 text-[9px] ${style}`}>{value}</Badge>;
}

function InfoCard({ icon: Icon, label, value, detail }: { icon: typeof CalendarDays; label: string; value: string; detail: string }) {
  return <Card className="py-5 shadow-none"><CardContent><p className="flex items-center gap-2 text-[10px] font-bold tracking-[.1em] text-muted-foreground"><Icon className="size-3.5" /> {label}</p><p className="mt-3 text-base font-semibold text-foreground">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></CardContent></Card>;
}
