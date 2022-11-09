import React from 'react';

export default class EditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { card: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    if (event.target.name === 'question') {
      this.setState({ card: { question: value } });
    } else {
      this.setState({ card: { answer: value } });
    }
  }

  handleSubmit(event) {

  }

  componentDidMount() {
    fetch(`/api/card/${this.props.cardId}`)
      .then(res => res.json())
      .then(data => this.setState({ card: data }));
  }

  render() {
    if (!this.state.card) return;
    return (
      <section>
        <div className='flex jsb ac wrap'>
          <h1 className='deck-view-name c-2'>{this.props.deckName}</h1>
          <div className='spacer c-4' />
          <a
            href={`/#add-card?deckName=${this.props.deckName}&deckId=${this.props.deckId}`}
            className='new-card-deck c-4'
          >
            <i className="fa-solid fa-circle-plus" />
            Add Card
          </a>
        </div>
        <form className='new-card flex wrap' onSubmit={this.handleSubmit}>
          <label className='card-front c-45 flex jc ac'>
            <textarea
            name='question'
            type='text'
            value={this.state.card.question}
            className='card-question'
            onChange={this.handleChange} />
          </label>
          <label className='card-back c-45'>
            <div className='flash-card-repeating-blue flex jc afs'>
              <textarea
              name='answer'
              type='text'
              value={this.state.card.answer}
              className='card-answer'
              onChange={this.handleChange} />
            </div>
          </label>
          <div className='c-100'>
            <button className='jfe add-card-button'>Save</button>
          </div>
        </form>
      </section>
    );
  }
}
