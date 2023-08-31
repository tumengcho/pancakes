import express from 'express';
import data from './data.js';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import producRouter from './routes/productRoute.js';
import userRouter from './routes/userRoutes.js';
import expressAsyncHandler from 'express-async-handler';
import orderRouter from './routes/orderRoutes.js';
import fileUpload from 'express-fileupload';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();
app.use(fileUpload());
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 })
);
app.use(express.text({ limit: '200mb' }));

// app.get('/api/keys/paypal', (req, res) => {
//   res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
// });

app.use('/api/seed', seedRouter);
app.use('/api/products', producRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const _dirname = path.resolve();
// app.use(express.static(path.join(_dirname, '/frontend/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(_dirname, '/frontend/build/index.html'));
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`~/frontend/public/Images/${file.name}}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ image: `/Images/${file.name}` });
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(port);
});
