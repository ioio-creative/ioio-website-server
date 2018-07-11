const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');  // example

const defaultPort = 8080;
const sourceFileBuildDirectory = 'client/build';
const defaultSourceDocument = 'index.html';

/*
  Important:
  calling path.join() in Windows would result in '\' but not '/',
  not desired for constructing api end points.
*/
const apiEndPointPrefix = '/api/';

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, sourceFileBuildDirectory)));

// How to retrieve POST query parameters?
// https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
// https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Put all API endpoints under '/api'
// example
// GET /api/passwords
app.get(apiEndPointPrefix + 'passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// test
// POST /api/test
app.post(apiEndPointPrefix + 'test', (req, res) => {
  const reqBody = req.body;
  console.log('Resequest received:');
  console.log(reqBody);
  console.log(`Button ${reqBody.btnPressed} is pressed.`);
  res.json({
    message: `Request: ${JSON.stringify(reqBody)} received`,
    buttonPressed: reqBody.btnPressed
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, sourceFileBuildDirectory, defaultSourceDocument));
  console.log("Default file sent");
});

const port = process.env.PORT || defaultPort;
app.listen(port);

console.log(`IOIO website server listening on ${port}`);