import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QueuePage from './pages/QueuePage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-semibold text-slate-900">LineProof</Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/queues" className="text-slate-600 hover:text-slate-900">Queues</Link>
            <Link to="/dashboard" className="text-slate-600 hover:text-slate-900">Dashboard</Link>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/queues" element={<QueuePage />} />
          <Route path="/queues/:id" element={<QueuePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  );
}
