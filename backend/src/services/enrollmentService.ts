export type EnrollmentRecord = {
  queueId: string;
  identity: string;
  enrolledAt: string;
  conflict: boolean;
  cancelled: boolean;
};

const enrollmentStore = new Map<string, EnrollmentRecord[]>();

const enrollmentKey = (queueId: string, identity: string) => `${queueId}:${identity}`;
const queueIndex = new Map<string, Set<string>>();

export const enrollIdentity = (queueId: string, identity: string): EnrollmentRecord => {
  const existing = enrollmentStore.get(identity) ?? [];
  const conflict = existing.some((item) => item.queueId === queueId && !item.cancelled);
  if (conflict) {
    return { queueId, identity, enrolledAt: new Date().toISOString(), conflict: true, cancelled: false };
  }
  const record: EnrollmentRecord = {
    queueId,
    identity,
    enrolledAt: new Date().toISOString(),
    conflict: false,
    cancelled: false,
  };
  existing.push(record);
  enrollmentStore.set(identity, existing);

  // Maintain queue-level index
  const queueSet = queueIndex.get(queueId) ?? new Set<string>();
  queueSet.add(identity);
  queueIndex.set(queueId, queueSet);

  return record;
};

export const cancelEnrollment = (queueId: string, identity: string): boolean => {
  const existing = enrollmentStore.get(identity);
  if (!existing) return false;
  const record = existing.find((r) => r.queueId === queueId && !r.cancelled);
  if (!record) return false;
  record.cancelled = true;
  const queueSet = queueIndex.get(queueId);
  if (queueSet) queueSet.delete(identity);
  return true;
};

export const getEnrollmentsByIdentity = (identity: string): EnrollmentRecord[] => {
  return enrollmentStore.get(identity) ?? [];
};

/** @deprecated use getEnrollmentsByIdentity */
export const getEnrollment = getEnrollmentsByIdentity;

export const getEnrollmentsByQueue = (queueId: string): EnrollmentRecord[] => {
  const identities = queueIndex.get(queueId);
  if (!identities) return [];
  const results: EnrollmentRecord[] = [];
  for (const identity of identities) {
    const records = enrollmentStore.get(identity) ?? [];
    const active = records.filter((r) => r.queueId === queueId && !r.cancelled);
    results.push(...active);
  }
  return results;
};
