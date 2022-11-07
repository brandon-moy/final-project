import React from 'react';
import Home from './pages/home';
import Modal from './pages/modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ show: false });
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal(event) {
    this.setState({ show: true });
  }

  closeModal(event) {
    this.setState({ show: false });
    window.alert('Added deck successfully!');
  }

  render() {
    return (
      <div>
        <Home showModal={this.showModal} />
        <Modal show={this.state.show} closeModal={this.closeModal} />
      </div>
    );
  }
}
