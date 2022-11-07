import React from 'react';
import Home from './pages/home';
import Modal from './pages/modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ show: false, decks: null });
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderDecks = this.renderDecks.bind(this);
  }

  showModal(event) {
    this.setState({ show: true });
  }

  closeModal(event) {
    this.setState({ show: false });
  }

  componentDidMount() {
    fetch('/api/decks')
      .then(res => res.json())
      .then(data => this.setState({ decks: data }))
      .catch(err => console.error(err));
  }

  renderDecks() {
    if (!this.state.decks) return;
    const decks = this.state.decks.map(deck => {
      return (
        <div key={deck.deckId} className='scene column-third'>
          <div className='folder'>
            <div className='folder-front folder-center'>
              <h1 className='deck-text'>{deck.deckName}</h1>
            </div>
            <div className='option-paper' />
            <div className='folder-tab' />
            <div className='folder-back folder-center' />
          </div>
        </div>
      );
    });
    return (
      <div className='flex justify-center'>{decks}</div>
    );
  }

  render() {
    return (
      <div>
        <Home showModal={this.showModal} />
        { this.renderDecks() }
        <Modal show={this.state.show} closeModal={this.closeModal} />
      </div>
    );
  }
}
