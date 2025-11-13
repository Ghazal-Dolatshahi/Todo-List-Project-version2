const express = require('express');
const fs = require('fs');
const router = express.Router();
const DATA_FILE = './data.json';

let todos = [];
let idCounter = 1;

function loadTodos() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    todos = JSON.parse(data);
    if (todos.length > 0) idCounter = Math.max(...todos.map(t => t.id)) + 1;
  } catch (e) {
    todos = [];
  }
}

function saveTodos() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

loadTodos();

router.get('/', (req, res) => {
  const { done } = req.query;
  let result = todos;

  if (done !== undefined) {
    if (done === 'true') result = todos.filter(t => t.done);
    else if (done === 'false') result = todos.filter(t => !t.done);
  }

  res.json(result);
});

router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send('Text required');

  const todo = { id: idCounter++, text, done: false };
  todos.push(todo);
  saveTodos();
  res.status(201).json(todo);
});

router.put('/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).send('Not found');

  if (req.body.text !== undefined) todo.text = req.body.text; 
  else todo.done = !todo.done; 

  saveTodos();
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  saveTodos();
  res.status(204).end();
});

module.exports = router;
