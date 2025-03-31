import { taskA } from './tasks/task-a.js';
import { taskB } from './tasks/task-b.js';

export const tasksRegistry = {
  taskA,
  taskB,
  taskC: taskA,
  taskD: taskB,
  taskE: taskA,
  taskF: taskB,
  taskG: taskA,
  taskH: taskB,
  taskI: taskA,
  taskJ: taskB,
};
