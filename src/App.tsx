import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminRoutes } from './admin';
import { Login } from './admin/Login';
import Contact from './Component/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
