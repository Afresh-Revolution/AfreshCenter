import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./Component/AboutUs";
import Contact from "./Component/Contact";
import LandingPage from "./Component/LandingPage";
import Services from "./Component/Services";
import Support from "./Component/Support";
import WailinPage from "./wailin/WailinPage";
import { AdminRoutes } from "./admin";
import { Login } from "./admin/Login";
import { ScrollToTop } from "./ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/support" element={<Support />} />
        <Route path="/wailin" element={<WailinPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


