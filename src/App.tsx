import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './Component/AboutUs';
import Contact from './Component/Contact';
import { AdminRoutes } from './admin';
import { Login } from './admin/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
