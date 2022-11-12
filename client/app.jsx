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
import StudyCards from './pages/studycards';

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
    const { form } = this.state;
    const splitForm = form.split(' ');
    if (form === 'newdeck' || splitForm[0] === 'deletedeck') {
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
    if (path === '') {
      return <Decks decks={this.state.decks} showModal={this.showModal} />;
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
        showModal={this.showModal}
      />;
    } else if (path === 'study-cards') {
      return <StudyCards deckId={deckId} />;
    } else {
      return <NotFound />;
    }
  }

  renderModalForm() {
    const { form } = this.state;
    if (!form) return;
    const splitForm = form.split(' ');
    const deckId = this.state.route.params.get('deckId');
    if (splitForm[0] === 'newdeck') {
      return <NewDeck closeModal={this.closeModal} />;
    } else if (splitForm[0] === 'deletedeck') {
      return <DeleteDeck
        showModal={this.showModal}
        closeModal={this.closeModal}
        deckId={splitForm[1]}
      />;
    } else if (splitForm[0] === 'deletecard') {
      const cardId = this.state.route.params.get('cardId');
      return <DeleteForm
        closeModal={this.closeModal}
        cardId={cardId}
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
