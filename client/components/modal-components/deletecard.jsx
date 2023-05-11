import React from 'react';
import AppContext from '../../lib/app-context';

export default class DeleteForm extends React.Component {
  constructor(props) {
    super(props);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  async confirmDelete(event) {
    try {
      const cardId = this.props.cardId;
      const { token } = this.context;
      const req = {
        method: 'DELETE',
        headers: {
          'X-Access-Token': token
        }
      };
      const response = await fetch(`/api/deletecard/${cardId}`, req);
      if (response.ok) {
        this.props.closeModal();
        location.href = `/#view-cards?deckId=${this.props.deckId}`;
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <section className='delete-confirm'>
        <h2 data-testid='delete-card-header' className='delete-card-message'>
          Are you sure you want to delete this card?
        </h2>
        <div className='flex just-between'>
          <a
          data-testid='cancel-delete'
          className='cancel-delete'
          onClick={this.props.closeModal}>
            Cancel
          </a>
          <button
          type='button'
          data-testid='confirm-delete'
          className='confirm-delete'
          onClick={this.confirmDelete}>
            Continue
          </button>
        </div>
      </section>
    );
  }
}

DeleteForm.contextType = AppContext;
