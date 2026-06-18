import { Router, Response } from 'express';
import { z } from 'zod';
import { depositEscrow, releaseEscrow, refundEscrow, getEscrow } from '../services/escrowService.js';

const router = Router();

const DepositSchema = z.object({
  queueId: z.string().min(1),
  identity: z.string().min(1),
  amount: z.number().positive(),
  asset: z.string().min(1),
});

router.post('/deposit', (req: any, res: Response) => {
  const parsed = DepositSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', issues: parsed.error.issues });
  const record = depositEscrow(parsed.data);
  res.status(201).json(record);
});

router.post('/release', (req: any, res: Response) => {
  const { escrowId } = req.body as { escrowId: string };
  const updated = releaseEscrow(escrowId);
  if (!updated) return res.status(404).json({ message: 'Escrow not found' });
  res.json(updated);
});

router.post('/refund', (req: any, res: Response) => {
  const { escrowId } = req.body as { escrowId: string };
  const updated = refundEscrow(escrowId);
  if (!updated) return res.status(404).json({ message: 'Escrow not found' });
  res.json(updated);
});

router.get('/:id', (req, res: Response) => {
  const record = getEscrow(req.params.id);
  if (!record) return res.status(404).json({ message: 'Escrow not found' });
  res.json(record);
});

export default router;
