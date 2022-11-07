import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ deckName: '' });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ deckName: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/create-deck', req)
      .then(res => {
        res.json();
        this.props.closeModal();
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.props.show) return null;
    return (
      <div className='modal-background'>
        <div className="sticky-container">
          <div className="sticky-outer">
            <div className="sticky">
              <svg width="0" height="0">
                <defs>
                  <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                    <path d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                      />
                  </clipPath>
                </defs>
              </svg>
              <div className="sticky-content">
                <form className="new-deck-form" onSubmit={this.handleSubmit}>
                  <a className="xmark-close" onClick={this.props.closeModal}>
                    <i className="fa-solid fa-xmark" />
                  </a>
                  <h1 className="sticky-header">Create New Deck</h1>
                  <input value={this.state.deckName} className="sticky-input" onChange={this.handleChange} type="text" placeholder="e.g. HTML, CSS, JavaScript"/>
                  <button className="sticky-submit">Continue</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
