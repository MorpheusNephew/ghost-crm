import { Navigate, Route, Routes } from "react-router";
import { AppLayout } from "@/layouts/AppLayout";
import { ComingSoonPage } from "@/pages/ComingSoonPage";
import { GhostProfilePage } from "@/pages/GhostProfilePage";
import { GhostsPage } from "@/pages/GhostsPage";
import { EventCreatePage } from "@/pages/EventCreatePage";
import { EventDetailPage } from "@/pages/EventDetailPage";
import { EventsPage } from "@/pages/EventsPage";
import { OverviewPage } from "@/pages/OverviewPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="ghosts" element={<GhostsPage />} />
        <Route path="ghosts/:ghostId" element={<GhostProfilePage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/new" element={<EventCreatePage />} />
        <Route path="events/:eventId" element={<EventDetailPage />} />
        <Route path="sightings" element={<ComingSoonPage page="sightings" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
