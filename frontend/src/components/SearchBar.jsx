import { useEffect, useReducer, useState } from 'react';

import './SearchBar.css';
import axios from 'axios';
import { getError } from '../utils';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const SearchBar = ({ setResults, setValue }) => {
  const [input, setInput] = useState('');
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const data = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
        console.log(product);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const fetchData = async (value) => {
    const results = product.filter((product) => {
      return (
        value &&
        product &&
        product.name &&
        product.name.toLowerCase().includes(value)
      );
    });
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    setValue(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <i className="fa fa-search me-3"></i>
      <input
        placeholder="Type to search..."
        value={input}
        id="search"
        onChange={(e) => handleChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
};
