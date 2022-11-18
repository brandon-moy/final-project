import React from 'react';
import AddCard from './addcard';
import EditCard from './editcard';
import ViewCards from './viewcards';
import Tour from '../components/tour';
import StudyCards from './studycards';
import Decks from '../components/decks';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Home extends React.Component {

  renderContent() {
    const { path } = this.props;
    const deckId = this.props.route.params.get('deckId');
    if (path === '' && this.context.user.newUser) {
      return <Tour />;
    } else if (path === '' && !this.context.user.newUser) {
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
      const order = this.props.route.params.get('order');
      return <StudyCards deckId={deckId} order={order} />;
    }
  }

  render() {
    if (!this.context.user) return <Redirect to='sign-in' />;

    return this.renderContent();
  }
}

Home.contextType = AppContext;
