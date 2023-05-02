import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AdminPanel from "./screens/AdminPanel";
import EventDetails from "./screens/EventDetails";
import EventsPage from "./screens/EventsPage";
import HomePage from "./screens/HomePage";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event-details" element={<EventDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
