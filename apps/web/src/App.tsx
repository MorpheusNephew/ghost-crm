import { Navigate, Route, Routes } from "react-router";
import { AppLayout } from "@/layouts/AppLayout";
import { ComingSoonPage } from "@/pages/ComingSoonPage";
import { GhostProfilePage } from "@/pages/GhostProfilePage";
import { GhostsPage } from "@/pages/GhostsPage";
import { OverviewPage } from "@/pages/OverviewPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="ghosts" element={<GhostsPage />} />
        <Route path="ghosts/:ghostId" element={<GhostProfilePage />} />
        <Route path="events" element={<ComingSoonPage page="events" />} />
        <Route path="sightings" element={<ComingSoonPage page="sightings" />} />
        <Route path="campaigns" element={<ComingSoonPage page="campaigns" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
