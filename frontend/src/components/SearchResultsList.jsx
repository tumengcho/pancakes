import './SearchResultsList.css';
import { SearchResult } from './SearchResult';
import { useState } from 'react';

export const SearchResultsList = ({ results, value }) => {
  console.log(value);
  const [display, setDisplay] = useState(true);
  if (display) {
    return (
      <div
        onLoad={() => {
          setDisplay(true);
        }}
        className="row mt-5 p-md-5 p-0 align-items-center results-list"
      >
        {results.map((result, id) => {
          return (
            <SearchResult
              setDisplay={setDisplay}
              result={result}
              value={value}
              key={id}
            />
          );
        })}
      </div>
    );
  }
};
