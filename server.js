const express = require('express');

const data = require('./db/notes');

const app = express();

app.listen(8080, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
    

// ADD STATIC SERVER HERE


app.get('/api/notes', (req, res) => {
  res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  const {id} = req.params;
  //const if = req.params.id; LINE 22 is the same as this
  let requestedData = data.find(item => item.id === Number(id));


//   for (let i = 0 ; i < data.length; i++){
//     if (data[i].id=== Number(id)){
//       requestedData = data[i];
//     }
//   }

   res.json(requestedData);

});


