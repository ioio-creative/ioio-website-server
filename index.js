const express = require('express');
const path = require('path');

const defaultPort = 5000;
const sourceFileBuildDirectory = 'client/build';
const defaultSourceDocument = 'index.html';

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, sourceFileBuildDirectory)));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  // const count = 5;

  // // Generate some passwords
  // const passwords = Array.from(Array(count).keys()).map(i =>
  //   generatePassword(12, false)
  // )

  // // Return them as json
  // res.json(passwords);

  // console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, sourceFileBuildDirectory, defaultSourceDocument));
});

const port = process.env.PORT || defaultPort;
app.listen(port);

console.log(`IOIO website server listening on ${port}`);