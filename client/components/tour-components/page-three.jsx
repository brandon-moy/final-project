import React from 'react';

export default class PageThree extends React.Component {
  render() {
    return (
      <>
        <div className='scene tour-folder'>
          <div className='folder'>
            <div className='folder-front t-center'>
              <h1 className='deck-text'>
                Your Deck
              </h1>
              <i className="fa-solid fa-hand-pointer" />
              <div className="lds-ripple"><div /><div /></div>
            </div>
            <div className='option-paper'/>
            <div className='folder-tab' />
            <div className='folder-back t-center' />
          </div>
        </div>
        <section className='page-three-container'>
          <section className='text-box'>
            <h3 className='main-box-text'>
              Once you&apos;ve created your deck, you&apos;ll be able to view it
              and click on it to see the option.
            </h3>
          </section>
          <img className='tour-image' src='/place.png' />
        </section>
      </>
    );
  }
}
