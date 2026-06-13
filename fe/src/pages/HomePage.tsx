import { FaHeadset, FaRegCheckCircle, FaRegClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Provably fair waiting lists</h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          Non-transferable queue positions on Stellar. Prevent scalping, duplicate enrollments, and manual manipulation with auditable on-chain logic.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link
            to="/queues"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Explore queues
          </Link>
          <Link
            to="/dashboard"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-300"
          >
            Open dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <FeatureCard
          title="Non-transferable"
          description="Positions are bound to identities. Any transfer attempt reverts at the contract level."
          icon={<FaRegCheckCircle />}
        />
        <FeatureCard
          title="Duplicate prevention"
          description="One-position-per-identity enforced on-chain with auditable enrollment checks."
          icon={<FaRegClock />}
        />
        <FeatureCard
          title="Escrow ready"
          description="Hold payments and release funds by protocol rules designed to prevent impropriety."
          icon={<FaHeadset />}
        />
      </section>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-slate-700">{icon}</div>
      <h3 className="mt-3 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}
