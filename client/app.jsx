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
import DeleteDeck from './components/deletedeck';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: 1,
      route: parseRoute(window.location.hash),
      show: false,
      decks: null,
      form: null
    });
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  showModal(event) {
    this.setState({ show: true, form: event.target.id });
  }

  closeModal(event) {
    if (this.state.form === 'newdeck' || this.state.form === 'deletedeck') {
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
      this.setState({ route: parseRoute(window.location.hash) });
    });

    fetch('/api/decks')
      .then(res => res.json())
      .then(data => this.setState({ decks: data }))
      .catch(err => console.error(err));
  }

  renderContent() {
    const { path } = this.state.route;
    const deckId = this.state.route.params.get('deckId');
    const deckName = this.state.route.params.get('deckName');
    if (path === '' || path === 'delete-deck') {
      return <Decks decks={this.state.decks} showModal={this.showModal} />;
    } else if (path === 'add-card') {
      return <AddCard deckId={deckId} deckName={deckName} />;
    } else if (path === 'view-cards') {
      return <ViewCards
        deckId={deckId}
        deckName={deckName}
      />;
    } else if (path === 'edit-card') {
      const cardId = this.state.route.params.get('cardId');
      return <EditCard
        deckId={deckId}
        deckName={deckName}
        cardId={cardId}
        showModal={this.showModal}
      />;
    } else {
      return <NotFound />;
    }
  }

  renderModalForm() {
    const { form } = this.state;
    const deckId = this.state.route.params.get('deckId');
    const deckName = this.state.route.params.get('deckName');
    if (form === 'newdeck') {
      return <NewDeck closeModal={this.closeModal} />;
    } else if (form === 'deletedeck') {
      return <DeleteDeck
        showModal={this.showModal}
        closeModal={this.closeModal}
        deckId={deckId}
        deckName={deckName}
      />;
    } else if (form === 'deletecard') {
      const cardId = this.state.route.params.get('cardId');
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
