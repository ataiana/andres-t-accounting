require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(require('./routes'));

// Initialize webserver
app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}`)
);

module.exports = app;