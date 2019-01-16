
const {objectId} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

//Removes all
// Todo.remove({}).then((result)=>{
//   console.log(result);
// })

//Todo.findOneAndRemove({})

Todo.findOneAndRemove({_id: 'adff'}).then((todo)=>{
  console.log(todo);
})

// Todo.findByIdAndRemove('adff').then((todo)=>{
//   console.log(todo);
// })
