export type Queue = {
  id: string;
  name: string;
  slug: string;
  description: string;
  maxPositions: number;
  enrolled: number;
  status: 'Draft' | 'Open' | 'Closed';
  advancementRule: 'FIFO' | 'Priority' | 'VerifiableRandomness';
  escrowAsset: string;
  escrowAmount: number;
};

const FIXTURE_QUEUES: Queue[] = [
  {
    id: 'sneaker-drop-001',
    name: 'Sneaker Drop #001',
    slug: 'sneaker-drop-001',
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
    slug: 'visa-appointment-001',
    description: 'Deterministic FIFO queue for scheduled visa interviews.',
    maxPositions: 120,
    enrolled: 120,
    status: 'Closed',
    advancementRule: 'FIFO',
    escrowAsset: 'XLM',
    escrowAmount: 25,
  },
];

export const mockQueues: Queue[] = FIXTURE_QUEUES;

export const getQueueById = (id: string): Queue | undefined => {
  return FIXTURE_QUEUES.find((queue) => queue.id === id || queue.slug === id);
};

export const createQueue = (payload: {
  name: string;
  slug: string;
  maxPositions: number;
  advancementRule?: 'FIFO' | 'Priority' | 'VerifiableRandomness';
  escrowRequired?: boolean;
}): Queue => {
  const queue: Queue = {
    id: payload.slug,
    name: payload.name,
    slug: payload.slug,
    description: 'New queue',
    maxPositions: payload.maxPositions,
    enrolled: 0,
    status: 'Draft',
    advancementRule: payload.advancementRule ?? 'FIFO',
    escrowAsset: 'XLM',
    escrowAmount: 0,
  };

  FIXTURE_QUEUES.push(queue);
  return queue;
};
