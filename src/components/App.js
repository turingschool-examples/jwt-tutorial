import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';

import Auth from './Auth';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authStatus: {
        loggedIn: false,
        username: '',
        token: ''
      },
      trains: []
    };

    this.updateAuthStatus = this.updateAuthStatus.bind(this);
    this.updateTrains = this.updateTrains.bind(this);
  }

  fetchTrains() {
    fetch('http://localhost:3001/api/v1/trains')
    .then(response => response.json())
    .then(trains => {
      this.setState({ trains });
    })
    .catch(error => {
      console.log("Error Fetching Trains: ", error);
    });
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');

    if (token && username) {
      this.setState({
        authStatus: {
          loggedIn: true,
          username,
          token
        }
      })
    }

    this.fetchTrains();
  }

  updateAuthStatus(authStatus, redirect) {
    this.setState({authStatus}, browserHistory.push(`/${redirect}/`));
  }

  updateTrains(trains) {
    this.setState({ trains });
  }

  render () {
    const { authStatus, trains } = this.state;

    return (
      <div>
      <h1>Big Metro City Choo-Choo Train Authority</h1>
      <Auth username={authStatus.username} updateAuthStatus={this.updateAuthStatus} />
        {React.cloneElement(
          this.props.children,
          { 
            authStatus,
            trains,
            updateAuthStatus: this.updateAuthStatus,
            updateTrains: this.updateTrains
          }
        )}
       </div>
     )
   }
}

export default App;
