import React from 'react';
import AppContext from '../lib/app-context';
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

  async loadDeckInfo() {
    try {
      const { token } = this.context;
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        }
      };
      const response = await fetch(`/api/cards/${this.props.deckId}?order=${this.props.order}`, req);
      if (response.ok) {
        const data = await response.json();
        let deckName = '';
        if (data.length) {
          deckName = data[0].deckName;
        }
        this.setState({
          cards: data,
          deckName
        });
        this.context.completeLoading();
      }
    } catch (err) {
      console.error(err);
      this.context.isError();
    }
  }

  componentDidMount() {
    this.loadDeckInfo();
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

StudyCards.contextType = AppContext;
