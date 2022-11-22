import React from 'react';
import AppContext from '../../lib/app-context';

export default class PageOne extends React.Component {
  render() {
    return (
      <section className='page-one-container'>
        <div className='flex just-f-end'>
          <section className='text-box'>
            <h3 className='main-box-text'>
              Welcome to StudyBuddy! You must be the new student. Would you like a tour?
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
        </div>
      </section>
    );
  }
}

PageOne.contextType = AppContext;
