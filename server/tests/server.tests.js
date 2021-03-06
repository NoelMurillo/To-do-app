const expect = require('expect');
const supertest = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {objectId} =  require('.mongodb');

const todos = [{
  _id: new objectId(),
  text: 'First todo'
}, {
  _id: new objectId(),
  text: 'Second todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=> done());
});

describe('POST /todos', ()=> {
  it('should create a new todo', (done)=>{
    var text = 'testing text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err, res)=> {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=> done(e));
      });
  });

  it('should not create a new todo with invalid body data', (done)=>{

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res)=> {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=> done(e));
      });
  });
});

describe('GET /todos', ()=> {
  it('should get all todos', (done)=>{

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos).toBe(2);
      })
      .end(done);
  });


});

describe('GET /todos/:id', ()=> {
  it('should return todo doc', (done)=>{

    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done)=>{
    var hexId = new objectId().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done)=>{

    request(app)
      .get(`/todos/123ABC`)
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', ()=> {
  it('should remove a todo', (done)=>{
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((error, res)=>{
        if (error) {
          return done(error);
        }
        Todo.findById(hexId).then((todo)=>{
          expect(todo).toNotExist();
          done();
        }).catch((e)=> done() );
      });
  });

  it('should return a 404 if todo not found', (done)=>{

    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it('should return a 404 if object id is invalid', (done)=>{

    request(app)
      .get(`/todos/123ABC`)
      .expect(404)
      .end(done);
  });

});



describe('PATCH /todos/:id', ()=> {
  it('should update a todo', (done)=>{
    var hexId = todos[0]._id.toHexString();
    var text = '';
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text: text
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBe('number')
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done)=>{

    var hexId = todos[0]._id.toHexString();
    var text = '';
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text: text
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done);
  });
  // it('should return a 404 if object id is invalid', (done)=>{
  //
  //   request(app)
  //     .get(`/todos/123ABC`)
  //     .expect(404)
  //     .end(done);
  // });

});
