/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// Import dependencies
import express from 'express';
import path from 'path';
import parser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger';
import routeHandler from './routes';
// import { config } from 'dot-env';


// Setup Express server
const app = express();


// Declare PORT
const port = process.env.PORT || 8000;


// Set body parser to make parameter acceptable
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));


// use swagger-Ui-express for your app documentation endpoint
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// copywright:
// https://medium.com/the-andela-way/splitting-your-swagger-spec-into-multiple-files-in-a-node-project-2019575b0ced


// Link routeHandler
routeHandler(app);


// Declare root path
console.log(path.join(__dirname.replace('src', 'dist'), '/index.html'));
app.get('/api/v1', (req, res) => {
  res.sendFile(path.join(__dirname.replace('src', 'dist'), '/index.html'));
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/index.html'));
// });


// Initialise Server
app.listen(port, () => {
  console.log(`Server started @ ${port}`);
});

// process.exit();


export default app;
