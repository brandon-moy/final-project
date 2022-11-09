import React from 'react';

export default class ViewCards extends React.Component {

  render() {
    const cards = this.props.cards.map(card => {
      return (
        <div key={card.question} className='card-set flex wrap'>
          <div className='card-front c-45 flex jc ac'>
            <h1 className='view-card-question'>
              {card.question}
            </h1>
          </div>
          <div className='card-back c-45'>
            <div className='flash-card-repeating-blue flex jc'>
              <h2 className='view-card-answer'>{card.answer}</h2>
            </div>
          </div>
        </div>
      );
    });
    return (
      <section className='card-deck'>
        <div className='flex jsb ac wrap'>
          <h1 className='deck-view-name c-2'>{this.props.deckName}</h1>
          <div className='spacer c-4' />
          <a
          href={`/#add-card?deckName=${this.props.deckName}&deckId=${this.props.deckId}`}
          className='new-card-deck c-4'
          >
            <i className="fa-solid fa-circle-plus" />
            Add Card
          </a>
        </div>
        {cards}
      </section>
    );
  }
}
