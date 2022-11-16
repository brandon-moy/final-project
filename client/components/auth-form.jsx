import React from 'react';

export default class AuthForm extends React.Component {
  render() {
    return (
      <div className="clipboard">
        <div className="clip t-center" />
        <div className="page">
          <form className="sign-in">
            <h2 className="register-title">Greeting Sir</h2>
            <label>Username
              <input className="username" type="text" name="username" id="username" />
            </label>
            <label>Password
              <input className="password" type="password" name="password" id="password" />
            </label>
            <button>Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}
