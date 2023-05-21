import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AdminEventsPanel from "./screens/AdminEventsPanel";
import AdminRanksPanel from "./screens/AdminRanksPanel";
import EventDetails from "./screens/EventDetails";
import EventsPage from "./screens/EventsPage";
import HomePage from "./screens/HomePage";
import { useEthereum } from "./EthereumContext";

function Router() {
  const connector = useEthereum();

  const loggedIn = !!connector.walletAddress;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage walletAddress={connector.walletAddress} />}
        />
        <Route
          path="/home"
          element={<HomePage walletAddress={connector.walletAddress} />}
        />
        {connector.walletAddress ===
          process.env.REACT_APP_ADMIN_WALLET_ADDRESS && (
          <>
            <Route path="/create-ranks" element={<AdminRanksPanel />} />
            <Route path="/create-event" element={<AdminEventsPanel />} />
          </>
        )}
        {loggedIn && (
          <>
            <Route path="/events" element={<EventsPage />} />
            <Route path="/event-details" element={<EventDetails />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
