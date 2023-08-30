import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const producRouter = express.Router();

producRouter.get('/', async (req, res) => {
  const burgers = await Product.find();
  res.send(burgers);
});

producRouter.get('/slug/:slug', async (req, res) => {
  if (req.params.slug) {
    const burger = await Product.findOne({ slug: req.params.slug });
    if (burger) {
      res.send(burger);
    } else {
      res.status(404).send({ message: 'Product not Founde' });
    }
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

producRouter.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      image: req.body.Image,
      vedette: req.body.vedette,
      category: req.body.category,
      price: req.body.price,
    });
    const product = await newProduct.save();

    res.send('bien');
  })
);

export default producRouter;
