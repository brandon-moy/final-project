import React from 'react';

export default class DeleteDeck extends React.Component {
  render() {
    return (
      <section className='delete-confirm'>
        <h2 className='delete-card-message'>
          Are you sure you want to delete this deck?
        </h2>
        <h1 className='delete-deck-name'>
          DECK NAME HERE
        </h1>
        <p className='delete-warning'>
          Deleting this deck will delete all flashcards associated with this deck!
        </p>
        <div className='flex jsb'>
          <a className='cancel-delete'>Cancel</a>
          <a className='confirm-delete'>Confirm</a>
        </div>
      </section>
    );
  }
}
