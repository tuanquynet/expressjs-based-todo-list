const express = require('express');
const store = require('../store');

const router = express.Router();

/* GET tasks listing. */
router.get('/', function(req, res, next) {
  res.json({tasks: store.tasks});
});

/* GET a task. */
router.get('/:taskId', function(req, res, next) {
	const {taskId} = req.params;
	if (!taskId) {
		throw new Error('Missing taskId');
	}
	const task = store.tasks.find(task => task.id === taskId);

  res.json({task: task});
});

/* POST a task*/
router.post('/', function(req, res, next) {
	const doc = req.body;
	// CAUSE: It can be duplicated.
	doc.id = new Date().getTime().toString();
	store.tasks.push(doc);

  res.json({task: doc});
});

/* POST a task*/
router.patch('/:taskId', function(req, res, next) {
	const {taskId} = req.params;
	if (!taskId) {
		throw new Error('Missing taskId');
	}
	
	const doc = req.body;
	const task = store.tasks.find(task => task.id === taskId);

	Object.assign(task, doc);

  res.json({task: task});
});

/* DELETE a task*/
router.delete('/:taskId', function(req, res, next) {
	const {taskId} = req.params;
	if (!taskId) {
		throw new Error('Missing taskId');
	}

	const doc = req.body;
	const index = store.tasks.findIndex(task => task.id === taskId);

	if (index < 0) {
		throw new Error('No such task.');
	}

	store.tasks.splice(index, 1);

  res.json({result: true});
});

module.exports = router;
