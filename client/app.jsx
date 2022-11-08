import React from 'react';
import Home from './pages/home';
import Modal from './components/modal';
import parseRoute from './lib/parse-route';
import Decks from './components/decks';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: 1,
      route: parseRoute(window.location.hash),
      show: false,
      decks: null,
      deckShowing: null
    });
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
  }

  showModal(event) {
    this.setState({ show: true });
  }

  closeModal(event) {
    fetch('/api/decks')
      .then(res => res.json())
      .then(data => this.setState({ decks: data }));
    this.setState({ show: false });
  }

  showOptions(event) {
    this.setState({ deckShowing: event.target.id });
  }

  hideOptions(event) {
    this.setState({ deckShowing: null });
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    fetch('/api/decks')
      .then(res => res.json())
      .then(data => this.setState({ decks: data }))
      .catch(err => console.error(err));
  }

  renderContent() {
    const { path } = this.state.route;
    if (path === '' || path === '#') {
      return <Decks decks={this.state.decks} showing={this.state.deckShowing} showOptions={this.showOptions} hideOptions={this.hideOptions} />;
    }
  }

  render() {
    return (
      <div>
        <Home showModal={this.showModal} />
        { this.renderContent() }
        <Modal show={this.state.show} closeModal={this.closeModal} />
      </div>
    );
  }
}
