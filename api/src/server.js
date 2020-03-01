const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes');
const cors = require('cors');

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(`mongodb://admin:d1nud10smd@ds259577.mlab.com:59577/instagram`, {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Listening on ${port}.`));
