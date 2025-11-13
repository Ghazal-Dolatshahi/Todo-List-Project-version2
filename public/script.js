const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');

async function loadTodos() {
  const res = await fetch('/api/todos');
  const todos = await res.json();
  list.innerHTML = '';

  todos.forEach((t)=>{
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <button class="check-btn">${t.done ? '✔️' : ''}</button>
      <span class="task-text ${t.done ? 'completed' : ''}">${t.text}</span>
      <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="del-btn">Delete</button>
      </div>`;
    list.appendChild(li);

    li.querySelector('.check-btn').onclick = async () => {
      await fetch(`/api/todos/${t.id}`, { method:'PUT' });
      loadTodos();
    }

    li.querySelector('.del-btn').onclick = async () => {
      await fetch(`/api/todos/${t.id}`, { method:'DELETE' });
      loadTodos();
    }

    li.querySelector('.edit-btn').onclick = () => editTodo(t.id, li);
  });
}

async function addTodo() {
  const text = input.value.trim();
  if(!text) return;

  await fetch('/api/todos', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ text })
  });
  input.value='';
  loadTodos();
}

async function editTodo(id, li){
  const span = li.querySelector('.task-text');
  const inp = document.createElement('input');
  inp.className='edit-input';
  inp.value = span.textContent;
  span.replaceWith(inp);
  inp.focus();

  inp.onblur = async ()=>{
    await fetch(`/api/todos/${id}`, {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ text: inp.value })
    });
    loadTodos();
  }

  inp.onkeydown = e=>{
    if(e.key==='Enter') inp.blur();
    if(e.key==='Escape') loadTodos();
  }
}

addBtn.onclick = addTodo;
input.onkeydown = e=>{
  if(e.key==='Enter') addTodo();
}

loadTodos();
