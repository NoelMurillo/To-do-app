const lodash = require('lodash');
const express = require('express');
const bodyparser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require ('./db/mongoose');
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var app = express();

const port = process.env.PORT || 3000;
app.use(bodyparser.json());

app.post('/todos', (req, res)=>{
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  }, (e)=>{
    res.status(400).send(e);
  })
});

app.get('/todos/:id', (req, res)=>{
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
     return res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e)=> {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res)=>{
  //gets the ide
  var id = req.params.id;
  //validates the id , if not valid return 404
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  //removes the todo by id
  Todo.findByIdAndRemove(id).then((todo) =>{
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });

});

app.patch('/todos/:id', (req, res)=>{
  var id= req.params.id;
  var body= _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed)&& body.completed) {
    body.completedAt = new Date().getTime();
  } else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo)=>{
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    return res.status(400).send();
  });
});

app.listen(port, ()=> {
  console.log(`Started at port ${port}`);
});

module.exports = {app};
