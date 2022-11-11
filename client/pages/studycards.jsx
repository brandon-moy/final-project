import React from 'react';

export default class StudyCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ cards: [], deckName: '', position: 0, reveal: false });
    this.consoleState = this.consoleState.bind(this);
  }

  consoleState(event) {
    // console.log(this.state.cards[this.state.position].question);
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
    // issue is that guard clause is not working? it looks like it is going through on first run
    // const card = this.state.cards[this.state.position];
    // console.log(card);
    if (this.state.cards === []) return;
    return (
      <section className='study-cards' onClick={this.consoleState}>
        <h1 className='deck-view-name col-2'>{this.state.deckName}</h1>
        <div className='card-set flex wrap'>
          <div className='card-front col-45 flex jc ac'>
            <h1 className='view-card-question' />
          </div>
          <div className='card-back col-45'>
            <div className='flash-card-repeating-blue flex jc'>
              {/* <h2 className='view-card-answer'>{answer}</h2> */}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
