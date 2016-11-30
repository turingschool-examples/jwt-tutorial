import React, { PropTypes as T } from 'react';
import styles from './styles.module.css';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  updateProperty(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
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
        <button id="submit">Login
        </button>
        </label>
      </div>
    );
  }
};

export default Login;

