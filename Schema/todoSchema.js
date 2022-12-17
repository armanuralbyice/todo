const mogoose = require('mongoose');

const todoSchema = mogoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enu: ['active', 'inactive'],
    },
    Date: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = todoSchema;
