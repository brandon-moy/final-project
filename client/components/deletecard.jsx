import React from 'react';

export default class DeleteForm extends React.Component {
  constructor(props) {
    super(props);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  confirmDelete(event) {
    const cardId = this.props.cardId;
    const userId = JSON.stringify(this.context.user.userId);
    const req = {
      method: 'DELETE',
      headers: {
        userId
      }
    };
    fetch(`/api/deletecard/${cardId}`, req)
      .then(res => {
        this.props.closeModal();
        location.href = `/#view-cards?deckId=${this.props.deckId}`;
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <section className='delete-confirm'>
        <h2 className='delete-card-message'>
          Are you sure you want to delete this card?
        </h2>
        <div className='flex just-between'>
          <a
          className='cancel-delete'
          onClick={this.props.closeModal}>
            Cancel
          </a>
          <button
          type='button'
          className='confirm-delete'
          onClick={this.confirmDelete}>
            Continue
          </button>
        </div>
      </section>
    );
  }
}
