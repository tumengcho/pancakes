import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';

export const UploadProduct = () => {
  const [file, setFile] = useState('');
  const [image, setImage] = useState('Choose file');
  const [uploadedFile, setUploadedFile] = useState({});
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [vedette, setVedette] = useState(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setImage(e.target.files[0].name);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      console.log('noo');
      return;
    }

    try {
      const test = await axios.post('/api/products/add', {
        name,
        slug,
        description,
        price,
        image,
        vedette,
        category,
      });

      console.log(test);
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  return (
    <Container className="mt-5 pt-5" style={{ maxWidth: '800px' }}>
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
            }}
          >
            <option value="">Choisis une Category</option>
            <option value="shoes">Souliers</option>
            <option value="clothes">Vetement</option>
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
        <Form.Group className="mb-3" controlId="customFile">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" required onChange={onChange} />
          <img src={image}></img>
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
