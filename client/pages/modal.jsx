import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ deckName: null });
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
      .then(res => res.json())

    ;
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
                      strokeLinejoin="round" strokeLinecap="square" />
                  </clipPath>
                </defs>
              </svg>
              <div className="sticky-content">
                <form className="new-deck-form">
                  <h1 className="sticky-header">Create New Deck</h1>
                  <input className="sticky-input" type="text" placeholder="e.g. HTML, CSS, JavaScript"/>
                  <button type="button" className="sticky-submit" onClick={this.props.closeModal}>Continue</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
