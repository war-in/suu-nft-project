import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AdminPanel from "./screens/AdminPanel";
import EventDetails from "./screens/EventDetails";
import EventsPage from "./screens/EventsPage";
import HomePage from "./screens/HomePage";
import { useEthereum } from "./EthereumContext";

function Router() {
  const { walletAddress } = useEthereum();

  const loggedIn = !!walletAddress;

  console.log(loggedIn)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage walletAddress={walletAddress} />} />
        <Route path="/home" element={<HomePage walletAddress={walletAddress} />} />
        {loggedIn && <>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event-details" element={<EventDetails />} />
        </>}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
