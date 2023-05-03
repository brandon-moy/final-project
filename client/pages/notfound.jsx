import React from 'react';

export default function NotFound(props) {
  return (
    <div className='flex wrap just-center'>
      <h3 data-testid='not-found-text' className='not-found-text c-100'>
        Sorry, we could not find the page you were looking for!
      </h3>
      <div className='col-100 flex just-center'>
        <img alt='Not Found Image' className='not-found-img' src='/images/shocked.webp' />
      </div>
      <a data-testid='not-found-return' className='return-home col-100' href='#'>
        Return Home
      </a>
    </div>
  );
}
