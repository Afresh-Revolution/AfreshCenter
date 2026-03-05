<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './Component/AboutUs';
import Contact from './Component/Contact';
import Services from './Component/Services';
import { AdminRoutes } from './admin';
import { Login } from './admin/Login';

=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./Component/AboutUs";
import Contact from "./Component/Contact";
import LandingPage from "./Component/LandingPage";
import { AdminRoutes } from "./admin";
import { Login } from "./admin/Login";
>>>>>>> 97262d12abf04c104433ba54092b2fc7efbb623f
function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<AboutUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
=======
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
>>>>>>> 97262d12abf04c104433ba54092b2fc7efbb623f
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
