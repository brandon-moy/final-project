import React from 'react';
import AppContext from '../lib/app-context';

export default class Header extends React.Component {

  render() {
    const show = this.context.user
      ? ''
      : 'hidden';
    return (
      <header className='page-header'>
        <img data-testid='header-img' className={`idle-img ${show}`} src='/images/sit.webp' />
        <a data-testid='header-link' href='#' className='page-title'>
          StudyBuddy
        </a>
        <button data-testid='sign-out-button' className={`sign-out-button ${show}`} onClick={this.props.signOut}>
          Sign Out
          <i className='fa-solid fa-right-from-bracket' />
        </button>
      </header>
    );
  }
}

Header.contextType = AppContext;
