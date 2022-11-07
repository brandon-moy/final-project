import React from 'react';

export default class Home extends React.Component {

  render() {
    return (
      <section>
        <header className="page-header">
          <a href="/#" className="page-title">Page Title</a>
        </header>
        <a className="new-deck" onClick={this.props.showModal}>New Deck</a>
      </section>
    );
  }
}
