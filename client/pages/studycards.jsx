import React from 'react';
import NoCards from '../components/nocards';
import CardStudy from '../components/cardstudy';

export default class StudyCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      deckName: '',
      cards: null
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
        this.setState({ reveal: 'question', position });
      }
    }
  }

  componentDidMount() {
    fetch(`/api/cards/${this.props.deckId}`)
      .then(res => res.json())
      .then(data => {
        let deckName = '';
        if (data.length) {
          deckName = data[0].deckName;
        }
        this.setState({ cards: data, deckName });
      })
      .catch(err => console.error(err));
  }

  renderContent() {
    if (!this.state.cards.length) {
      return <NoCards deckId={this.props.deckId} />;
    } else {
      return (
        <CardStudy
        deckId={this.props.deckId}
        cards={this.state.cards}
      />
      );

    }
  }

  render() {
    if (!this.state.cards) return;
    return (
      <section className='study-cards'>
        <h1 className='deck-view-name col-2'>{this.state.deckName}</h1>
        { this.renderContent() };
      </section>
    );
  }
}
