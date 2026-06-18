import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Users, Clock } from 'lucide-react';

export type QueueStatus = 'Draft' | 'Open' | 'Closed';
export type Queue = {
  id: string;
  name: string;
  description: string;
  maxPositions: number;
  enrolled: number;
  status: QueueStatus;
  advancementRule: 'FIFO' | 'Priority' | 'VerifiableRandomness';
  escrowAsset: string;
  escrowAmount: number;
};

const MOCK_QUEUES: Queue[] = [
  {
    id: 'sneaker-drop-001',
    name: 'Sneaker Drop #001',
    description: 'Limited-edition sneaker release with non-transferable queue positions and escrow hold.',
    maxPositions: 250,
    enrolled: 187,
    status: 'Open',
    advancementRule: 'FIFO',
    escrowAsset: 'USDC',
    escrowAmount: 150,
  },
  {
    id: 'visa-appointment-001',
    name: 'Visa Appointment Batch A',
    description: 'Deterministic FIFO queue for scheduled visa interviews.',
    maxPositions: 120,
    enrolled: 120,
    status: 'Closed',
    advancementRule: 'FIFO',
    escrowAsset: 'XLM',
    escrowAmount: 25,
  },
];

export default function QueuePage() {
  const { id } = useParams();
  const queue = useMemo(() => MOCK_QUEUES.find((item) => item.id === id) ?? MOCK_QUEUES[0], [id]);
  const [publicKey, setPublicKey] = useState('');
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const looksLikeStellar = (value: string) => /^G[A-Z0-9]{55}$/.test(value);

  const handleEnroll = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!looksLikeStellar(publicKey)) {
      setError('Enter a valid Stellar public key starting with G.');
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setEnrolled(true);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Link to="/queues" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" /> Back to queues
      </Link>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{queue.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{queue.description}</p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium text-slate-700">
            {queue.status}
          </span>
        </div>

        <dl className="mt-6 grid gap-4 md:grid-cols-3">
          <Stat label="Positions" value={`${queue.enrolled} / ${queue.maxPositions}`} icon={<Users className="h-5 w-5" />} />
          <Stat label="Rule" value={queue.advancementRule} icon={<Clock className="h-5 w-5" />} />
          <Stat label="Escrow" value={`${queue.escrowAmount} ${queue.escrowAsset}`} icon={<ShieldCheck className="h-5 w-5" />} />
        </dl>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {enrolled ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            Enrolled successfully. This position is bound to your identity and cannot be transferred or resold.
          </div>
        ) : (
          <form onSubmit={handleEnroll} className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Enroll with your identity</h3>
              <p className="text-sm text-slate-600">Provide the Stellar public key that will own this non-transferable position.</p>
            </div>
            <input
              value={publicKey}
              onChange={(event) => setPublicKey(event.currentTarget.value)}
              placeholder="G..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Enroll now'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-slate-700">{icon}</div>
      <p className="mt-2 text-xs text-slate-600">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
