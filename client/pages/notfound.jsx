import React from 'react';

export default function NotFound(props) {
  return (
    <div className='flex wrap'>
      <h3 className='not-found-text c-100'>
        Sorry, we could not find the page you were looking for!
      </h3>
      <a className='return-home' href='#'>Return Home</a>
    </div>
  );
}
