import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageLayout from '../Components/ImageLayout';

const SearchView = () => {
  const navigate = useNavigate();
  const { searchValue } = useParams();
  const [results, setResults] = useState([]);
  const [images, setImages] = useState([]);
  const [searchInformation, setSearchInformation] = useState({});
  const [imageSearchInformation, setImageSearchInformation] = useState({});
  const [searchVal, setSearchVal] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/google/search-web/${searchValue}/1`)
      .then((response) => {
        setResults(response.data.results);
        setSearchInformation(response.data.searchInformation);
      })
      .catch((error) => {
        toast.error('Maximum quota of 100 set by Google reached!', {
          id: 'test',
        });
        setTimeout(() => navigate('/'), 2000);
      });
    axios
      .get(`http://localhost:5000/api/google/search-images/${searchValue}/1`)
      .then((response) => {
        setImages(response.data.images);
        setImageSearchInformation(response.data.searchInformation);
      })
      .catch((error) => {
        toast.error('Maximum quota of 100 set by Google reached!', {
          id: 'test',
        });
        setTimeout(() => navigate('/'), 2000);
      });
  }, [searchValue]);

  const handleSearch = (i) => {
    axios
      .get(`http://localhost:5000/api/google/search-web/${searchValue}/${i}`)
      .then((response) => {
        setResults(response.data.results);
      })
      .catch((error) => {
        toast.error('Maximum quota of 100 set by Google reached!', {
          id: 'test',
        });
        setTimeout(() => navigate('/'), 2000);
      });
  };

  const renderPaginationButtons = () => {
    let elements = [];
    for (let i = 1; i <= 10; i++) {
      elements.push(
        <li
          className={pageNumber == i ? 'page-item active' : 'page-item'}
          onClick={() => {
            setResults([]);
            setPageNumber(i);
            handleSearch(i);
          }}
          style={{ cursor: 'pointer', border: 'none' }}
        >
          {pageNumber == i ? (
            <span class='page-link'>
              {i}
              <span class='sr-only'>(current)</span>
            </span>
          ) : (
            <a class='page-link'>{i}</a>
          )}
        </li>
      );
    }
    return elements;
  };

  return (
    <>
      <Toaster />
      <div class='container d-flex justify-content-center'>
        <div className='container-content-wrapper'>
          <div className='row'>
            <div className='col-6'>
              <a
                class='logo'
                href='/'
                alt='Go to Info.com Homepage'
                aria-label='Go to Info.com Homepage'
                style={{ userSelect: 'none' }}
              >
                <span className='header-title-1'>letsfind</span>
                <span className='header-title-2'>.live</span>
              </a>
            </div>
            <div className='col-md-6'>
              <form class='search-form my-form'>
                <label
                  class='search-form__label screen-reader-text'
                  for='search'
                >
                  Search
                </label>
                <input
                  type='search'
                  class='search-form__text-input search-input'
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
                    setResults([]);
                    setImages([]);
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
            </div>
          </div>
          <div class='searchTools'>
            <ul class='searchToolOptions'>
              <Tabs>
                <TabList>
                  <Tab>Web</Tab>
                  <Tab>Images</Tab>
                </TabList>
                <TabPanel>
                  {results.length !== 0 ? (
                    <div class='searchResults'>
                      <p class='numberOfResults'>
                        About {searchInformation.formattedTotalResults} results
                        ({searchInformation.formattedSearchTime} seconds)
                      </p>
                      {results.map((result) => {
                        return (
                          <div class='result'>
                            <h2>
                              <a target='_blank' href={result.link}>
                                {result.title}
                              </a>
                            </h2>
                            <a target='_blank' class='link' href={result.link}>
                              {result.formattedUrl}
                            </a>
                            <p>{result.snippet}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      class='d-flex justify-content-center align-items-center'
                      style={{ height: '71vh' }}
                    >
                      <div
                        class='spinner-border text-primary'
                        role='status'
                        style={{ width: '70px', height: '70px' }}
                      >
                        <span class='sr-only'>Loading...</span>
                      </div>
                    </div>
                  )}
                  <nav
                    className='d-flex justify-content-center mb-3'
                    aria-label='Page navigation example'
                  >
                    <ul class='pagination'>{renderPaginationButtons()}</ul>
                  </nav>
                </TabPanel>
                <TabPanel>
                  {images ? (
                    <ImageLayout
                      images={images}
                      setImages={setImages}
                      searchValue={searchValue}
                      imageSearchInformation={imageSearchInformation}
                      setImageSearchInformation={setImageSearchInformation}
                    />
                  ) : (
                    <div
                      class='d-flex justify-content-center align-items-center'
                      style={{ height: '71vh' }}
                    >
                      <div
                        class='spinner-border text-primary'
                        role='status'
                        style={{ width: '70px', height: '70px' }}
                      >
                        <span class='sr-only'>Loading...</span>
                      </div>
                    </div>
                  )}
                </TabPanel>
              </Tabs>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchView;
