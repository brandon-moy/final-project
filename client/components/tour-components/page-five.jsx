import React from 'react';
import AppContext from '../../lib/app-context';

export default class PageFive extends React.Component {
  render() {
    return (
      <section className='page-one-container'>
        <section className='text-box'>
          <h3 className='main-box-text-5'>
            Let&apos;s go and make our first deck!
          </h3>
          <div className='flex just-center'>
            <button
          type='button'
          className='get-started-button'
          onClick={this.context.endTour}>
              Get Started!
            </button>
          </div>
        </section>
      </section>
    );
  }
}

PageFive.contextType = AppContext;
