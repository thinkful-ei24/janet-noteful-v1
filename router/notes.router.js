const express = require('express');
const jsonParser = express.json();
const notesRouter = express.Router();
const simDB = require('./db/simDB');  



app.get('/api/notes', (req, res) => {
  /*The Noteful App client is already wired-up to support search. 
  The handleNoteSearchSubmit function creates an event handler function 
  that builds a query object with a searchTerm property and passes it 
  to api.search(). The api.search() method passes the object to $.ajax 
  which transforms the object into a query-string
  like this: { searchTerm : cats } becomes ?searchTerm=cats
  An example URL, which you can test in Postman, would look like this:
  http://localhost:8080/api/notes?searchTerm=cats*/
  //req.query 
  //This property is an object containing a property for each query string parameter in the route. 
  //If there is no query string, it is the empty object, {}.
  //ex req.query = {searchTerm= cats}
  //=======================================================
  // const requestedData = [];
  
  // if(searchTerm){
  //   for (let i  =0; i<data.length; i++){
  //     if  (data[i].title.includes(searchTerm)){
  //       requestedData.push(data[i]);
  //     }
  //   }
  //   res.json(requestedData);
    
  // }else{
  //   res.json(data);
  // }
  
  //   const searchTerm = req.query.searchTerm;
  //   if (searchTerm) {
  //     const filteredList = data.filter(function(item) {
  //       return item.title.includes(searchTerm);
  //     });
  //     res.json(filteredList);
  //   } else {
  //     res.json(data);
  //   }
  // });
  
  const { searchTerm } = req.query;
  
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
  
});
  
//===============================================================
    
app.get('/api/notes/:id', (req, res, next) => {
  // const {id} = req.params;
  // //const id = req.params.id; LINE 26 is the same as this
  // let requestedData = data.find(item => item.id === Number(id));
   
  // // //This is the same as line 24
  // //   for (let i = 0 ; i < data.length; i++){
  // //     if (data[i].id=== Number(id)){
  // //       requestedData = data[i];
  // //     }
  // //   }
  // res.json(requestedData);
  
  const {id} = req.params;
  notes.find(id, (err,item)=>{
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
app.put('/api/notes/:id', (req, res, next) => {
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
  
  