
const {MongoClient, ObjectId} = require('mongodb') //.MongoClient;


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=> {
  if (err) {
    return console.log('Unable to connect to server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id : new ObjectId("5c0ec65057b0f9fdb8fa0c0d")
  // },{
  //   $set: {
  //     text: 'Go eat lunch completed',
  //     completed: true
  //   }
  // },{
  //   returnOriginal:false
  // }).then((result)=>{
  //   console.log(result);
  // })

  db.collection('Users').findOneAndUpdate({
    _id : new ObjectId("5c0ec3c857b0f9fdb8fa0b76")
  },{
    $set: {
      name: 'Edgardo'
    },
    $inc: {
      age: 1
    }
  },{
    returnOriginal:false
  }).then((result)=>{
    console.log(result);
  })
});
