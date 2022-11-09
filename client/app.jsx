import React from 'react';
import Header from './components/header';
import Modal from './components/modal';
import parseRoute from './lib/parse-route';
import Decks from './components/decks';
import AddCard from './pages/addcard';
import NotFound from './pages/notfound';
import ViewCards from './pages/viewcards';
import EditCard from './pages/editcard';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: 1,
      route: parseRoute(window.location.hash),
      show: false,
      decks: null,
      cards: []
    });
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderContent = this.renderContent.bind(this);
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
    const deck = this.state.route.params.get('deckId');
    const name = this.state.route.params.get('deckName');
    if (path === '') {
      return <Decks decks={this.state.decks} showModal={this.showModal} />;
    } else if (path === 'add-card') {
      return <AddCard deckId={deck} deckName={name} />;
    } else if (path === 'view-cards') {
      return <ViewCards deckId={deck} deckName={name} cards={this.state.cards} />;
    } else if (path === 'edit-card') {
      const card = this.state.route.params.get('cardId');
      return <EditCard deckId={deck} deckName={name} cardId={card} />;
    } else {
      return <NotFound />;
    }
  }

  render() {
    return (
      <div>
        <Header showModal={this.showModal} />
        { this.renderContent() }
        <Modal show={this.state.show} closeModal={this.closeModal} />
      </div>
    );
  }
}
