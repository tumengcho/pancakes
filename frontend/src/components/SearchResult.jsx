import { useState } from 'react';
import './SearchResult.css';
import Card from 'react-bootstrap/esm/CardHeader';
import { Link } from 'react-router-dom';
export const SearchResult = ({ result, value, setDisplay }) => {
  var resultat = `${result.name}`;
  var valeur = `${value}`;
  const lettres = [];
  for (let index = 0; index < result.name.length; index++) {
    const lettre = resultat.charAt(index);

    lettres.push(lettre);
  }

  return (
    <div id="search-result" className="col-md-4 col-12 mb-5">
      <Link
        to={`/products/${result.slug}`}
        className="text-black"
        style={{ textDecoration: 'none' }}
        onClick={() => {
          setDisplay(false);
          console.log('hey');
        }}
      >
        <Card>
          <img
            src={result.image}
            alt={result.name}
            className="img-search"
          ></img>
        </Card>
        <span>
          {lettres.map((e) => {
            if (valeur.toLowerCase().includes(e.toLowerCase())) {
              return <b>{e}</b>;
            }
            return e;
          })}
        </span>
      </Link>
    </div>
  );
};
