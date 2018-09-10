const express = require('express');
const app = express();

const morgan = require('morgan');
const data = require('./db/notes');
const simDB = require('./db/simDB');  
const notes = simDB.initialize(data); 
//import router
const notesRouter = require('./router/notes.router');

// ADD STATIC SERVER HERE
app.use(express.static('public'));
// Parse request body
app.use(express.json());
//logger
app.use(morgan('dev'));
//==========================================
//mounts Router
app.use('/api/notes', notesRouter);

//import port
const { PORT } = require('./config');

//const {logger} = require('./middleware/logger');

//==========================================
// //error handling

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

//==========================================
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});