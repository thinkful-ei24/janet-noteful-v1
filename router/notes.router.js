const express = require('express');
const jsonParser = express.json();
const notesRouter = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');  
const notes = simDB.initialize(data); 


//===============================================================
// search by title query
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
 // get by ID   
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
// PUT ENDPOINT, update a note object
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
//===============================================================
// Post (insert) an item
notesRouter.post('/', (req, res, next) => {
    const { title, content } = req.body;
  
    const newItem = { title, content };
    /***** Never trust users - validate input *****/
    if (!newItem.title) {
      const err = new Error('Missing `title` in request body');
      err.status = 400;
      return next(err);
    }
  
    notes.create(newItem, (err, item) => {
      if (err) {
        return next(err);
      }
      if (item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      } else {
        next();
      }
    });
  });

//===============================================================
// Delete an item
notesRouter.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    console.log(id);
    
    /***** Never trust users - validate input *****/
    if (!id || isNaN(id)) {
      const err = new Error('Missing `id` in request body');
      err.status = 500;
      return next(err);
    }
    notes.delete(id, (err, item) => {
      if (err) {
        return next(err);
      }
      if (id) {
        console.log('item deleted');
        res.status(204).end();
      } else {
        next();
      }
    });


  });



  
module.exports = notesRouter;