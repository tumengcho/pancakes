import express from 'express';
import Product from '../models/productModel.js';

const producRouter = express.Router();

producRouter.get('/', async (req, res) => {
  const burgers = await Product.find();
  res.send(burgers);
});

producRouter.get('/slug/:slug', async (req, res) => {
  const burger = await Product.findOne({ slug: req.params.slug });
  if (burger) {
    res.send(burger);
  } else {
    res.status(404).send({ message: 'Product not Found' });
  }
});

producRouter.get('/:id', async (req, res) => {
  const burger = await Product.findById(req.params.id);
  if (burger) {
    res.send(burger);
  } else {
    res.status(404).send({ message: 'Product not Found' });
  }
});

export default producRouter;
