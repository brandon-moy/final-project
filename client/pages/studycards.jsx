import React from 'react';

export default class StudyCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ cards: null, deckName: '', position: 0, reveal: 'question' });
    this.startFlip = this.startFlip.bind(this);
    this.finishFlip = this.finishFlip.bind(this);
  }

  startFlip(event) {
    const reveal = this.state.reveal === 'question' ? 'half-a' : 'half-q';
    this.setState({ reveal });
  }

  finishFlip(event) {
    if (this.state.reveal === 'half-a') {
      this.setState({ reveal: 'answer' });
    } else if (this.state.reveal === 'half-q') {
      const length = this.state.cards.length;
      let position = this.state.position + 1;
      if (position === length) {
        position = 0;
      }
      this.setState({ reveal: 'question', position });
    }
  }

  componentDidMount() {
    fetch(`/api/cards/${this.props.deckId}`)
      .then(res => res.json())
      .then(data => {
        const { deckName } = data[0];
        this.setState({ cards: data, deckName });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.cards) return;
    const face = this.state.reveal;
    const card = this.state.cards[this.state.position];
    return (
      <section className='study-cards'>
        <h1 className='deck-view-name col-2'>{this.state.deckName}</h1>
        <div
        className={`study-card-set flex wrap jc ${face}`}
        onTransitionEnd={this.finishFlip}>
          <div className='study-card-front flex jc ac' onClick={this.startFlip}>
            <h1 className='view-card-question'>
              {card.question}
            </h1>
          </div>
          <div className='study-card-back' onClick={this.startFlip}>
            <div className='flash-card-repeating-blue flex jc'>
              <h2 className='view-card-answer'>
                {card.answer}
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
