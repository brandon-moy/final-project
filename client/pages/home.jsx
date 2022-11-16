import React from 'react';
import Decks from '../components/decks';
import AddCard from './addcard';
import StudyCards from './studycards';
import ViewCards from './viewcards';
import EditCard from './editcard';

export default class Home extends React.Component {

  renderContent() {
    const { path } = this.props;
    const deckId = this.props.route.params.get('deckId');
    if (path === '') {
      return <Decks />;
    } else if (path === 'add-card') {
      return <AddCard deckId={deckId} />;
    } else if (path === 'view-cards') {
      return <ViewCards
        deckId={deckId}
      />;
    } else if (path === 'edit-card') {
      const cardId = this.props.route.params.get('cardId');
      return <EditCard
        deckId={deckId}
        cardId={cardId}
      />;
    } else if (path === 'study-cards') {
      return <StudyCards deckId={deckId} />;
    }
  }

  render() {
    if (!this.context.user) {
      location.href = '#sign-in';
    }

    return this.renderContent();
  }
}
