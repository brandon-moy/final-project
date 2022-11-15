import React from 'react';

export default class ResetKnowledge extends React.Component {
  render() {
    return (
      <section className='reset-confirm'>
        <h3 className='reset-knowledge-message'>
          Are you sure you want to reset this deck?
        </h3>
        <h1 className='reset-deck-name'>
          {this.props.deckName}
        </h1>
        <p className='reset-warning'>
          Resetting this deck will set all falshcards associated with this deck to 0!
        </p>
        <div className='flex just-between'>
          <button
          type='button'
          className='cancel-reset'>
            Cancel
          </button>
          <button
          type='button'
          className='confirm-reset'>
            Confirm
          </button>
        </div>
      </section>
    );
  }
}
