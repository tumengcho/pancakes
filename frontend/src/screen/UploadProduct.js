import React, { Fragment, useEffect, useReducer, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { getError } from "../utils";
import logger from "use-reducer-logger";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UploadProduct = () => {
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [vedette, setVedette] = useState(false);
  const [promo, setPromo] = useState(false);
  const [New, setNew] = useState(false);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const navigate = useNavigate();

  const uploadImage = async (file) => {
    const base64 = await convertBase64(file);

    document.getElementById("product_photo_1_result").innerHTML +=
      '<div class="col-3"><img src="' +
      base64 +
      '" id="product_photo_1[]" /></div>';
  };

  const onChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    let files = e.target.files;
    const Images = [];
    for (let index = 1; index < files.length; index++) {
      uploadImage(files[index]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[index]);
      reader.onload = () => {
        Images.push(reader.result);
      };
    }
    setImages(Images);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      console.log("noo");
      return;
    }

    try {
      console.log(brand);
      console.log(New);
      console.log(promo);

      const test = await axios.post("/api/products/add", {
        name,
        slug,
        description,
        price,
        image,
        images,
        vedette,
        brand,
        New,
        promo,
        category,
      });
      toast.success("Produit créé avec succés");
      navigate("/produits");

      console.log(test);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  return (
    <Container className="mt-5 text-white pt-5" style={{ maxWidth: "800px" }}>
      <Form onSubmit={onSubmit}>
        <div>
          <input type="text" />
        </div>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            required
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="slug">
          <Form.Label>Slug</Form.Label>
          <Form.Control
            type="text"
            required
            autoComplete="off"
            onChange={(e) => {
              setSlug(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>description</Form.Label>
          <Form.Control
            type="text"
            required
            autoComplete="off"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="brand">
          <Form.Label>La Marque</Form.Label>
          <Form.Control
            type="text"
            required
            autoComplete="off"
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            required
            autoComplete="off"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Category">
          <Form.Select
            required
            aria-label="Default select example"
            onChange={(e) => {
              setCategory(e.target.value);
              console.log(category);
            }}
          >
            <option value="" selected>
              Choisis une Category
            </option>
            <option value="shoes">Souliers</option>
            <option value="clothes">Vetement</option>
            <option value="jersey">Maillot</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="vedette">
          <Form.Check
            type="checkbox"
            label="Vedette"
            onChange={() => {
              setVedette((current) => !current);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="New">
          <Form.Check
            type="checkbox"
            label="Nouveaute"
            onChange={() => {
              setNew((current) => !current);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Promo">
          <Form.Check
            type="checkbox"
            label="Promotion"
            onChange={() => {
              setPromo((current) => !current);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="customFile">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            multiple="multiple"
            required
            onChange={onChange}
          />
          <img src={image}></img>
          <div className="row" id="product_photo_1_result"></div>
          {console.log(images)}
        </Form.Group>
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </Form>
    </Container>
  );
};
