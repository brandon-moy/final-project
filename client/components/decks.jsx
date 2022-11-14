import React from 'react';
import Modal from './modal';
import NewDeck from './newdeck';
import DeleteDeck from './deletedeck';

export default class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      currentShowing: null,
      lastShowing: null,
      show: false,
      form: null,
      deleteDeckId: null,
      deleteDeckName: null
    });
    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitModal = this.submitModal.bind(this);
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

  showModal(event) {
    const form = event.target.id;
    if (form === 'deletedeck') {
      const deleteDeckId = event.target.closest('.scene').getAttribute('id');
      const deleteDeckName = event.target.closest('.options-container').getAttribute('id');
      this.setState({
        show: true,
        form: event.target.id,
        deleteDeckId,
        deleteDeckName
      });
    } else {
      this.setState({
        show: true,
        form
      });
    }

  }

  submitModal(event) {
    this.props.updateDecks();
    this.setState({
      show: false,
      form: null,
      deleteDeckId: null
    });
  }

  closeModal(event) {
    this.setState({
      show: false,
      form: null,
      deleteDeckId: null
    });
  }

  renderModalForm() {
    const { form } = this.state;
    if (form === 'newdeck') {
      return <NewDeck
        closeModal={this.closeModal}
        submitModal={this.submitModal}
      />;
    } else if (form === 'deletedeck') {
      return <DeleteDeck
        deckId={this.state.deleteDeckId}
        deckName={this.state.deleteDeckName}
        closeModal={this.closeModal}
        submitModal={this.submitModal}
      />;
    }
  }

  render() {
    if (!this.props.decks) return;
    const renderedDecks = this.props.decks.map(deck => {
      const showPaper = (Number(this.state.currentShowing) === deck.deckId)
        ? 'is-showing'
        : (Number(this.state.lastShowing) === deck.deckId)
            ? 'hiding'
            : '';
      return (
        <div key={deck.deckId} id={deck.deckId} className='scene col-3'>
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
                  id='deletedeck'
                  onClick={this.showModal}
                  className='card-option delete-deck-button'>
                    <i className='fa-solid fa-trash-can' />
                    Delete Deck
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
        onClick={this.showModal}>
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
