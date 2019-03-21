const express = require('express');
// const store = require('../store');
const {TaskModel} = require('../models/task');

const router = express.Router();

/* GET tasks listing. */
router.get('/', async function(req, res, next) {
	const tasks = await TaskModel.find({});
	
  res.json({tasks});
});

/* GET a task. */
router.get('/:taskId', async function(req, res, next) {
	const {taskId} = req.params;
	if (!taskId) {
		throw new Error('Missing taskId');
	}
	const task = await TaskModel.findById(taskId);

  res.json({task: task});
});

/* POST a task*/
router.post('/', async function(req, res, next) {
	const doc = req.body;
	// CAUSE: It can be duplicated.
	const task = await TaskModel.create(doc);
	
  res.json({task});
});

/* POST a task*/
router.patch('/:taskId', async function(req, res, next) {
	const {taskId} = req.params;
	if (!taskId) {
		throw new Error('Missing taskId');
	}
	
	const doc = req.body;
	const task = await TaskModel.findById(taskId);
	console.log('task');
	console.log(task);

	if (!task) {
		throw new Error('No such task.');
		// return next(new Error('No such task.'));
	}

	await TaskModel.updateOne({_id: taskId}, doc);

  res.json({task: Object.assign(task, doc)});
});

/* DELETE a task*/
router.delete('/:taskId', async function(req, res, next) {
	const {taskId} = req.params;
	if (!taskId) {
		throw new Error('Missing taskId');
	}

	await TaskModel.deleteOne({_id: taskId});

  res.json({task: {id: taskId}});
});

module.exports = router;
