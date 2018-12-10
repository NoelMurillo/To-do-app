
const {MongoClient, ObjectId} = require('mongodb') //.MongoClient;


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=> {
  if (err) {
    return console.log('Unable to connect to server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectId('5c0eb82e57b0f9fdb8fa09aa')
  // }).toArray().then((docs)=>{  instead of toArray and docs use count() and count to get total of elements
  //   //console.log(`Todos count ${count}`);
  //   //console.log(JSON.stringify(docs, undefined, 2));
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err)=> {
  //   console.log('Unable to fetch data that you requested', err);
  // });

  db.collection('Users').find().toArray().then((docs)=>{
    console.log(`Name of users:`);
    console.log(JSON.stringify(docs, undefined, 2));
   }, (err)=> {
     console.log('Unable to fetch data that you requested', err);
  })

  //db.close();
});
