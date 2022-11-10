import React from 'react';
import Header from './components/header';
import Modal from './components/modal';
import parseRoute from './lib/parse-route';
import Decks from './components/decks';
import AddCard from './pages/addcard';
import NotFound from './pages/notfound';
import ViewCards from './pages/viewcards';
import EditCard from './pages/editcard';
import NewDeck from './components/newdeck';
import DeleteForm from './components/deletecard';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: 1,
      route: parseRoute(window.location.hash),
      show: false,
      decks: null,
      form: null,
      cards: [],
      deckName: null,
      deckId: null,
      cardId: null
    });
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  showModal(event) {
    this.setState({ show: true, form: event.target.id });
  }

  closeModal(event) {
    if (this.state.form === 'newdeck') {
      fetch('/api/decks')
        .then(res => res.json())
        .then(data => this.setState({ decks: data }));
      this.setState({ show: false, form: null });
    } else {
      this.setState({ show: false, form: null });
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      const deckName = route.params.get('deckName');
      const deckId = route.params.get('deckId');
      const cardId = route.params.get('cardId');
      this.setState({
        route,
        deckName,
        deckId,
        cardId
      });
    });

    fetch('/api/decks')
      .then(res => res.json())
      .then(data => this.setState({ decks: data }))
      .catch(err => console.error(err));
  }

  renderContent() {
    const { path } = this.state.route;
    const { deckId, deckName, cardId, cards } = this.state;
    if (path === '') {
      return <Decks decks={this.state.decks} showModal={this.showModal} />;
    } else if (path === 'add-card') {
      return <AddCard deckId={deckId} deckName={deckName} />;
    } else if (path === 'view-cards') {
      return <ViewCards deckId={deckId} deckName={deckName} cards={cards} />;
    } else if (path === 'edit-card') {
      return (
        <EditCard
        deckId={deckId}
        deckName={deckName}
        cardId={cardId}
        showModal={this.showModal}
      />);
    } else {
      return <NotFound />;
    }
  }

  renderModalForm() {
    const { form, deckId, deckName, cardId } = this.state;
    if (form === 'newdeck') {
      return <NewDeck closeModal={this.closeModal} />;
    } else if (form === 'deletecard') {
      return <DeleteForm
        closeModal={this.closeModal}
        cardId={cardId}
        deckName={deckName}
        deckId={deckId}
      />;
    }
  }

  render() {
    return (
      <div>
        <Header />
        { this.renderContent() }
        <Modal show={this.state.show}>
          {this.renderModalForm()}
        </Modal>
      </div>
    );
  }
}
