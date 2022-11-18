import React from 'react';
import AppContext from '../lib/app-context';
import PageOne from './tour-components/page-one';
import PageTwo from './tour-components/page-two';
import PageThree from './tour-components/page-three';
import PageFour from './tour-components/page-four';
import PageFive from './tour-components/page-five';

export default class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.nextPage = this.nextPage.bind(this);
    this.startTour = this.startTour.bind(this);
  }

  nextPage() {
    const page = this.state.page + 1;
    if (page === 5) {
      window.removeEventListener('click', this.nextPage);
    }
    this.setState({ page });
  }

  startTour() {
    window.addEventListener('click', this.nextPage);
  }

  renderPages() {
    return (
      <>
        { this.state.page === 1 &&
        <PageOne startTour={this.startTour} /> }
        {this.state.page === 2 &&
          <PageTwo />}
        {this.state.page === 3 &&
          <PageThree />}
        {this.state.page === 4 &&
          <PageFour />}
        {this.state.page === 5 &&
          <PageFive />}
      </>
    );
  }

  render() {
    return (
      <>
        <h1 className='new-deck-back' >
          New Deck
        </h1>
        <div className='modal-background'>
          {this.renderPages()}
        </div>
      </>
    );
  }
}

Tour.contextType = AppContext;
