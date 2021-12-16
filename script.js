console.log('Connected!');

const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (tasksArray) {
  const tasksObj = tasksArray.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // UI elements
  const tasksContainer = document.querySelector('.tasks-list');
  const todoForm = document.forms['todoForm'];
  const inputTitle = todoForm.elements['title'];
  const inputBody = todoForm.elements['body'];
  renderTasks(tasksObj);

  // Events
  todoForm.addEventListener('submit', onFormSubmitHandler);
  tasksContainer.addEventListener('click', onDeleteHandler);
  function renderTasks(tasksList) {
    if (!tasksList) return console.error('TasksList not defined');
    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    tasksContainer.appendChild(fragment);
  }
  function listItemTemplate({ _id, title, body } = {}) {
    const li = document.createElement('li');
    li.setAttribute('data-task-id', _id);
    li.classList.add('task-item');
    const span = document.createElement('span');
    span.textContent = title;
    span.classList.add('task-list-title');
    const descr = document.createElement('p');
    descr.textContent = body;
    descr.classList.add('task-list-descr');
    const button = document.createElement('button');
    button.classList.add('deleteBtn');
    button.textContent = 'Delete';
    li.append(span, descr, button);
    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    if (!titleValue || !bodyValue) {
      alert('Please, write title and body for task');
      return;
    }
    const newTask = createNewTask(titleValue, bodyValue);
    const newList = listItemTemplate(newTask);
    tasksContainer.insertAdjacentElement('afterbegin', newList);
    todoForm.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };
    tasksObj[newTask._id] = newTask;
    return { ...newTask };
  }
  function deleteTask(id) {
		const {title} = tasksObj[id];
    const userConfirm = confirm(`You want delete this task = ${title}? `);
		if (!userConfirm) return userConfirm;
		delete tasksObj[id];
		return userConfirm;
  }

	function deleteTaskForomHTML(confirmed, taskItem) {
		if (!confirmed) return;
		taskItem.remove();
	}

  function onDeleteHandler({ target }) {
    if (!target.classList.contains('deleteBtn')) {
      return;
    } else {
      const taskItem = target.closest('[data-task-id]');
      const id = taskItem.dataset.taskId;
      const confirmed = deleteTask(id);
			deleteTaskForomHTML(confirmed, taskItem);
    }
  }
})(tasks);
