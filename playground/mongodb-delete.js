
const {MongoClient, ObjectId} = require('mongodb') //.MongoClient;


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=> {
  if (err) {
    return console.log('Unable to connect to server');
  }
  console.log('Connected to MongoDB server');

  //Delete many
  // db.collection('Todos').deleteMany({text: 'Go eat lunch'}).then((result)=>{
  //   console.log(result);
  // })

  //Delete One
  // db.collection('Todos').deleteOne({text: 'Go to meeting'}).then((result)=>{
  //   console.log(result);
  // })

  //find One and delete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
  //   console.log(result);
  // })
  //db.close();

  // db.collection('Users').deleteMany({name: 'Noel'}).then((result)=>{
  //   console.log(result);
  // })

  db.collection('Users').findOneAndDelete({
    _id: new ObjectId("5c0ec3d657b0f9fdb8fa0b7b")
  }).then((result)=>{
    console.log(JSON.stringify(result, undefined, 2));
  })
});
