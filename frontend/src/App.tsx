import { Route, Routes } from "react-router-dom";
import { AppLayout, Protected } from "@/components/layout/AppLayout";
import {
  Auth,
  Dashboard,
  HistoryPage,
  Landing,
  NotFound,
  ProfilePage,
  SettingsPage,
  VideosPage,
} from "@/pages";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth register />} />
      <Route
        element={
          <Protected>
            <AppLayout />
          </Protected>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/favorites" element={<VideosPage favorites />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
