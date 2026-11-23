# Version-One Data-Model Requirements

This living record captures only requirements for the first usable workflow.
It describes required behavior rather than a schema or implementation.

## Goal

Demonstrate one coordinator working within one organization:

```text
Create a one-time event at one venue
-> schedule a ghost without a conflict
-> let staff record attendance
```

## Version-one scope

- The first version operates within one organization at a time.
- Ghosts and venues are a fixed set of demo data; coordinators do not create
  or edit them in version one.
- Version one uses fixed demo coordinator and staff users; user creation and
  invitation management are deferred.
- The first backend slice serves fixed demo data; persistence is deferred.
- The first API is read-only and supports an event list plus an event-detail
  response before creation or attendance updates are added.
- Events are one-time and occur at one venue.
- A coordinator creates events with a title, description, date, time, venue,
  and one or more scheduled demo ghosts.
- Each event has a start and end time.
- An event may be a draft before it is scheduled.
- Draft-event schedules do not reserve ghost or venue availability and do not
  participate in conflict checking.
- A draft event cannot become scheduled until its ghost and venue conflicts
  are resolved.
- A coordinator can edit or cancel an event after creating it.
- A coordinator can add or remove ghosts from a scheduled event, subject to
  the same ghost and venue conflict checks.
- A coordinator can change a scheduled event's venue or time range, but the
  change is blocked if it creates a ghost or venue conflict.
- Cancelling an event immediately releases its ghost and venue availability.
- A cancelled event remains visible as a cancelled historical record.
- Staff can view relevant schedules and record attendance.
- A schedule identifies its ghost, event, venue, and time range.
- The system prevents a ghost from receiving overlapping schedules.
- The system prevents a venue from hosting overlapping events.
- Attendance is recorded against a scheduled ghost as either `attended` or
  `no-show`.
- Staff may add an optional note when recording attendance.
- Staff may correct an attendance record later, but must provide a reason for
  the change.
- Attendance corrections retain the prior value and the correction reason as
  history.

## Out of scope for version one

- Recurring events and occurrence-level exceptions.
- Programs and multi-venue events.
- Cross-organization sharing and resource-agent accounts.
- Availability planning, travel/setup buffers, and conflict overrides.
- Sightings, activity history, contract details, and campaigns.
- User/role management beyond the coordinator and staff access needed for the
  demonstrated workflow.

## Open questions
