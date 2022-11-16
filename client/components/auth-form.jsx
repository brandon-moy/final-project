import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="clipboard">
        <div className="clip t-center" />
        <div className="page t-center">
          <form
          className="auth flex wrap just-center"
          onSubmit={this.handleSubmit}>
            <img
            className='placeholder-image col-2'
            src='/post-removebg-preview.png' />
            <div className='form-section col-2'>
              <label>Username
                <input
                type="text"
                id="username"
                name="username"
                className="username"
                value={this.state.username}
                onChange={this.handleChange} />
              </label>
              <label>Password
                <input
                id="password"
                name="password"
                type="password"
                className="password"
                value={this.state.password}
                onChange={this.handleChange} />
              </label>
              <button className='auth-button'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
