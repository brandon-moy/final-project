import React from 'react';
import Modal from '../components/modal';
import AppContext from '../lib/app-context';
import DeleteForm from '../components/modal-components/deletecard';

export default class EditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      show: false,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.question.length || !this.state.answer.length) {
      this.setState({ error: true });
    } else {
      this.context.isLoading();
      const { token } = this.context;
      const cardId = this.props.cardId;
      const req = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        },
        body: JSON.stringify(this.state)
      };
      fetch(`/api/card/${cardId}`, req)
        .then(res => {
          this.context.completeLoading();
          location.href = `/#view-cards?deckId=${this.props.deckId}`;
        })
        .catch(err => {
          console.error(err);
          this.context.isError();
        });
    }
  }

  showModal(event) {
    this.setState({ show: true });
  }

  closeModal(event) {
    this.setState({ show: false });

  }

  componentDidMount() {
    this.context.isLoading();
    const { token } = this.context;
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      }
    };
    fetch(`/api/card/${this.props.cardId}`, req)
      .then(res => res.json())
      .then(data => {
        this.setState(
          {
            question: data.question,
            answer: data.answer,
            deckName: data.deckName
          }
        );
        this.context.completeLoading();
      }
      ).catch(err => {
        console.error(err);
        this.context.isError();
      });
  }

  render() {
    const error = this.state.error ? 'new-card-error' : 'hidden';
    return (
      <>
        <div className='flex just-between align-center wrap'>
          <h1 className='deck-view-name col-2'>
            {this.state.deckName}
          </h1>
          <div className='spacer col-4' />
          <a
          href={`/#add-card?deckId=${this.props.deckId}`}
          className='edit-new-card-deck col-4'>
            <i className='fa-solid fa-circle-plus' />
            Add Card
          </a>
        </div>
        <form className='new-card flex wrap' onSubmit={this.handleSubmit}>
          <label className='edit-card-front col-45 flex just-center align-center'>
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
          <p className={`${error}`}>Question and answer are required fields!</p>
          <div className='col-100 flex just-between'>
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
        <Modal show={this.state.show} color='pink'>
          <DeleteForm
          closeModal={this.closeModal}
          cardId={this.props.cardId}
          deckId={this.props.deckId}
          />
        </Modal>
      </>
    );
  }
}

EditCard.contextType = AppContext;
