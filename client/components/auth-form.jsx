import React from 'react';
import Redirect from './redirect';
import AppContext from '../lib/app-context';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogIn = this.demoLogIn.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.context.isLoading();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${this.props.action}`, req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          this.setState({
            errorMessage: result.error
          });
        } else if (this.props.action === 'sign-up') {
          this.setState({
            username: '',
            password: '',
            errorMessage: ''
          });
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.handleSignIn(result);
        }
        this.context.completeLoading();
      })
      .catch(err => {
        console.error(err);
        this.context.isError();
      });
  }

  demoLogIn() {
    const demoUser = {
      username: 'DemoUser',
      password: 'imademouser123'
    };
    this.context.isLoading();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(demoUser)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        this.props.handleDemoSignIn(result);
        this.context.completeLoading();
      })
      .catch(err => {
        console.error(err);
        this.context.isError();
      });

  }

  render() {
    if (this.context.user) return <Redirect to='' />;

    const authButton = this.props.action === 'sign-in'
      ? 'Sign In'
      : 'Sign Up';
    const switchAuth = this.props.action === 'sign-in'
      ? 'Sign Up'
      : 'Sign In';
    const switchAuthMessage = this.props.action === 'sign-in'
      ? 'Not a member?'
      : 'Already a member?';
    const switchAuthLocation = this.props.action === 'sign-in'
      ? '#sign-up'
      : '#sign-in';
    const error = this.state.errorMessage
      ? 'username-error'
      : 'hidden';
    return (
      <>
        <div className='trial-container flex wrap just-center'>
          <h2 className='trial-header col-100'>Do you want to try before signing up?</h2>
          <button className='trial-button' onClick={this.demoLogIn}>Try it here!</button>
        </div>
        <div className='clipboard'>
          <div className='clip t-center' />
          <div className='page t-center'>
            <form
          className='auth flex-column wrap just-center'
          onSubmit={this.handleSubmit}>
              <img
            className='placeholder-image'
            src='/images/greet.webp' />
              <div className='form-section'>
                <p className={`${error}`}>
                  {this.state.errorMessage}
                </p>
                <label>Username
                  <input
                type='text'
                id='username'
                name='username'
                className='username'
                value={this.state.username}
                onChange={this.handleChange} />
                </label>

                <label>Password
                  <input
                id='password'
                name='password'
                type='password'
                className='password'
                value={this.state.password}
                onChange={this.handleChange} />
                </label>
                <section className='flex switch-container'>
                  <div className='col-2'>
                    <p className='switch-auth'>
                      {switchAuthMessage}
                    </p>
                    <a
                  className='auth-type'
                  href={switchAuthLocation}>
                      {switchAuth}
                    </a>
                  </div>
                  <button className='auth-button col-2'>
                    {authButton}
                  </button>
                </section>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

AuthForm.contextType = AppContext;
