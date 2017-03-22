// =================================================================
// require all necessary packages & our .env config file ===========
// =================================================================

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('dotenv').config();




// =================================================================
// app setup & configuration =======================================
// =================================================================

app.locals.trains = [
  { id: 1, line: 'green', status: 'running' },
  { id: 2, line: 'blue', status: 'delayed' },
  { id: 3, line: 'red', status: 'down' },
  { id: 4, line: 'orange', status: 'maintenance' }
];

// Use body parser so we can get info from POST/URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Err out early on if we are missing configuration variables
if (!config.CLIENT_SECRET || !config.USERNAME || !config.PASSWORD) {
  throw 'Make sure you have a CLIENT_SECRET, USERNAME, and PASSWORD in your .env file'
}

// Store our CLIENT_SECRET in a variable for use later on
app.set('secretKey', config.CLIENT_SECRET);

// Create a function to check the authentication for private endpoints
const checkAuth = (request, response, next) => {

  // Check headers/POST body/URL params for an authorization token
  const token = request.body.token || 
                request.param('token') || 
                request.headers['authorization'];

  // If a token is found, decode and verify it
  if (token) {
    jwt.verify(token, app.get('secretKey'), (error, decoded) => {

      // If the token is invalid or expired, respond with an error      
      if (error) {
        return response.json({ success: false, message: 'Invalid authorization token.' });    
      }

      // If the token is valid, save the decoded version to the
      // request for use in other routes & continue on with next()
      else {
        request.decoded = decoded;  
        next();
      }
    });
  }

  // If no token is found, respond with a 403 Forbidden error
  else {
    return response.status(403).send({ 
      success: false, 
      message: 'You must be authorized to hit this endpoint'
    });
  }
}




// =================================================================
// API endpoints ===================================================
// =================================================================

// Authentication/Login Endpoint
app.post('/authenticate', (request, response) => {
  const user = request.body;

  // If the user enters credentials that don't match our hard-coded
  // credentials in our .env configuration file, send a JSON error
  if (user.username !== config.USERNAME || user.password !== config.PASSWORD) {
    response.status(403).send({ success: false, message: 'Invalid Credentials' });
  }

  // If the credentials are accurate, create a token and send it back
  else {
    let token = jwt.sign(user, app.get('secretKey'), {
      expiresIn: 172800 // expires in 48 hours
    });

    response.json({
      success: true,
      username: user.username,
      token: token
    });
  }
});

// Public API Endpoint
app.get('/api/v1/trains', (request, response) => {
  response.send(app.locals.trains);
});

// Private API Endpoint
app.patch('/api/v1/trains/:id', checkAuth, (request, response) => {
  const { train } = request.body;
  const { id } = request.params;
  const index = app.locals.trains.findIndex((m) => m.id == id);

  if (index === -1) { return response.sendStatus(404); }

  const originalTrain = app.locals.trains[index];
  app.locals.trains[index] = Object.assign(originalTrain, train);

  return response.json(app.locals.trains);
});




// =================================================================
// start the server ================================================
// =================================================================

app.listen(3001);
console.log('Listening on http://localhost:3001');
