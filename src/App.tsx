import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./Component/AboutUs";
import Contact from "./Component/Contact";
import Checkout from "./Component/Checkout";
import LandingPage from "./Component/LandingPage";
import Services from "./Component/Services";
import WailinPage from "./wailin/WailinPage";
import { AdminRoutes } from "./admin";
import { Login } from "./admin/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wailin" element={<WailinPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


