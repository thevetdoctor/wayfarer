/* eslint-disable no-console */
// Import dependencies
import express from 'express';
import path from 'path';
import parser from 'body-parser';
import routeHandler from './src/routes';

// Setup Express server
const app = express();

// Declare PORT
const port = process.env.PORT || 4000;

// Set body parser to make parameter acceptable
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Link routeHandler
routeHandler(app);

// Declare root path
app.get('/api/v1', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

// Initialise Server
app.listen(port, () => {
  console.log(`Server started @ ${port}`);
});


export default app;