import React from 'react';
import AppContext from '../lib/app-context';
import Modal from '../components/modal';
import StudyOptions from '../components/modal-components/studyoptions';

export default class ViewCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      cards: null,
      show: false
    });
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal(event) {
    this.setState({
      show: true
    });
  }

  closeModal(event) {
    this.setState({
      show: false
    });
  }

  async loadDeckInfo() {
    try {
      this.context.isLoading();
      const { token } = this.context;
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        }
      };
      const response = await fetch(`/api/cards/${this.props.deckId}`, req);
      if (response.ok) {
        const data = await response.json();
        const { deckName } = data[0];
        this.setState({
          cards: data,
          deckName
        });
        this.context.completeLoading();
      }
    } catch (err) {
      console.error(err);
      this.context.isError();
    }
  }

  componentDidMount() {
    this.loadDeckInfo();
  }

  renderCards() {
    if (!this.state.cards[0].question) return;
    const cards = this.state.cards.map(card => {
      return (
        <div key={card.cardId} id={card.cardId} className='card-set flex wrap'>
          <div className='card-front col-45 flex just-center align-center'>
            <div className={`view-highlight confidence-${card.confidence}`} />
            <h1 className='view-card-question'>
              {card.question}
            </h1>
          </div>
          <div className='card-back col-45'>
            <div className='flash-card-repeating-blue flex just-center'>
              <h2 className='view-card-answer'>
                {card.answer}
              </h2>
            </div>
          </div>
          <div className='spacer col-2' />
          <a
          href={`/#edit-card?deckId=${this.props.deckId}&cardId=${card.cardId}`}
          className='deck-edit-card col-2'>
            <i className='fa-solid fa-pencil' />
            Edit Card
          </a>
        </div>
      );
    });
    return cards;
  }

  render() {
    if (!this.state.cards) return;
    return (
      <>
        <div className='flex just-between align-center wrap'>
          <h1 className='deck-view-name col-2'>
            {this.state.deckName}
          </h1>
          <button
            type='button'
            onClick={this.showModal}
            className='view-study-button'>
            <i className='fa-solid fa-graduation-cap' />
            Study Cards
          </button>
          <a
          href={`/#add-card?deckId=${this.props.deckId}`}
          className='new-card-deck col-4'>
            <i className='fa-solid fa-circle-plus' />
            Add Card
          </a>
        </div>
        { this.renderCards() }
        <Modal show={this.state.show} color='blue'>
          <StudyOptions
            deck={this.props.deckId}
            closeModal={this.closeModal}
          />
        </Modal>
      </>
    );
  }
}

ViewCards.contextType = AppContext;
