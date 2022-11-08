import React from 'react';

export default class AddCard extends React.Component {
  render() {
    return (
      <form className='new-card flex wrap'>
        <div className='new-card-front column-45'>
          <input type='text' />
        </div>
        <div className='new-card-back column-45'>
          <div className='flash-card-single-red'>
            <div className='flash-card-repeating-blue'>
              <input type='text' />
            </div>
          </div>
        </div>
        <button className='column-full add-card-button'>Save</button>
      </form>
    );
  }
}
