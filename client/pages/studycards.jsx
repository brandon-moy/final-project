import React from 'react';

export default class StudyCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ cards: null, deckName: '', position: 0, reveal: false });
    this.revealAnswer = this.revealAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  revealAnswer(event) {
    this.setState({ reveal: true });
  }

  nextQuestion(event) {
    const position = this.state.position + 1;
    this.setState({ position, reveal: false });
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
    const face = this.state.reveal ? 'reveal-answer' : '';
    const card = this.state.cards[this.state.position];
    return (
      <section className='study-cards' onClick={this.revealAnswer}>
        <h1 className='deck-view-name col-2'>{this.state.deckName}</h1>
        <div className={`study-card-set flex wrap jc ${face}`}>
          <div className='study-card-front flex jc ac'>
            <h1 className='view-card-question'>
              {card.question}
            </h1>
          </div>
          <div className='study-card-back' onClick={this.nextQuestion}>
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
