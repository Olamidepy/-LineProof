import { Router, Response } from 'express';
import { z } from 'zod';
import { mockQueues, getQueueById, createQueue } from '../services/queueService.js';

const router = Router();

const CreateQueueSchema = z.object({
  name: z.string().min(1).max(120),
  slug: z.string().min(1).max(120),
  maxPositions: z.number().int().positive(),
  advancementRule: z.enum(['FIFO', 'Priority', 'VerifiableRandomness']).optional(),
  escrowRequired: z.boolean().optional(),
});

router.get('/', (req, res: Response) => {
  res.json(mockQueues);
});

router.get('/:id', (req, res: Response) => {
  const queue = getQueueById(req.params.id);
  if (!queue) return res.status(404).json({ message: 'Queue not found' });
  res.json(queue);
});

router.post('/', (req, res: Response) => {
  const parsed = CreateQueueSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', issues: parsed.error.issues });
  const queue = createQueue(parsed.data);
  res.status(201).json(queue);
});

export default router;
