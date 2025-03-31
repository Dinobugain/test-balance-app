// src/app.js

import express from 'express';
import userWalletController from './modules/user/controllers/user-wallet.controller.js';
import dotenv from 'dotenv';
import taskController from './modules/task/controllers/task.controller.js';

dotenv.config();
const app = express();
app.use(express.json());


app.use('/users/wallet', userWalletController);
app.use('/tasks', taskController);

import('./modules/cron/cron.service.js')

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
