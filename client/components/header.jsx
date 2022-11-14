import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.returnHome = this.returnHome.bind(this);
  }

  returnHome(event) {
    this.props.updateDecks();
    location.href = '/#';
  }

  render() {
    return (
      <header className='page-header'>
        <button type='button' onClick={this.returnHome} className='page-title'>
          Page Title
        </button>
      </header>
    );
  }
}
