import React from 'react';
import AppContext from '../../lib/app-context';

export default class ResetKnowledge extends React.Component {
  constructor(props) {
    super(props);
    this.resetDeck = this.resetDeck.bind(this);
  }

  async resetDeck() {
    try {
      const { token } = this.context;
      const req = {
        method: 'PATCH',
        headers: {
          'X-Access-Token': token
        }
      };
      const response = await fetch(`/api/deck/confidence/${this.props.deck.deckId}`, req);
      if (response.ok) {
        this.props.confirmReset();
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <section className='reset-confirm'>
        <h3 className='reset-knowledge-message'>
          Are you sure you want to reset this deck?
        </h3>
        <h1 className='reset-deck-name'>
          {this.props.deck.deckName}
        </h1>
        <p className='reset-warning'>
          Resetting this deck will set the confidence for
          all flashcards associated with this deck to 0!
        </p>
        <div className='flex just-between'>
          <button
          type='button'
          className='cancel-reset'
          onClick={this.props.closeModal}>
            Cancel
          </button>
          <button
          type='button'
          className='confirm-reset'
          onClick={this.resetDeck}>
            Confirm
          </button>
        </div>
      </section>
    );
  }
}

ResetKnowledge.contextType = AppContext;
