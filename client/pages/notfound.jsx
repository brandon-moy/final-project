import React from 'react';

export default function NotFound(props) {
  return (
    <div className='flex wrap just-center'>
      <h3 className='not-found-text c-100'>
        Sorry, we could not find the page you were looking for!
      </h3>
      <img className='not-found-img' src='place.png' />
      <a className='return-home col-100' href='#'>
        Return Home
      </a>
    </div>
  );
}
