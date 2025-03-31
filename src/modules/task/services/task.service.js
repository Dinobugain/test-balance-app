import { getAll } from '../../database/repositories/task-log.repository.js';

export class TaskService {

  async getAllTasks() {
    let error = false;
    try {
     
      const runningLogs = await getAll();
      const runningMap = new Map();

      for (const log of runningLogs) {
        runningMap.set(log.task, {
          task: log.task,
          status: log.status,
          instance_id: log.instance_id,
          started_at: log.started_at,
          duration_sec: Math.floor((Date.now() - new Date(log.started_at).getTime()) / 1000),
        });
      }

      return { error: undefined, result: [...runningMap.values()] };
    } catch (err) {
      error = true;
    }

    return { error, result: undefined };
  }
}

