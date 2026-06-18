import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import queueRoutes from './routes/queues.js';
import enrollmentRoutes from './routes/enrollments.js';
import escrowRoutes from './routes/escrow.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/queues', queueRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/escrow', escrowRoutes);

app.use(errorHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
  console.log(`LineProof backend listening on :${port}`);
});
