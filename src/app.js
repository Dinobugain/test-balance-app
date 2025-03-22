// src/app.js
import express from 'express';
import userWalletController from './modules/user/controllers/user-wallet.controller.js';

const app = express();
app.use(express.json());


app.use('/users/wallet', userWalletController);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
