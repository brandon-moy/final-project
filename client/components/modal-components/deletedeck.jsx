import React from 'react';
import AppContext from '../../lib/app-context';

export default class DeleteDeck extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDeck = this.deleteDeck.bind(this);
  }

  deleteDeck(event) {
    const { token } = this.context;
    const deckId = this.props.deck.deckId;
    const req = {
      method: 'DELETE',
      headers: {
        'X-Access-Token': token
      }
    };
    fetch(`/api/deletedeck/${deckId}`, req)
      .then(res => {
        this.props.confirmDelete();
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
          {this.props.deck.deckName}
        </h1>
        <p className='delete-warning'>
          Deleting this deck will delete all flashcards associated with this deck!
        </p>
        <div className='flex just-between'>
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

DeleteDeck.contextType = AppContext;
