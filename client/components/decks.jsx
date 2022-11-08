import React from 'react';

export default class Decks extends React.Component {
  render() {
    if (!this.props.decks) return;
    const renderedDecks = this.props.decks.map(deck => {
      const showPaper = Number(this.props.showing) === deck.deckId ? 'is-showing' : '';
      return (
        <div key={deck.deckId} className='scene column-third'>
          <div className='folder'>
            <div className='folder-front folder-center' id={deck.deckId} onClick={this.props.showOptions}>
              <h1 className='deck-text'>{deck.deckName}</h1>
            </div>
            <div className={`option-paper ${showPaper}`} onClick={this.props.hideOptions}>
              <div className='stripes'>
                <h1 className='deck-title'>{deck.deckName}</h1>
                <section className='options-container'>
                  <a href='/#add-card' className='add-card'>
                    <i className="fa-solid fa-circle-plus" />
                    Add Cards
                  </a>
                </section>
              </div>
            </div>
            <div className='folder-tab' />
            <div className='folder-back folder-center' />
          </div>
        </div>
      );
    });
    return (
      <div className="decks-view">
        <a className="new-deck" onClick={this.props.showModal}>New Deck</a>
        <div className='flex justify-center'>{renderedDecks}</div>
      </div>
    );
  }
}
