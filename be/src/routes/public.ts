import { Router } from 'express';
import { mockQueues } from './queues.js';

const router = Router();

router.get('/queues', (req, res) => {
  res.json(mockQueues);
});

export default router;
