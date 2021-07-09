'use strict';
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const userRoutes = require('../server/api/users');
const articleRoutes = require('../server/api/articles');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes.routes);
app.use('/api', articleRoutes.routes);
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);
// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
