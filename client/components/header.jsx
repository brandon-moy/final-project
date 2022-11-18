import React from 'react';
import AppContext from '../lib/app-context';

export default class Header extends React.Component {

  render() {
    const show = this.context.user
      ? ''
      : 'hidden';
    return (
      <header className='page-header'>
        <img className={`idle-img ${show} hidden`} src='place.png' />
        <a href='#' className='page-title'>
          Page Title
        </a>
        <button className={`sign-out-button ${show}`} onClick={this.props.signOut}>
          Sign Out
          <i className='fa-solid fa-right-from-bracket' />
        </button>
      </header>
    );
  }
}

Header.contextType = AppContext;
