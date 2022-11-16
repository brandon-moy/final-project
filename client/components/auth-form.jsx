import React from 'react';

export default class AuthForm extends React.Component {
  render() {
    return (
      <div className="clipboard">
        <div className="clip t-center" />
        <div className="page t-center">
          <form className="auth flex wrap just-center">
            <img className='placeholder-image col-2' src='/post-removebg-preview.png' />
            <div className='form-section col-2'>
              <label>Username
                <input className="username" type="text" name="username" id="username" />
              </label>
              <label>Password
                <input className="password" type="password" name="password" id="password" />
              </label>
              <button className='auth-button'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
