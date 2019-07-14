"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */

/* eslint-disable no-unused-vars */
// Import dependencies
// import { config } from 'dot-env';
// Setup Express server
var app = (0, _express["default"])(); // Declare PORT

var port = process.env.PORT || 8000; // Set body parser to make parameter acceptable

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // use swagger-Ui-express for your app documentation endpoint

app.use('/api/v1/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"])); // copywright:
// https://medium.com/the-andela-way/splitting-your-swagger-spec-into-multiple-files-in-a-node-project-2019575b0ced
// Link routeHandler

(0, _routes["default"])(app); // Declare root path
// console.log(__dirname);

app.get('/api/v1', function (req, res) {
  res.sendFile(_path["default"].join(__dirname.replace('src', ''), '/index.html'));
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}); // app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/index.html'));
// });
// Initialise Server

app.listen(port, function () {
  console.log("Server started @ ".concat(port));
}); // process.exit();

var _default = app;
exports["default"] = _default;