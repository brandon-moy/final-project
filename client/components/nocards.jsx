import React from 'react';

export default class NoCards extends React.Component {
  render() {
    return (
      <>
        <h1 className='no-cards-head'>
          It looks like you don&apos;t have any cards in this deck yet...
        </h1>
        <h2 className='no-cards-message'>
          Let&apos;s add some cards!
        </h2>
        <div className='flex just-center'>
          <a
          className='no-card-add'
          href={`/#add-card?deckId=${this.props.deckId}`}>
            Here
          </a>
        </div>
      </>
    );
  }
}
