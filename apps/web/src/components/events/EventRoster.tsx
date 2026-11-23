import { useEffect, useState } from 'react';
import { Check, Users, X } from 'lucide-react';
import type { EventDetailResponse } from '@/api/generated/types.gen';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatEventTimeRange } from '@/utilities';

type Attendance = 'Pending' | 'Attended' | 'No-show';

type RosterGhost = {
  id: string;
  name: string;
  initial: string;
  color: string;
  attendance: Attendance;
  note?: string;
  history?: string;
};

type EventRosterProps = {
  roster: EventDetailResponse['event']['roster'];
  venueName: string;
  startsAt: string;
  endsAt: string;
};

export function EventRoster({
  roster: eventRoster,
  venueName,
  startsAt,
  endsAt,
}: EventRosterProps) {
  const [roster, setRoster] = useState<RosterGhost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    setRoster(toRosterGhosts(eventRoster));
  }, [eventRoster]);

  const saveAttendance = (ghostId: string, attendance: Attendance) => {
    const prior = roster.find((ghost) => ghost.id === ghostId);
    if (!prior) return;
    const isCorrection = prior.attendance !== 'Pending';
    if (isCorrection && !reason.trim()) return;

    setRoster((current) =>
      current.map((ghost) =>
        ghost.id === ghostId
          ? {
              ...ghost,
              attendance,
              note: note.trim() || undefined,
              history: isCorrection
                ? `${prior.attendance} corrected to ${attendance}: ${reason.trim()}`
                : `Marked ${attendance.toLowerCase()} by event staff.`,
            }
          : ghost,
      ),
    );
    setEditingId(null);
    setNote('');
    setReason('');
  };

  const eventTimeRange = formatEventTimeRange(startsAt, endsAt);

  return (
    <Card className="shadow-none">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[.14em] text-muted-foreground">
            EVENT ROSTER
          </p>
          <CardTitle className="mt-1 text-lg text-foreground">Ghost attendance</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Staff records attendance for each scheduled ghost.
          </p>
        </div>
        <Button variant="outline">
          <Users /> Add ghost
        </Button>
      </CardHeader>
      <CardContent className="border-t border-border pt-3">
        {roster.map((ghost) => (
          <div key={ghost.id} className="border-b border-border py-4 last:border-b-0">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`grid size-9 place-items-center rounded-full text-xs font-bold ${ghost.color}`}
              >
                {ghost.initial}
              </span>
              <div className="min-w-32 flex-1">
                <p className="text-sm font-semibold text-foreground">{ghost.name}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {venueName} - {eventTimeRange}
                </p>
              </div>
              <AttendanceBadge value={ghost.attendance} />
              {ghost.attendance === 'Pending' ? (
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingId(ghost.id);
                    setNote('');
                    setReason('');
                  }}
                >
                  Record attendance
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(ghost.id);
                    setNote(ghost.note ?? '');
                    setReason('');
                  }}
                >
                  Correct
                </Button>
              )}
            </div>
            {editingId === ghost.id ? (
              <AttendanceEditor
                ghost={ghost}
                note={note}
                reason={reason}
                onNote={setNote}
                onReason={setReason}
                onCancel={() => setEditingId(null)}
                onSave={saveAttendance}
              />
            ) : null}
            {ghost.note || ghost.history ? (
              <div className="ml-12 mt-3 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                {ghost.note ? <p>{ghost.note}</p> : null}
                {ghost.history ? <p className="mt-1 text-[11px]">{ghost.history}</p> : null}
              </div>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function toRosterGhosts(roster: EventRosterProps['roster']): RosterGhost[] {
  const colors = [
    'bg-violet-300 text-violet-950',
    'bg-orange-300 text-orange-950',
    'bg-emerald-300 text-emerald-950',
    'bg-sky-300 text-sky-950',
  ];

  return roster.map((ghost, index) => ({
    id: ghost.id,
    name: ghost.name,
    initial: ghost.name.at(0) ?? '?',
    color: colors[index % colors.length],
    attendance: attendanceLabel(ghost.attendance),
    note: ghost.note,
  }));
}

function attendanceLabel(attendance: 'pending' | 'attended' | 'no_show'): Attendance {
  if (attendance === 'attended') return 'Attended';
  if (attendance === 'no_show') return 'No-show';
  return 'Pending';
}

function AttendanceEditor({
  ghost,
  note,
  reason,
  onNote,
  onReason,
  onCancel,
  onSave,
}: {
  ghost: RosterGhost;
  note: string;
  reason: string;
  onNote: (value: string) => void;
  onReason: (value: string) => void;
  onCancel: () => void;
  onSave: (id: string, attendance: Attendance) => void;
}) {
  const needsReason = ghost.attendance !== 'Pending';

  return (
    <div className="ml-12 mt-4 grid gap-3 rounded-lg border border-border bg-muted/40 p-3">
      <p className="text-xs font-medium text-foreground">Record attendance for {ghost.name}</p>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => onSave(ghost.id, 'Attended')}
          disabled={needsReason && !reason.trim()}
        >
          <Check /> Attended
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onSave(ghost.id, 'No-show')}
          disabled={needsReason && !reason.trim()}
        >
          <X /> No-show
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <label className="grid gap-1 text-xs text-muted-foreground">
        Optional note
        <Input
          value={note}
          onChange={(event) => onNote(event.target.value)}
          placeholder="Add context for the team"
        />
      </label>
      {needsReason ? (
        <label className="grid gap-1 text-xs text-muted-foreground">
          Reason for correction
          <Input
            value={reason}
            onChange={(event) => onReason(event.target.value)}
            placeholder="Required to change an existing record"
          />
        </label>
      ) : null}
    </div>
  );
}

function AttendanceBadge({ value }: { value: Attendance }) {
  const style =
    value === 'Attended'
      ? 'bg-emerald-300 text-emerald-950'
      : value === 'No-show'
        ? 'bg-red-300 text-red-950'
        : 'bg-violet-300 text-violet-950';

  return <Badge className={`border-0 text-[9px] ${style}`}>{value}</Badge>;
}
