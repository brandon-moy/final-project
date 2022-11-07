import React from 'react';

export default class Modal extends React.Component {
  render() {
    if (!this.props.show) return null;
    return (
      <div className='modal-background'>
        <h1>OH HEY I WORK</h1>
      </div>
    );
  }
}
