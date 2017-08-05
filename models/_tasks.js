// big TODO project

let exampleTask = {
	_id: 0,
	_active: true,
	_complete: false,
	_date: new Date(),
	title: 'Learn javascript',
	description: 'Wanna be senjor js dev',
	tags: [
		'javascript',
		'es6',
		'es8'
	]
};

const Tasks = {
	showList(callback) {
		// emit: 'Показать все задачи'
		// action: show all tasks
		// GET /todo
	},

	showTask(id, callback) {
		// emit: 'Подробности задачи'
		// action: show one task by id
		// GET /todo/:id
	},

	addTask(task, callback) {
		// emit: 'Добавить задачу'
		// action: add new task-object {...} 'title:string' + 'description:sting' + 'tags:array-string' + 'complete:false' + 'active:true'
		// POST /todo
	},

	addList(list, callback) {
		// emit: 'Добавить список задач'
		// action: add new task-object from array of tasks [{...}, {...}, {...}] 'title:string' + 'description:sting' + 'tags:array-string' + 'complete:false' + 'active:true'
		// POST /todo
	},
	
	changeTask(id, content, callback) {
		// emit: 'Изменить задачу'
		// action: change task content by id 'title:string' + 'description:sting' + 'tags:array-string'
		// PUT /todo/:id
	},

	pauseTask(id, callback) {
		// emit: 'Приостановить задачу'
		// action: change 'task status' by id to 'complete:false' + 'active:false'
		// PUT /todo/:id
	},

	pauseAll(callback) {
		// emit: 'Приостановить все задачи'
		// action: change all 'tasks status' to 'complete:false' + 'active:false'
		// PUT /todo
	},

	startTask(id, callback) {
		// emit: 'Запустить задачу'
		this.uncompleteTask(id, callback);
	},

	startAll(callback) {
		// emit: 'Запустить все задачи'
		this.uncompleteAll(callback);
	},

	completeTask(id, callback) {
		// emit: 'Завершить задачу'
		// action: change 'task status' by id to 'complete:true' + 'active:false'
		// PUT /todo/:id
	},

	completeAll(callback) {
		// emit: 'Завершить все'
		// action: change all 'tasks status' to 'complete:true' + 'active:false'
		// PUT /todo
	},

	uncompleteTask(id, callback) {
		// emit: 'Возобновить задачу'
		// action: change 'task status' by id to 'complete:false' + 'active:true'
		// PUT /todo/:id
	},

	uncompleteAll(callback) {
		// emit: 'Возобновить все'
		// action: change all 'tasks status' to 'complete:false' + 'active:true'
		// PUT /todo
	},

	clearAllComplete(callback) {
		// emit: 'Удалить все завершенные'
		// action: delete all complete tasks
		// DELETE /todo
	},

	clearAllUncomplete(callback) {
		// emit: 'Удалить все незавершенные'
		// action: delete all uncomplete tasks
		// DELETE /todo
	},

	deleteTask(id, callback) {
		// emit: 'Удалить'
		// action: delete task by id
		// DELETE /todo/:id
	},

	deleteAll(callback) {
		// emit: 'Удалить все'
		// action: delete all tasks
		// DELETE /todo
	}
};

module.exports = Tasks;
