import React from 'react';

export default class Modal extends React.Component {

  render() {
    if (!this.props.show) return null;
    return (
      <div className='modal-background'>
        <div className='sticky-container'>
          <div className='sticky-outer'>
            <div className='sticky'>
              <svg width='0' height='0'>
                <defs>
                  <clipPath id='stickyClip' clipPathUnits='objectBoundingBox'>
                    <path d='M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0'
                      />
                  </clipPath>
                </defs>
              </svg>
              <div className={`sticky-content ${this.props.color}`}>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
