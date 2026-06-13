import { useEffect, useState } from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export type PositionRecord = {
  id: string;
  queueId: string;
  queueName: string;
  positionId: number;
  identity: string;
  enrolledAt: string;
  status: 'Pending' | 'Advanced' | 'Expired' | 'Cancelled';
};

export default function DashboardPage() {
  const [publicKey, setPublicKey] = useState('');
  const [records, setRecords] = useState<PositionRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setRecords([
      {
        id: '1',
        queueId: 'sneaker-drop-001',
        queueName: 'Sneaker Drop #001',
        positionId: 42,
        identity: publicKey || 'GEXAMPLEPUBLICKEY',
        enrolledAt: new Date().toISOString(),
        status: 'Pending',
      },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    if (publicKey.length > 10) {
      void load();
    }
  }, [publicKey]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Your positions</h1>
        <p className="mt-1 text-sm text-slate-600">Check enrollment status and verify non-transfer bindings.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-slate-900">Stellar public key</label>
        <input
          value={publicKey}
          onChange={(event) => setPublicKey(event.currentTarget.value)}
          placeholder="G..."
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={load}
          className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          {loading ? 'Loading...' : 'Lookup positions'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {records.map((record) => (
          <div key={record.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">{record.queueName}</h3>
              <ShieldCheck className="h-5 w-5 text-slate-700" />
            </div>
            <p className="mt-2 text-sm text-slate-600">Position #{record.positionId}</p>
            <p className="text-xs text-slate-500">Enrolled {new Date(record.enrolledAt).toLocaleString()}</p>
          </div>
        ))}
        {!loading && records.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">No positions found for this key.</div>
        )}
      </div>
    </div>
  );
}
