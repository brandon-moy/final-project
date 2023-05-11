import React from 'react';

export default class PageFour extends React.Component {
  render() {
    return (
      <section className='page-four-container'>
        <p data-testid='tour-title' className='tour-page-title'>
          StudyBuddy
        </p>
        <i data-testid='point-arrows' className="fa-solid fa-angles-up arrow-4" />
        <section className='text-box-4'>
          <h3 data-testid='page-four-instructions' className='main-box-text-4'>
            Also, clicking the title at any point will
            bring you back to the home screen.
          </h3>
        </section>
      </section>
    );
  }
}
