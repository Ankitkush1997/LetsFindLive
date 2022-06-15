import React, { useState } from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');

  return (
    <div>
      <Header />
      <section class='hero hero--home hero--no-description'>
        <h1 class='hero__heading'>The Smarter Way to Search The Web.</h1>
        <form class='search-form'>
          <label class='search-form__label screen-reader-text' for='search'>
            Search
          </label>
          <input
            type='search'
            class='search-form__text-input'
            id='search'
            placeholder='Search'
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button
            class='search-form__search-button'
            aria-label='Search site'
            onClick={(e) => {
              e.preventDefault();
              navigate(`/search/${searchVal}`);
            }}
          >
            <svg
              class='search-form__icon'
              aria-hidden='true'
              width='25'
              height='25'
              viewBox='0 0 25 25'
            ></svg>
          </button>
        </form>
      </section>
    </div>
  );
};

export default HomeView;
