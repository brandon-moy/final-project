import React from 'react';
import Header from './components/header';
import parseRoute from './lib/parse-route';
import Home from './pages/home';
import AddCard from './pages/addcard';
import NotFound from './pages/notfound';
import ViewCards from './pages/viewcards';
import EditCard from './pages/editcard';
import StudyCards from './pages/studycards';
import AuthForm from './components/auth-form';
import AppContext from './lib/app-context';
import jwtDecode from 'jwt-decode';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: null,
      token: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    });
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('user-token', token);
    this.setState({ user, token });
    location.href = '#';
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('user-token');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  renderContent() {
    const { path } = this.state.route;
    const deckId = this.state.route.params.get('deckId');
    if (path === '') {
      return <Home />;
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
    } else if (path === 'sign-in' || path === 'sign-up') {
      return <AuthForm action={path} handleSignIn={this.handleSignIn} />;
    } else {
      return <NotFound />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route, token } = this.state;
    const contextValue = { user, route, token };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Header />
          { this.renderContent() }
        </>
      </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;
Home.contextType = AppContext;
AuthForm.contextType = AppContext;
NotFound.contextType = AppContext;
Header.contextType = AppContext;
EditCard.contextType = AppContext;
