import React from 'react';

export default class DeleteDeck extends React.Component {
  render() {
    return (
      <section className='delete-confirm'>
        <h3 className='delete-deck-message'>
          Are you sure you want to delete this deck?
        </h3>
        <h1 className='delete-deck-name'>
          {this.props.deckName}
        </h1>
        <p className='delete-warning'>
          Deleting this deck will delete all flashcards associated with this deck!
        </p>
        <div className='flex jsb'>
          <a href='#' className='cancel-delete' onClick={this.props.closeModal}>Cancel</a>
          <a className='confirm-delete'>Confirm</a>
        </div>
      </section>
    );
  }
}
