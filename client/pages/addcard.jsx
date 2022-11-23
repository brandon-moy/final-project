import React from 'react';
import AppContext from '../lib/app-context';

export default class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      question: '',
      answer: ''
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

  handleSubmit(event) {
    event.preventDefault();
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
    fetch(`/api/add-card/${deckId}`, req)
      .then(res => {
        res.json();
        this.setState({
          question: '',
          answer: ''
        });
        this.context.completeLoading();
        location.href = `/#view-cards?deckId=${deckId}`;
      })
      .catch(err => {
        console.error(err);
        this.context.isError();
      });
  }

  componentDidMount() {
    this.context.isLoading();
    const { token } = this.context;
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      }
    };
    fetch(`/api/cards/${this.props.deckId}`, req)
      .then(res => res.json())
      .then(data => {
        const { deckName } = data[0];
        this.setState({ deckName });
        this.context.completeLoading();
      })
      .catch(err => {
        console.error(err);
        this.context.isError();
      });
  }

  render() {
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
