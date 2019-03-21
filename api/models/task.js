const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types } = mongoose.Schema;

const TaskSchema = new Schema({
	text: { type: Types.String, required: true },
	completed: { type: Types.Boolean, required: true, default: false },
});

const TaskModel = mongoose.model('Task', TaskSchema);

TaskSchema.set('toJSON', {
	transform: function (doc, ret, options) {
			ret.id = ret._id;
			delete ret._id;
			delete ret.__v;
	}
});

module.exports = {
	TaskSchema,
	TaskModel,
};