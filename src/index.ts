import express from 'express';
import { slotController } from './controllers/slotController';
import { walletController } from './controllers/walletController';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import { basePort, serverBaseUrl, urls } from './utils/constants';
import { logger } from './utils/logger';

const app = express();
const corsOptions = {
  origin: serverBaseUrl,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(logger);

app.post(urls.slot.play, slotController.play);
app.post(urls.slot.simulate, slotController.simulate);
app.get(urls.slot.rtp, slotController.getRTP);

app.post(urls.wallet.deposit, walletController.deposit);
app.post(urls.wallet.withdraw, walletController.withdraw);
app.get(urls.wallet.balance, walletController.getBalance);

app.use(errorHandler);

const PORT = process.env.PORT || basePort;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
