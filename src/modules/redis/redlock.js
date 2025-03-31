import Redlock from 'redlock';
import { redis } from './redis.js';

export const redlock = new Redlock(
  [redis],
  {
    driftFactor: 0.01,
    retryCount: 3,
    retryDelay: 200,
    retryJitter: 200
  }
);