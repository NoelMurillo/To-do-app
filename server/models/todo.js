var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minLenght: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// var otherTodo = new Todo({
//   text: 'Edit the code'
// });
//
// otherTodo.save().then((doc)=>{
//   console.log('Saved task:', doc);
// }, (e)=>{
//   console.log('Unable to save task');
// });


module.exports = {Todo}
