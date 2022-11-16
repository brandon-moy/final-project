import React from 'react';
import Header from './components/header';
import parseRoute from './lib/parse-route';
// import Home from './pages/home';
import AddCard from './pages/addcard';
import NotFound from './pages/notfound';
import ViewCards from './pages/viewcards';
import EditCard from './pages/editcard';
import StudyCards from './pages/studycards';
import AuthForm from './components/auth-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: 1,
      route: parseRoute(window.location.hash)
    });
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderContent() {
    const { path } = this.state.route;
    const deckId = this.state.route.params.get('deckId');
    if (path === '') {
      return <AuthForm />;
    } else if (path === 'add-card') {
      return <AddCard deckId={deckId} />;
    } else if (path === 'view-cards') {
      return <ViewCards
        deckId={deckId}
      />;
    } else if (path === 'edit-card') {
      const cardId = this.state.route.params.get('cardId');
      return <EditCard
        deckId={deckId}
        cardId={cardId}
      />;
    } else if (path === 'study-cards') {
      return <StudyCards deckId={deckId} />;
    } else {
      return <NotFound />;
    }
  }

  render() {
    return (
      <div>
        <Header />
        { this.renderContent() }
      </div>
    );
  }
}
