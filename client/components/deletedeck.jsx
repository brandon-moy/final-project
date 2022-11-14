import React from 'react';

export default class DeleteDeck extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDeck = this.deleteDeck.bind(this);
  }

  deleteDeck(event) {
    const deckId = this.props.deckId;
    const req = {
      method: 'DELETE'
    };
    fetch(`/api/deletedeck/${deckId}`, req)
      .then(res => {
        this.props.submitModal();
      })
      .catch(err => console.error(err));
  }

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
          <button
          type='button'
          className='cancel-delete'
          onClick={this.props.closeModal}>
            Cancel
          </button>
          <button
          type='button'
          className='confirm-delete'
          onClick={this.deleteDeck}>
            Confirm
          </button>
        </div>
      </section>
    );
  }
}
