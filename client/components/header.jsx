import React from 'react';

export default class Home extends React.Component {

  render() {
    const show = this.context.user
      ? 'sign-out-button'
      : 'hidden';
    return (
      <header className='page-header flex just-between'>
        <a href='#' className='page-title'>
          Page Title
        </a>
        <button className={show} onClick={this.props.signOut}>
          Sign Out
          <i className="fa-solid fa-right-from-bracket" />
        </button>
      </header>
    );
  }
}
