import React from 'react';

export default class PageFour extends React.Component {
  render() {
    return (
      <section className='page-four-container'>
        <p className='tour-page-title'>
          Page Title
        </p>
        <i className="fa-solid fa-angles-up arrow-4" />
        <section className='text-box-4'>
          <h3 className='main-box-text-4'>
            Also, clicking the title are any point will
            bring you back to this home screen
          </h3>
        </section>
      </section>
    );
  }
}
