import express from "express";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import { isAdmin, isAuth } from "../utils.js";
import path from "path";

const producRouter = express.Router();

producRouter.get("/", async (req, res) => {
  const burgers = await Product.find();
  res.send(burgers);
});

const PAGE_SIZE = 5;

producRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

producRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const getPublicId = (imageURL) => {
      const [, publicIdWithExtensionName] = imageURL.split("upload/");
      const extensionName = path.extname(publicIdWithExtensionName);
      const publicId = publicIdWithExtensionName.replace(extensionName, "");
      const id = publicId.split("/")[1];
      return id;
    };

    const imageId = getPublicId(product.image);
    console.log(imageId);

    if (product) {
      try {
        if (product.images.length > 0) {
          for (let index = 0; index < product.images.length; index++) {
            console.log(index);
            const element = getPublicId(product.images[index]);
            console.log(element);
            const destroy = async () => {
              try {
                const img = await cloudinary.uploader
                  .destroy(element)
                  .then((result) => console.log("result" + result));
              } catch (error) {}
            };
            destroy();
          }
        }
        const cloudImage = await cloudinary.uploader
          .destroy(imageId)
          .then((result) => console.log(result));
      } catch (error) {}
      await Product.findByIdAndRemove(product.id);
      res.send({ message: "Product Deleted" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

producRouter.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    const {
      image,
      images,
      name,
      description,
      slug,
      vedette,
      category,
      price,
      promo,
      New,
      brand,
    } = req.body;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
      const cloudImage = cloudinary.uploader.upload(image, {
        public_id: slug,
        upload_preset: "ml_default",
      });

      const Images = [];
      if (images.length !== 0) {
        for (let index = 0; index < images.length; index++) {
          const element = images[index];
          const upload = async () => {
            try {
              const img = cloudinary.uploader.upload(element, {
                upload_preset: "ml_default",
                unique_filename: true,
              });
              id = id + 1;
              Images.push((await img).secure_url);
              if (Images.length === images.length) {
                const newProduct = new Product({
                  name: name,
                  slug: slug,
                  description: description,
                  image: `${(await cloudImage).secure_url}`,
                  images: Images,
                  vedette: vedette,
                  category: category,
                  price: price,
                  promo: promo,
                  brand: brand,
                  new: New,
                });

                const product = await newProduct.save();
              }
            } catch (error) {}
          };
          upload();
        }
        res.send({ message: "success" });
      } else {
        const newProduct = new Product({
          name: name,
          slug: slug,
          description: description,
          image: `${(await cloudImage).secure_url}`,
          images: Images,
          vedette: vedette,
          category: category,
          brand: brand,
          promo: promo,
          new: New,
          price: price,
        });

        const product = await newProduct.save();
        res.send({ message: "Product creation success" });
      }

      console.log(cloudImage);
    } catch (error) {
      console.log(error);
    }
  })
);
producRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    const {
      name,
      images,
      image,
      newImages,
      category,
      slug,
      price,
      description,
      brand,
      New,
      promo,
      vedette,
    } = req.body;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    if (product) {
      const cloudImage = cloudinary.uploader.upload(image, {
        public_id: slug,
        upload_preset: "ml_default",
      });
      const Images = [];
      if (newImages.length !== 0) {
        for (let index = 0; index < newImages.length; index++) {
          const element = newImages[index];
          const upload = async () => {
            try {
              const img = cloudinary.uploader.upload(element, {
                public_id: slug + `${Math.round(Math.random() * 100)}`,
                upload_preset: "ml_default",
              });
              Images.push((await img).secure_url);
              if (Images.length === newImages.length) {
                const images1 = [...images, ...Images];
                product.name = name;
                product.slug = slug;
                product.price = price;
                product.image = `${(await cloudImage).secure_url}`;
                product.images = images1;
                product.category = category;
                product.description = description;
                product.brand = brand;
                product.new = New;
                product.promo = promo;
                product.vedette = vedette;
                await product.save();
                res.send({ message: "Product Updated" });
              }
            } catch (error) {
              console.log(error);
            }
          };
          upload();
        }
      } else {
        try {
          product.name = name;
          product.slug = slug;
          product.price = price;
          product.image = `${(await cloudImage).secure_url}`;
          product.images = images;
          product.category = category;
          product.description = description;
          product.brand = brand;
          product.new = New;
          product.promo = promo;
          product.vedette = vedette;
          await product.save();
          res.send({ message: "Product Updated" });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

producRouter.get("/slug/:slug", async (req, res) => {
  if (req.params.slug) {
    const burger = await Product.findOne({ slug: req.params.slug });
    if (burger) {
      res.send(burger);
    } else {
      res.status(404).send({ message: "Product not Founde" });
    }
  }
});

producRouter.get("/:id", async (req, res) => {
  const burger = await Product.findById(req.params.id);
  if (burger) {
    res.send(burger);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});

export default producRouter;
