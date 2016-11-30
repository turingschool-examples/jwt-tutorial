import React, { PropTypes as T } from 'react';
import { browserHistory, Link } from 'react-router';
import styles from './styles.module.css';

const Auth = ({ updateAuthStatus, username }) => {

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    updateAuthStatus({ 
      loggedIn: false,
      username: '',
      token: ''
    }, 'login');
  }

  return (
    <div className={styles.auth}>
      { username && 
        <p>
          Logged in as {username}. 
          <a href="#" onClick={ e => logOut(e) }>Logout</a> 
        </p>
      }

      { !username && 
        <Link to="/login/">login</Link>
      }
    </div>
  );
};

export default Auth;