import React from 'react';
import Container from 'react-bootstrap/Container';

export default function Contact() {
  return (
    <div className="pb-5">
      <Container className="pb-5 mb-5">
        <h1 className="mt-5 pt-5 titre fs-1 text-center">Contactez-Nous.</h1>
        <p className="mt-2 mb-5 fs-6 description1 fw-lignt text-center">
          Remplissez simplement ce formulaire.
        </p>

        <Container class="container mt-5 pt-3" style={{ maxWidth: '800px' }}>
          <form className="row input-group">
            <div className="col-md-6">
              <label className="mb-md-3" for="Nom">
                Nom
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Entrez votre nom"
                aria-label="Nom"
                id="Nom"
                required
              />
            </div>

            <div className="col-md-6">
              <label className=" mb-md-3 mt-md-0 mt-4" for="Email">
                Email
              </label>
              <input
                type="text"
                class="form-control col-md-6"
                placeholder="Entrez votre email"
                aria-label="Email"
                id="Email"
                required
              />
            </div>
            <div className="col-0 mt-5">
              <label className=" mb-3" for="message">
                Message
              </label>
              <textarea
                class="form-control"
                aria-label="message"
                placeholder="Écrivez votre message"
                rows={10}
                id="message"
                required
              ></textarea>
            </div>
            <button
              className="col mt-4 bg-black text-uppercase text-white mx-2 py-2"
              type="submit"
            >
              <p className="p-0 m-0 btn-submit">Submit</p>
            </button>
          </form>
        </Container>
      </Container>
    </div>
  );
}
