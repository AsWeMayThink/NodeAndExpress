const express = require('express');
const path = require('path');
const logger = require('morgan');

let app = express();
let port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
