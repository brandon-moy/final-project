import React from 'react';
import Modal from '../components/modal';
import DeleteForm from '../components/deletecard';

export default class EditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      show: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    if (event.target.name === 'question') {
      this.setState({ question: value });
    } else {
      this.setState({ answer: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const cardId = this.props.cardId;
    const req = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/card/${cardId}`, req)
      .then(res => {
        location.href = `/#view-cards?deckId=${this.props.deckId}`;
      })
      .catch(err => console.error(err));
  }

  showModal(event) {
    this.setState({ show: true });
  }

  closeModal(event) {
    this.setState({ show: false });

  }

  componentDidMount() {
    fetch(`/api/card/${this.props.cardId}`)
      .then(res => res.json())
      .then(data => this.setState(
        {
          question: data.question,
          answer: data.answer,
          deckName: data.deckName
        }
      ));
  }

  render() {
    return (
      <div className='edit-card-page'>
        <div className='flex just-between align-center wrap'>
          <h1 className='deck-view-name col-2'>
            {this.state.deckName}
          </h1>
          <div className='spacer col-4' />
          <a
          href={`/#add-card?deckId=${this.props.deckId}`}
          className='new-card-deck col-4'>
            <i className='fa-solid fa-circle-plus' />
            Add Card
          </a>
        </div>
        <form className='new-card flex wrap' onSubmit={this.handleSubmit}>
          <label className='card-front col-45 flex just-center align-center'>
            <textarea
            name='question'
            type='text'
            value={this.state.question}
            className='card-question'
            onChange={this.handleChange} />
          </label>
          <label className='card-back col-45'>
            <div className='flash-card-repeating-blue flex just-center align-f-start'>
              <textarea
              name='answer'
              type='text'
              value={this.state.answer}
              className='card-answer'
              onChange={this.handleChange} />
            </div>
          </label>
          <div className='col-100'>
            <button
            id='deletecard'
            className='delete-show-modal'
            type='button'
            onClick={this.showModal}>
              Delete Card
            </button>
            <button className='add-card-button'>
              Save
            </button>
          </div>
        </form>
        <Modal show={this.state.show} >
          <DeleteForm
          closeModal={this.closeModal}
          cardId={this.props.cardId}
          deckId={this.props.deckId}
          />
        </Modal>
      </div>
    );
  }
}
