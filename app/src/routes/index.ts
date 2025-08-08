import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send('Hello from Express + TypeScript!');
});

// A health check endpoint was added to satisfy requirements of assessment
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'Healthcheck is good' });
})

export default router;
