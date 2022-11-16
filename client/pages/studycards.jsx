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
  }

  componentDidMount() {
    fetch(`/api/cards/${this.props.deckId}`)
      .then(res => res.json())
      .then(data => {
        let deckName = '';
        if (data.length) {
          deckName = data[0].deckName;
        }
        this.setState({
          cards: data,
          deckName
        });
      })
      .catch(err => console.error(err));
  }

  renderContent() {
    if (!this.state.cards.length || !this.state.cards[0].question) {
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
      <>
        <h1 className='deck-view-name col-2'>
          {this.state.deckName}
        </h1>
        { this.renderContent() };
      </>
    );
  }
}
