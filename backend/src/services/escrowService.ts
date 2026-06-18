export type EscrowStatus = 'Active' | 'Released' | 'Refunded';

export type EscrowRecord = {
  id: string;
  queueId: string;
  identity: string;
  amount: number;
  asset: string;
  status: EscrowStatus;
  createdAt: string;
};

const escrowStore = new Map<string, EscrowRecord>();

export const depositEscrow = (payload: {
  queueId: string;
  identity: string;
  amount: number;
  asset: string;
}): EscrowRecord => {
  const id = `${payload.queueId}:${payload.identity}`;
  const record: EscrowRecord = {
    id,
    queueId: payload.queueId,
    identity: payload.identity,
    amount: payload.amount,
    asset: payload.asset,
    status: 'Active',
    createdAt: new Date().toISOString(),
  };
  escrowStore.set(id, record);
  return record;
};

export const releaseEscrow = (escrowId: string): EscrowRecord | undefined => {
  const record = escrowStore.get(escrowId);
  if (!record) return undefined;
  record.status = 'Released';
  return record;
};

export const refundEscrow = (escrowId: string): EscrowRecord | undefined => {
  const record = escrowStore.get(escrowId);
  if (!record) return undefined;
  record.status = 'Refunded';
  return record;
};

export const getEscrow = (escrowId: string): EscrowRecord | undefined => {
  return escrowStore.get(escrowId);
};
