import React from 'react';

export default class PageThree extends React.Component {
  render() {
    return (
      <>
        <div className='scene tour-folder t-center'>
          <div data-testid='folder' className='folder'>
            <div className='folder-front t-center'>
              <h1 data-testid='folder-name' className='deck-text'>
                Your Folder
              </h1>
              <i className="fa-solid fa-hand-pointer" />
              <div className="lds-ripple"><div /><div /></div>
            </div>
            <div data-testid='tour-paper' className='option-paper'/>
            <div data-testid='tour-folder-tab' className='folder-tab' />
            <div data-testid='tour-folder-back' className='folder-back t-center' />
          </div>
        </div>
        <section className='page-three-container flex just-f-end'>
          <section className='text-box-3'>
            <h3 data-testid='page-three-instructions' className='main-box-text'>
              Once you&apos;ve created your folder, you&apos;ll be able to view it
              and click on the front to see the options.
            </h3>
          </section>
        </section>
      </>
    );
  }
}
