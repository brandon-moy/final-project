import React from 'react';

export default class CardStudy extends React.Component {
  constructor(props) {
    super(props);
    const cards = this.props.cards;
    this.state = ({
      cards,
      position: 0,
      reveal: 'question'
    });
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
      const position = this.state.position + 1;
      if (position === length) {
        location.href = `/#view-cards?deckId=${this.props.deckId}`;
      } else {
        this.setState({
          reveal: 'question',
          position
        });
      }
    }
  }

  render() {
    const face = this.state.reveal;
    const card = this.state.cards[this.state.position];
    const questionPlace = `${this.state.position + 1} / ${this.state.cards.length}`;
    return (
      <section className='study-cards'>
        <h2 className='question-number'>
          Q : {questionPlace}
        </h2>
        <div
            className={`study-card-set flex wrap jc col-100 ${face}`}
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
            <div className="button-container flex jse col-100">
              <div className='confidence' id='1'>1</div>
              <div className='confidence' id='2'>2</div>
              <div className='confidence' id='3'>3</div>
              <div className='confidence' id='4'>4</div>
              <div className='confidence' id='5'>5</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
