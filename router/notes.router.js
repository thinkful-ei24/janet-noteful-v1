const express = require('express');
const jsonParser = express.json();
const notesRouter = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');  
const notes = simDB.initialize(data); 



notesRouter.get('/', (req, res, next) => {
  
  const { searchTerm } = req.query;
  
  notes.filter(searchTerm, (err, list,) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
  
});
  
//===============================================================
    
notesRouter.get('/:id', (req, res, next) => {

  const {id} = req.params;
  notes.find(id, (err,item,)=>{
    if (err) {
      console.error(err);
    }
    if (item) {
      console.log(item);
      res.json(item);
    } else {
      console.log('not found');
      next();
    }
      
  });
  
});
  
//===============================================================
//// PUT ENDPOINT
notesRouter.put('/', jsonParser, (req, res, next) => {
  const id = req.params.id;
  
  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];
  
  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  
  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});
  
module.exports = notesRouter;