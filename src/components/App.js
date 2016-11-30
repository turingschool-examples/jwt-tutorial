import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';

import Auth from './Auth';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: []
    };

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
    this.fetchTrains();
  }

  updateTrains(trains) {
    this.setState({ trains });
  }

  render () {
    const { trains } = this.state;

    return (
      <div>
      <h1>Big Metro City Choo-Choo Train Authority</h1>
        {React.cloneElement(
          this.props.children,
          { 
            trains,
            updateTrains: this.updateTrains
          }
        )}
       </div>
     )
   }
}

export default App;