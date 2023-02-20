import React from 'react';
import AppContext from '../lib/app-context';

export default class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      question: '',
      answer: '',
      error: false
    });
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

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.state.question.length || !this.state.answer.length) {
      this.setState({ error: true });
    } else {
      try {
        this.context.isLoading();
        const { token } = this.context;
        const deckId = this.props.deckId;
        const req = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': token
          },
          body: JSON.stringify(this.state)
        };
        const response = await fetch(`/api/add-card/${deckId}`, req);
        if (response.ok) {
          this.setState({
            question: '',
            answer: ''
          });
          this.context.completeLoading();
          location.href = `/#view-cards?deckId=${deckId}`;
        }
      } catch (err) {
        console.error(err);
        this.context.isError();
      }
    }
  }

  async loadDeckInfo() {
    this.context.isLoading();
    try {
      const { token } = this.context;
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        }
      };
      const response = await fetch(`/api/cards/${this.props.deckId}`, req);
      if (response.ok) {
        const data = await response.json();
        const { deckName } = data[0];
        this.setState({ deckName });
        this.context.completeLoading();
      }
    } catch (err) {
      console.error(err);
      this.context.isError();
    }
  }

  componentDidMount() {
    this.loadDeckInfo();
  }

  render() {
    const error = this.state.error ? 'new-card-error' : 'hidden';
    return (
      <>
        <h1 className='deck-view-name'>
          {this.state.deckName}
        </h1>
        <form className='new-card flex wrap' onSubmit={this.handleSubmit}>
          <label className='card-front col-45 flex just-center align-center'>
            <textarea
            name='question'
            type='text'
            value={this.state.question}
            className='card-question'
            onChange={this.handleChange} />
          </label>
          <label className='card-back col-45'>
            <div
            className='flash-card-repeating-blue flex just-center align-f-start'>
              <textarea
              name='answer'
              type='text'
              value={this.state.answer}
              className='card-answer'
              onChange={this.handleChange} />
            </div>
          </label>
          <p className={`${error}`}>Question and answer are required fields!</p>
          <div className='col-100 flex just-f-end'>
            <button className='add-card-button'>
              Save
            </button>
          </div>
        </form>
      </>
    );
  }
}

AddCard.contextType = AppContext;
