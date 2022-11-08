import React from 'react';
import Home from './pages/home';
import Modal from './components/modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ show: false, decks: null, deckShowing: null });
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderDecks = this.renderDecks.bind(this);
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
    fetch('/api/decks')
      .then(res => res.json())
      .then(data => this.setState({ decks: data }))
      .catch(err => console.error(err));
  }

  renderDecks() {
    if (!this.state.decks) return;
    const decks = this.state.decks.map(deck => {
      const showPaper = Number(this.state.deckShowing) === deck.deckId ? 'is-showing' : '';
      return (
        <div key={deck.deckId} className='scene column-third'>
          <div className='folder'>
            <div className='folder-front folder-center' id={deck.deckId} onClick={this.showOptions}>
              <h1 className='deck-text'>{deck.deckName}</h1>
            </div>
            <div className={`option-paper ${showPaper}`} onClick={this.hideOptions}>
              <div className='stripes'>
                <h1 className='deck-title'>{deck.deckName}</h1>
                <section className='options-container'>
                  <a href='/#add-card' className='add-card'>
                    <i className="fa-solid fa-circle-plus" />
                    Add Cards
                  </a>
                </section>
              </div>
            </div>
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
