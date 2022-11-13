import React from 'react';

export default class ViewCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ cards: null });
  }

  componentDidMount() {
    fetch(`/api/cards/${this.props.deckId}`)
      .then(res => res.json())
      .then(data => {
        const { deckName } = data[0];
        this.setState({
          cards: data,
          deckName
        });
      })
      .catch(err => console.error(err));
  }

  renderCards() {
    if (!this.state.cards[0].question) return;
    const cards = this.state.cards.map(card => {
      return (
        <div key={card.cardId} id={card.cardId} className='card-set flex wrap'>
          <div className='card-front col-45 flex jc ac'>
            <h1 className='view-card-question'>
              {card.question}
            </h1>
          </div>
          <div className='card-back col-45'>
            <div className='flash-card-repeating-blue flex jc'>
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
      <section className='card-deck'>
        <div className='flex jsb ac wrap'>
          <h1 className='deck-view-name col-2'>
            {this.state.deckName}
          </h1>
          <div className='spacer col-4' />
          <a
          href={`/#add-card?deckId=${this.props.deckId}`}
          className='new-card-deck col-4'
          >
            <i className='fa-solid fa-circle-plus' />
            Add Card
          </a>
        </div>
        { this.renderCards() }
      </section>
    );
  }
}
