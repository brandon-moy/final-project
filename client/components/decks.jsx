import React from 'react';

export default class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ currentShowing: null, lastShowing: null });
    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
  }

  showOptions(event) {
    const lastShowing = this.state.currentShowing;
    this.setState({ currentShowing: event.target.id, lastShowing });
  }

  hideOptions(event) {
    const lastShowing = this.state.currentShowing;
    this.setState({ currentShowing: null, lastShowing });
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
        <div key={deck.deckId} className='scene col-3'>
          <div className='folder'>
            <div className='folder-front t-center' id={deck.deckId} onClick={this.showOptions}>
              <h1 className='deck-text'>{deck.deckName}</h1>
            </div>
            <div className={`option-paper ${showPaper}`} onClick={this.hideOptions}>
              <div className='stripes'>
                <h1 className='deck-title'>{deck.deckName}</h1>
                <section className='options-container'>
                  <a
                  href={`/#add-card?deckName=${deck.deckName}&deckId=${deck.deckId}`}
                  className='card-option'
                  >
                    <i className="fa-solid fa-circle-plus" />
                    Add Cards
                  </a>
                  <br />
                  <a
                  href={`/#view-cards?deckName=${deck.deckName}&deckId=${deck.deckId}`}
                  className='card-option'
                  >
                    <i className="fa-solid fa-glasses" />
                    View Cards
                  </a>
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
      <div className="decks-view">
        <a className="new-deck" onClick={this.props.showModal}>New Deck</a>
        <div className='flex wrap jc'>{renderedDecks}</div>
      </div>
    );
  }
}
