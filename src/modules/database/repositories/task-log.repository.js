import { sequelize } from '../database.js';
import { DataTypes, Op } from 'sequelize';

export const TaskLog = sequelize.define('TaskLog', {
  task: DataTypes.STRING,
  instance_id: DataTypes.STRING,
  started_at: DataTypes.DATE,
  finished_at: DataTypes.DATE,
  status: DataTypes.STRING,
}, {
  timestamps: false
});

export const createTaskLog = async (task, instance_id, started_at, status) => {
  try {
    const taskLog = await TaskLog.create({ task, instance_id, started_at, status });
    return taskLog;
  } catch (e) {
    return false;
  }
};


export const updateTaskLog = async (task, instance_id, started_at, finished_at, status) => {
  const [ updatedRows ] = await TaskLog.update(
    { finished_at, status },
    { where: { task, instance_id, started_at } }
  );

  return updatedRows
}

export const getAll = async () => {
  const tasks = await TaskLog.findAll({
    order: [['started_at', 'DESC']],
  });

  return tasks;
}
