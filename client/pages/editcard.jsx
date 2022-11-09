import React from 'react';

export default class EditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { question: '', answer: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    if (event.target.name === 'question') {
      this.setState({ question: value });
    } else {
      this.setState({ answer: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const cardId = this.props.cardId;
    const req = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/card/${cardId}`, req)
      .then(res => {
        location.href = `/#view-cards?deckName=${this.props.deckName}&deckId=${this.props.deckId}`;
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    fetch(`/api/card/${this.props.cardId}`)
      .then(res => res.json())
      .then(data => this.setState(
        {
          question: data.question,
          answer: data.answer
        }
      ));
  }

  render() {
    return (
      <div className='edit-card-page'>
        <div className='flex jsb ac wrap'>
          <h1 className='deck-view-name col-2'>{this.props.deckName}</h1>
          <div className='spacer col-4' />
          <a
            href={`/#add-card?deckName=${this.props.deckName}&deckId=${this.props.deckId}`}
            className='new-card-deck col-4'
          >
            <i className="fa-solid fa-circle-plus" />
            Add Card
          </a>
        </div>
        <form className='new-card flex wrap' onSubmit={this.handleSubmit}>
          <label className='card-front col-45 flex jc ac'>
            <textarea
            name='question'
            type='text'
            value={this.state.question}
            className='card-question'
            onChange={this.handleChange} />
          </label>
          <label className='card-back col-45'>
            <div className='flash-card-repeating-blue flex jc afs'>
              <textarea
              name='answer'
              type='text'
              value={this.state.answer}
              className='card-answer'
              onChange={this.handleChange} />
            </div>
          </label>
          <div className='col-100'>
            <button className='jfe add-card-button'>Save</button>
          </div>
        </form>
      </div>
    );
  }
}
