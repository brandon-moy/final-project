import React from 'react';

export default class DeleteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ anything: null });
  }

  render() {
    return (
      <section className="delete-confirm">
        <h2 className='delete-card-message'>
          Are you sure you want to delete this card?
        </h2>
        <div className="flex jsb">
          <a className='cancel-delete' onClick={this.props.closeModal}>Cancel</a>
          <a className='confirm-delete'>Continue</a>
        </div>
      </section>
    );
  }
}
