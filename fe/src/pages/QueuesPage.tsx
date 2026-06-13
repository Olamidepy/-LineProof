import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

export type Queue = {
  id: string;
  name: string;
  status: 'Draft' | 'Open' | 'Closed';
  enrolled: number;
  maxPositions: number;
  advancementRule: 'FIFO' | 'Priority' | 'VerifiableRandomness';
};

const MOCK_QUEUES: Queue[] = [
  {
    id: 'sneaker-drop-001',
    name: 'Sneaker Drop #001',
    status: 'Open',
    enrolled: 187,
    maxPositions: 250,
    advancementRule: 'FIFO',
  },
  {
    id: 'visa-appointment-001',
    name: 'Visa Appointment Batch A',
    status: 'Closed',
    enrolled: 120,
    maxPositions: 120,
    advancementRule: 'FIFO',
  },
];

export default function QueueListPage() {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      setQueues(MOCK_QUEUES);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Queues</h1>
          <p className="mt-1 text-sm text-slate-600">Browse public waiting lists and verify on-chain enrollment proofs.</p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-600">Loading queues...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {queues.map((queue) => (
            <Link
              key={queue.id}
              to={`/queues/${queue.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">{queue.name}</h3>
                <ExternalLink className="h-4 w-4 text-slate-500" />
              </div>
              <p className="mt-2 text-sm text-slate-600">{queue.enrolled} / {queue.maxPositions} enrolled</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
                <span className="rounded-full border border-slate-200 px-2 py-1">{queue.status}</span>
                <span className="inline-flex items-center gap-1">
                  View queue <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
