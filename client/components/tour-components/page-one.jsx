import React from 'react';
import AppContext from '../../lib/app-context';

export default class PageOne extends React.Component {
  render() {
    return (
      <section className='page-one-container'>
        <section className='text-box'>
          <h3 className='main-box-text'>
            Hey there, welcome to Page Title! Would you like a tour?
          </h3>
          <div className='flex just-even'>
            <button
            type='button'
            className='tour-button'
            onClick={this.props.startTour}>
              Yes
            </button>
            <button
            type='button'
            className='tour-button'
            onClick={this.context.endTour}>
              No
            </button>
          </div>
        </section>
        <img className='tour-image' src='/place.png'/>
      </section>
    );
  }
}

PageOne.contextType = AppContext;
