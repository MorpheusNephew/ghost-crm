export type GhostProfile = {
  id: string;
  name: string;
  descriptor: string;
  threat: string;
  lastSighting: string;
  nextEvent: string;
  status: string;
  initial: string;
  color: string;
};

export const ghosts: GhostProfile[] = [
  {
    id: "lady-grey",
    name: "Lady Grey",
    descriptor: "Estate apparition · Active",
    threat: "Low",
    lastSighting: "Today, 6:42 PM",
    nextEvent: "Raven's Hollow Tour",
    status: "Assigned",
    initial: "L",
    color: "bg-violet-300 text-violet-950",
  },
  {
    id: "the-bellringer",
    name: "The Bellringer",
    descriptor: "Clock tower spirit · Active",
    threat: "Moderate",
    lastSighting: "Yesterday, 9:16 PM",
    nextEvent: "Raven's Hollow Tour",
    status: "Assigned",
    initial: "B",
    color: "bg-orange-300 text-orange-950",
  },
  {
    id: "eleanor-vane",
    name: "Eleanor Vane",
    descriptor: "Manor resident · Active",
    threat: "Low",
    lastSighting: "Oct 28, 8:03 PM",
    nextEvent: "No upcoming event",
    status: "Unassigned",
    initial: "E",
    color: "bg-emerald-300 text-emerald-950",
  },
  {
    id: "the-watcher",
    name: "The Watcher",
    descriptor: "Gatehouse entity · Under review",
    threat: "High",
    lastSighting: "Today, 8:42 PM",
    nextEvent: "Investigation: East Gate",
    status: "Needs review",
    initial: "W",
    color: "bg-sky-300 text-sky-950",
  },
];
