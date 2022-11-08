import React from 'react';

export default class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ question: '', answer: '' });
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
    const deckId = this.props.deckId;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/add-card/${deckId}`, req)
      .then(res => {
        res.json();
        this.setState({ question: '', answer: '' });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <form className='new-card flex wrap' onSubmit={this.handleSubmit}>
        <label className='new-card-front c-45 flex jc ac'>
          <textarea
          name='question'
          type='text'
          value={this.state.question}
          className='new-card-question'
          onChange={this.handleChange} />
        </label>
        <label className='new-card-back c-45'>
          <div className='flash-card-repeating-blue flex jc afs'>
            <textarea
            name='answer'
            type='text'
            value={this.state.answer}
            className='new-card-answer'
            onChange={this.handleChange} />
          </div>
        </label>
        <div className='c-100'>
          <button className='jfe add-card-button'>Save</button>
        </div>
      </form>
    );
  }
}
