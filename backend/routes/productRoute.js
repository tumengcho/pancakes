import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';

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
    const { image, name, description, slug, vedette, category, price } =
      req.body;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
      const cloudImage = cloudinary.uploader.upload(image, {
        public_id: slug,
        upload_preset: 'ml_default',
      });

      console.log((await cloudImage).secure_url);

      const newProduct = new Product({
        name: name,
        slug: slug,
        description: description,
        image: `${(await cloudImage).secure_url}`,
        vedette: vedette,
        category: category,
        price: price,
      });

      const product = await newProduct.save();

      console.log(cloudImage);
    } catch (error) {
      console.log(error);
    }
  })
);

export default producRouter;
