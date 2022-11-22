import React from 'react';
import Home from './pages/home';
import jwtDecode from 'jwt-decode';
import NotFound from './pages/notfound';
import Header from './components/header';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';
import AuthForm from './components/auth-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: null,
      token: null,
      newUser: false,
      isAuthorizing: true,
      loading: false,
      route: parseRoute(window.location.hash)
    });
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.endTour = this.endTour.bind(this);
  }

  handleSignIn(result) {
    const { user, token } = result;
    const { newUser } = jwtDecode(token);
    window.localStorage.setItem('user-token', token);
    window.localStorage.setItem('newUser', newUser);
    this.setState({ user, token, newUser });
  }

  handleSignOut() {
    window.localStorage.removeItem('user-token');
    this.setState({ user: null });
  }

  endTour() {
    const { token } = this.state;
    const req = {
      method: 'PATCH',
      headers: {
        'X-Access-Token': token
      }
    };
    fetch('/update/newuser', req)
      .then(res => {
        window.localStorage.setItem('newUser', false);
        this.setState({ newUser: false });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('user-token');
    const newUser = JSON.parse(window.localStorage.getItem('newUser'));
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false, newUser, token });
  }

  renderPage() {
    const { path } = this.state.route;
    const pages = ['', 'add-card', 'view-cards', 'edit-card', 'study-cards'];
    if (pages.includes(path)) {
      return <Home path={path} route={this.state.route} />;
    } else if (path === 'sign-in' || path === 'sign-up') {
      return <AuthForm action={path} handleSignIn={this.handleSignIn} />;
    } else {
      return <NotFound />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const loading = this.state.loading ? '' : 'hidden';
    const { user, route, token, newUser } = this.state;
    const contextValue = { user, route, token, endTour: this.endTour, newUser };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Header signOut={this.handleSignOut} />
          { this.renderPage() }
          <div className={`modal-background flex align-center ${loading}`}>
            <div className="lds-facebook"><div /><div /><div /></div>
          </div>
        </>
      </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;
