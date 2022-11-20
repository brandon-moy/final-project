import React from 'react';

export default class PageTwo extends React.Component {
  render() {
    return (
      <section className='page-two-container'>
        <h1 className='new-deck-back-2' >
          New Folder
        </h1>
        <i className="fa-solid fa-angles-up arrow-2" />
        <div className='flex just-f-end'>
          <section className='text-box-2'>
            <h3 className='main-box-text'>
              Great! First thing you &apos;ll need is a folder for your cards.
              This is where you&apos;ll create a new folder!
            </h3>
          </section>
        </div>
      </section>
    );
  }
}
