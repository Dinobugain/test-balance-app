import { redlock } from '../redis/redlock.js';
import { tasksRegistry }from './cron.registry.js';
import { createTaskLog, updateTaskLog }from '../database/repositories/task-log.repository.js';

const instanceId = process.env.INSTANCE_ID || 'local';
const LOCK_TTL = 3 * 60 * 1000;

async function runCronLoop() {
  const now = new Date();

  for (const [taskName, taskFn] of Object.entries(tasksRegistry)) {
    const lockKey = `locks:task:${taskName}`;

    try {
      const lock = await redlock.acquire([lockKey], LOCK_TTL);

      console.log(`[${instanceId}] 🔒 Running ${taskName}`);

      const startedAt = new Date();
      await createTaskLog(taskName, instanceId, startedAt, 'processing');

      await taskFn(); // 2 minutes

      await updateTaskLog(taskName, instanceId, startedAt, new Date(), 'done');

      await lock.release();

    } catch (err) {
      // Already locked
    }
  }
}

setInterval(runCronLoop, 10_000);
