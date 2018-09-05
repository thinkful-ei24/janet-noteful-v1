const express = require('express');

const data = require('./db/notes');

const app = express();

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
    

// ADD STATIC SERVER HERE
app.use(express.static('public'));





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

  const searchTerm = req.query.searchTerm;
 

  // if (searchTerm) {
  //   let filteredList = data.filter(function(item) {
  //     return item.title.includes(searchTerm);
  //   });
  //   res.json(filteredList);
  // } else {
  //   res.json(data);
  // }


  let requestedData = [];

  if(searchTerm){
    for (let i  =0; i<data.length; i++){
      if  (data[i].title.includes(searchTerm)){
        requestedData.push(data[i]);
        res.json(requestedData);
      }
    }
  }else{
    res.json(data);
  }
    
  

});


  


app.get('/api/notes/:id', (req, res) => {
  const {id} = req.params;
  //const id = req.params.id; LINE 26 is the same as this
  let requestedData = data.find(item => item.id === Number(id));
 
  // //This is the same as line 24
  //   for (let i = 0 ; i < data.length; i++){
  //     if (data[i].id=== Number(id)){
  //       requestedData = data[i];
  //     }
  //   }
  res.json(requestedData);

});


// app.get('/api/notes', (req,res)=>{
  

// });


