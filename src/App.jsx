import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sellers from './pages/Sellers';
import Debts from './pages/Debts';
import Clients from './pages/Clients';
import Management from './pages/Management';
import Reports from './pages/Reports';
import AIAssistant from './pages/AIAssistant';
import BottomNav from './components/BottomNav';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  return (
    <div className="app-container">
      {/* Background orbs */}
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>
      <div className="bg-orb bg-orb-3"></div>

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/products" element={<Products user={user} />} />
          <Route path="/sellers" element={<Sellers user={user} />} />
          <Route path="/debts" element={<Debts user={user} />} />
          <Route path="/clients" element={<Clients user={user} />} />
          <Route path="/management" element={<Management user={user} />} />
          <Route path="/reports" element={<Reports user={user} />} />
          <Route path="/ai" element={<AIAssistant user={user} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <BottomNav user={user} onLogout={() => setUser(null)} />
    </div>
  );
}

export default App;
