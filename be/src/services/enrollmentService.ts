export type EnrollmentRecord = {
  queueId: string;
  identity: string;
  enrolledAt: string;
  conflict: boolean;
};

const enrollmentStore = new Map<string, EnrollmentRecord[]>();

export const enrollIdentity = (queueId: string, identity: string): EnrollmentRecord => {
  const existing = enrollmentStore.get(identity) ?? [];
  const conflict = existing.some((item) => item.queueId === queueId);
  if (conflict) {
    return { queueId, identity, enrolledAt: new Date().toISOString(), conflict: true };
  }
  const record: EnrollmentRecord = { queueId, identity, enrolledAt: new Date().toISOString(), conflict: false };
  existing.push(record);
  enrollmentStore.set(identity, existing);
  return record;
};

export const getEnrollment = (identity: string): EnrollmentRecord[] => {
  return enrollmentStore.get(identity) ?? [];
};
