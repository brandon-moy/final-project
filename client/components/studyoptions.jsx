import React from 'react';

export default class StudyOptions extends React.Component {
  render() {
    return (
      <div>
        <div className='flex just-f-end'>
          <button
          type='button'
          className='close-study'
          onClick={this.props.closeModal}>
            <i className='fa-solid fa-xmark' />
          </button>
        </div>
        <h1 className='study-title'>
          How would you like to study?
        </h1>
        <div className='study-link-container flex wrap just-between'>
          <a
          className='col-half study-option'
          href={`/#study-cards?&deckId=${this.props.deck}`}>
            Standard
            <i className="fa-solid fa-arrow-right" />
          </a>
          <a
          className='col-half study-option'
            href={`/#study-cards?&deckId=${this.props.deck}&order=asc`}>
            Confidence
            <i className="fa-solid fa-arrow-up-wide-short" />
          </a>
          <a
          className='col-half study-option'
          href={`/#study-cards?&deckId=${this.props.deck}&order=shuffle`}>
            Shuffle
            <i className="fa-solid fa-shuffle" />
          </a>
          <a
          className='col-half study-option'
          href={`/#study-cards?&deckId=${this.props.deck}&order=desc`}>
            Confidence
            <i className="fa-solid fa-arrow-down-wide-short" />
          </a>
        </div>
      </div>
    );
  }
}
