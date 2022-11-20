import React from 'react';

export default class PageTwo extends React.Component {
  render() {
    return (
      <section className='page-two-container'>
        <h1 className='new-deck-back-2' >
          New Deck
        </h1>
        <i className="fa-solid fa-angles-up arrow-2" />
        <div className='flex just-f-end'>
          <section className='text-box-2'>
            <h3 className='main-box-text'>
              Great! First thing you &apos;ll need is a deck of cards.
              This is where you&apos;ll create a new deck!
            </h3>
          </section>
        </div>
      </section>
    );
  }
}
