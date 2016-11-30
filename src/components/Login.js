import React, { PropTypes as T } from 'react';
import styles from './styles.module.css';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    const redirectRoute = this.props.location.query.next || 'admin';
    console.log("REDIRECT ROUTE: ", redirectRoute);

    this.state = {
      username: '',
      password: '',
      redirectTo: redirectRoute
    }
  }

  updateProperty(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  login(event) {
    const { username, password, redirectTo } = this.state;
    const { updateAuthStatus } = this.props;

    fetch('http://localhost:3001/authenticate', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      
      return response.json()
    })
    .then(({ username, token }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      updateAuthStatus({ 
        loggedIn: true,
        username,
        token
      }, 'admin');
    })
    .catch(error => {
      console.log("Error: ", error);
    });
  }


  render() {
    return (
      <div className={styles.login}>
        <label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={event => this.updateProperty(event)}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={event => this.updateProperty(event)}
          />
        </label>
        <label>
        <button 
          id="submit"
          onClick={event => this.login(event)}>Login
        </button>
        </label>
      </div>
    );
  }
};

export default Login;

