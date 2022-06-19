import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const ImageLayout = ({
  images,
  setImages,
  searchValue,
  imageSearchInformation,
  setImageSearchInformation,
}) => {
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(2);

  const getNextData = () => {
    axios
      .get(
        `https://search.letsfind.live/api/google/search-images/${searchValue}/${pageNum}`
      )
      .then((response) => {
        console.log(response.data);
        setPageNum((prevPageNum) => prevPageNum + 1);
        const newImages = images.concat(response.data.images);
        setImages(newImages);
        setImageSearchInformation(response.data.searchInformation);
      })
      .catch((error) => {
        toast.error('Maximum quota of 100 set by Google reached!', {
          id: 'test',
        });
        setTimeout(() => navigate('/'), 2000);
      });
  };

  const limitText = (str, limit) => {
    if (str.length > limit) {
      str = str.slice(0, -(str.length - limit));
      str = str + '...';
    }
    return str;
  };

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={getNextData}
      hasMore={pageNum <= 9}
      loader={
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
      }
    >
      <div className='all-images-holder'>
        {imageSearchInformation ? (
          <p class='numberOfResults'>
            About {imageSearchInformation.formattedTotalResults} results (
            {imageSearchInformation.formattedSearchTime} seconds)
          </p>
        ) : null}
        <div className='row'>
          {images.map((image) => {
            return (
              <div className='col-lg-3 col-md-4 col-sm-6 mb-2'>
                <div className='image-holder d-flex justify-content-center'>
                  <a href={image.link} target='_blank' rel="noreferrer">
                    <img
                      alt='imag'
                      style={{
                        width: image.image.thumbnailWidth,
                        height: image.image.thumbnailHeight,
                      }}
                      src={image.link}
                    />
                  </a>
                </div>
                <div className='image-text-holder'>
                  <div className='image-title'>
                    <a href={image.image.contextLink} target='_blank' rel="noreferrer">
                      {limitText(image.title, 29)}
                    </a>
                  </div>
                  <a
                    href={image.image.contextLink}
                    target='_blank'
                    className='image-display-link' rel="noreferrer"
                  >
                    {limitText(image.displayLink, 29)}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default ImageLayout;
