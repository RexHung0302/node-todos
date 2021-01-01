const todosDB = require('../models/todos');
const { validationResult } = require('express-validator');

module.exports = {
  getTodos: (req, res) => {
    todosDB.getTodo(req.session.auth.uid).once('value', snapshot=>{
      var data = snapshot.val();
      if(!data) {
        req.session.destroy();
        res.redirect('users/login');
      } else {
        if(!data.todos) {
          todosDB.getTodo(req.session.auth.uid).child('todos').set('');
        } 

        // 有帶條件
        if(data.todos && data.todos !== '' && req.query.status) {
          let formatTodos = [];
          for( var todo in data.todos ) {
            if(data.todos[todo].status == req.query.status) {
              formatTodos.push(data.todos[todo]);
            }
          }

          res.render('index', {
            title: 'Index',
            auth: req.session.auth,
            todos: formatTodos
          });
        } else {
          res.render('index', {
            title: 'Index',
            auth: req.session.auth,
            todos: data.todos ? data.todos : null
          });
        }
      }
    })
  },
  getNewTask: (req, res) => {
    res.render('newTask', {
      title: 'New Task',
      auth: req.session.auth,
      error: req.flash('error'),
      title_val: req.flash('title_val'),
      expiry_val: req.flash('expiry_val'),
      content: req.flash('content_val'),
    });
  },
  postNewTask: (req, res) => {
    const errors = validationResult(req);
    const { title, expiry, content } = req.body;

    if (!errors.isEmpty()) {
      req.flash('error', errors.errors);
      req.flash('title_val', title);
      req.flash('expiry_val', expiry);
      req.flash('content_val', content);
      res.redirect('/newTask');
    } else if(errors.isEmpty()) {
      todosDB.getTodo(req.session.auth.uid).child('todos').push({
        title: title,
        expiry: expiry,
        content: content,
        status: 0
      });

      res.redirect('/');
    }
  },
  deleteTodo: (req, res) => {
    const { todo_id } = req.body;

    if(!todo_id) {
      res.json({
        "status": 0,
        "msg": "error",
        "info": "Lack Todo Id"
      });
      res.end();
    } else {

      todosDB.getTodo(req.session.auth.uid).child('todos').child(todo_id).remove();

      res.json({
        "status": 1,
        "msg": "success",
      });
      res.end();
    }
  },
  getEditTask: (req, res) => {
    const todo_id = req.params.id;
    const err = req.flash('error');

    if(err && err.length > 0) {
      res.render('editTask', {
        title: 'Edit Task',
        auth: req.session.auth,
        error: err,
        title_val: req.flash('title_val'),
        expiry_val: req.flash('expiry_val'),
        content_val: req.flash('content_val')
      });
    } else {
      todosDB.getTodo(req.session.auth.uid).child('todos').child(todo_id).once('value', snapshot=>{
        const data = snapshot.val();
        const { title, expiry, content } = data;
        const formatDate = expiry.replace(/\//g, "-");
  
        res.render('editTask', {
          title: 'Edit Task',
          auth: req.session.auth,
          error: req.flash('error'),
          title_val: title,
          expiry_val: formatDate,
          content_val: content
        });
      })
    }
  },
  postEditTask: (req, res) => {
    const errors = validationResult(req);
    const todo_id = req.params.id;
    const { title, expiry, content } = req.body;

    if (!errors.isEmpty()) {
      req.flash('error', errors.errors);
      req.flash('title_val', title);
      req.flash('expiry_val', expiry);
      req.flash('content_val', content);
      res.redirect(`/editTask/${todo_id}`);
    } else if(errors.isEmpty()) {

      todosDB.getTodo(req.session.auth.uid).child('todos').child(todo_id).set({
        title: title,
        expiry: expiry,
        content: content,
        status: 0
      });

      res.redirect('/');
    }
  },
  changeStatus: (req, res) => {
    const { todo_id, status } = req.body;

    if(!todo_id) {
      res.json({
        "status": 0,
        "msg": "error",
        "info": "Lack Todo Id"
      });
      res.end();
    } else {

      todosDB.getTodo(req.session.auth.uid).child('todos').child(todo_id).once('value', snapshot=>{
        const data = snapshot.val();
        const { title, expiry, content } = data;

        todosDB.getTodo(req.session.auth.uid).child('todos').child(todo_id).set({
          title: title,
          expiry: expiry,
          content: content,
          status: status
        });

        res.json({
          "status": 1,
          "msg": "success",
        });
        res.end();
      })
      
    }
  },
}