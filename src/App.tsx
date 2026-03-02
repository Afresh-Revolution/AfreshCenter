import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminRoutes } from './admin';
import { Login } from './admin/Login';
import Contact from './Component/Contact';
import LandingPage from './Component/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
