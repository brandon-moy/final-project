import React from 'react';
import Modal from '../components/modal';
import NewDeck from '../components/newdeck';
import DeleteDeck from '../components/deletedeck';
import ResetKnowledge from '../components/resetknowledge';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      decks: null,
      currentShowing: null,
      lastShowing: null,
      show: false,
      resettingDeck: null,
      deletingDeck: null,
      creatingDeck: false
    });

    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);

    this.closeModal = this.closeModal.bind(this);

    this.createDeck = this.createDeck.bind(this);
    this.submitDeck = this.submitDeck.bind(this);

    this.deleteDeck = this.deleteDeck.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);

    this.resetDeck = this.resetDeck.bind(this);
    this.confirmReset = this.confirmReset.bind(this);
  }

  showOptions(event) {
    const lastShowing = this.state.currentShowing;
    this.setState({
      currentShowing: event.target.id,
      lastShowing
    });
  }

  hideOptions(event) {
    const lastShowing = this.state.currentShowing;
    this.setState({
      currentShowing: null,
      lastShowing
    });
  }

  createDeck(event) {
    this.setState({
      show: true,
      creatingDeck: true
    });
  }

  submitDeck() {
    fetch('/api/decks')
      .then(res => res.json())
      .then(data => {
        this.setState({
          show: false,
          creatingDeck: false,
          decks: data
        });
      })
      .catch(err => console.error(err));
  }

  deleteDeck(event) {
    const deckId = Number(event.currentTarget.getAttribute('data-deck'));
    const deck = this.state.decks.filter(deck => deck.deckId === deckId);
    this.setState({
      show: true,
      deletingDeck: deck[0]
    });
  }

  confirmDelete() {
    const location = this.state.decks.indexOf(this.state.deletingDeck);
    const decksCopy = [...this.state.decks];
    decksCopy.splice(location, 1);
    this.setState({
      show: false,
      decks: decksCopy,
      deletingDeck: null
    });
  }

  resetDeck(event) {
    const deckId = Number(event.currentTarget.getAttribute('data-deck'));
    const deck = this.state.decks.filter(deck => deck.deckId === deckId);
    this.setState({
      show: true,
      resettingDeck: deck[0]
    });
  }

  confirmReset() {
    const location = this.state.decks.indexOf(this.state.resettingDeck);
    const decksCopy = [...this.state.decks];
    decksCopy[location].totalConfidence = '0';
    this.setState({
      show: false,
      decks: decksCopy,
      resettingDeck: null
    });
  }

  closeModal(event) {
    this.setState({
      show: false,
      creatingDeck: false,
      resettingDeck: null,
      deletingDeck: null
    });
  }

  componentDidMount() {
    fetch('/api/decks')
      .then(res => res.json())
      .then(data => this.setState({ decks: data }))
      .catch(err => console.error(err));
  }

  renderModalForm() {
    return (
      <>
        { this.state.deletingDeck !== null &&
        <DeleteDeck
          deck={this.state.deletingDeck}
          closeModal={this.closeModal}
          confirmDelete={this.confirmDelete}
        />
      },
        { this.state.resettingDeck !== null &&
        <ResetKnowledge
          deck={this.state.resettingDeck}
          closeModal={this.closeModal}
          confirmReset={this.confirmReset}
        />
      },
        { this.state.creatingDeck !== false &&
        <NewDeck
          closeModal={this.closeModal}
          submitDeck={this.submitDeck}
        />
      }
      </>
    );
  }

  render() {
    if (!this.state.decks) return;
    const renderedDecks = this.state.decks.map(deck => {
      const showPaper = (Number(this.state.currentShowing) === deck.deckId)
        ? 'is-showing'
        : (Number(this.state.lastShowing) === deck.deckId)
            ? 'hiding'
            : '';
      const maxConfidence = deck.cardCount * 5;
      const confidencePercent = !maxConfidence
        ? 0
        : Math.floor((deck.totalConfidence / maxConfidence) * 100);
      return (
        <div key={deck.deckId} className='scene col-3'>
          <div className='folder'>
            <div
            className='folder-front t-center'
            id={deck.deckId}
            onClick={this.showOptions}>
              <h1 className='deck-text'>
                {deck.deckName}
              </h1>
            </div>
            <div
            className={`option-paper ${showPaper}`}
            onClick={this.hideOptions}>
              <div className='stripes'>
                <h1 className='deck-title'>
                  {deck.deckName}
                </h1>
                <section
                className='options-container flex wrap just-between'
                id={deck.deckName}>
                  <a
                  href={`/#add-card?deckId=${deck.deckId}`}
                  className='card-option'>
                    <i className='fa-solid fa-circle-plus' />
                    Add Cards
                  </a>
                  <a
                  href={`/#study-cards?deckId=${deck.deckId}`}
                  className='card-option'>
                    <i className='fa-solid fa-graduation-cap' />
                    Study Cards
                  </a>
                  <a
                  href={`/#view-cards?&deckId=${deck.deckId}`}
                  className='card-option'>
                    <i className='fa-solid fa-glasses' />
                    View Cards
                  </a>
                  <button
                  type='button'
                  id='deletedeck'
                  data-deck={deck.deckId}
                  onClick={this.deleteDeck}
                  className='card-option delete-deck-button'>
                    <i className='fa-solid fa-trash-can' />
                    Delete Deck
                  </button>
                  <meter
                  className='confidence-meter'
                  max='100'
                  low='57'
                  high='78'
                  optimum='100'
                  value={confidencePercent} />
                  <p className='confidence-percent'>
                    {confidencePercent}%
                  </p>
                  <button
                  type='button'
                  id='resetknowledge'
                  data-deck={deck.deckId}
                  onClick={this.resetDeck}
                  className='reset-knowledge-button' >
                    <i className='fa-solid fa-arrow-rotate-left' />
                  </button>
                </section>
              </div>
            </div>
            <div className='folder-tab' />
            <div className='folder-back t-center' />
          </div>
        </div>
      );
    });
    return (
      <div className='decks-view'>
        <button
        type='button'
        id='newdeck'
        className='new-deck'
        onClick={this.createDeck}>
          New Deck
        </button>
        <div className='flex wrap just-center'>
          {renderedDecks}
        </div>
        <Modal show={this.state.show}>
          {this.renderModalForm()}
        </Modal>
      </div>
    );
  }
}
