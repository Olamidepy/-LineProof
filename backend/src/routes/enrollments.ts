import { Router, Response } from 'express';
import { z } from 'zod';
import { enrollIdentity, getEnrollment } from '../services/enrollmentService.js';

const router = Router();

const EnrollSchema = z.object({
  queueId: z.string().min(1),
  identity: z.string().min(1),
});

router.post('/enroll', (req: any, res: Response) => {
  const parsed = EnrollSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', issues: parsed.error.issues });

  const result = enrollIdentity(parsed.data.queueId, parsed.data.identity);
  if (result.conflict) return res.status(409).json({ message: 'Duplicate enrollment blocked' });
  res.status(201).json(result);
});

router.get('/:identity', (req, res: Response) => {
  const record = getEnrollment(req.params.identity);
  if (!record) return res.status(404).json({ message: 'No enrollments found' });
  res.json(record);
});

export default router;
