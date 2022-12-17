const express = require('express');
const { default: mongoose } = require('mongoose');

const router = express.Router();
const todoSchema = require('../Schema/todoSchema');

// eslint-disable-next-line new-cap
const Todo = new mongoose.model('Todo', todoSchema);

// Get all todos
router.get('/all', async (req, res) => {
    try {
        const data = await Todo.find({});
        res.status(200).json({
            result: data,
        });
    } catch (error) {
        res.status(500).json({
            error: console.log(error),
        });
    }
});
// Get single todo
router.get('/:id', async (req, res) => {
    try {
        const data = await Todo.find({ _id: req.params.id }).select({
            _id: 0,
            status: 0,
            Date: 0,
        });
        res.status(200).json({
            message: 'This data is',
            result: data,
        });
    } catch (error) {
        res.status(500).json({
            error: console.log(error),
        });
    }
});
// Todo post method
router.post('/insert', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(200).json({
            message: 'Data Successfully Inserted',
        });
    } catch {
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

// Insert multiple todo
router.post('/insertMany', async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({
            message: 'Data Successfully Inserted',
        });
    } catch {
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

// Todo post method
router.put('/:id', async (req, res) => {
    try {
        await Todo.updateOne({ _id: req.params.id }, [
            {
                $set: {
                    ...req.body,
                },
            },
        ]);
        res.status(200).json({
            message: 'Update Successfully',
        });
    } catch (error) {
        res.status(500).json({
            error: console.log(error),
        });
    }
});
// Delete Todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: 'Delete Successfully',
        });
    } catch {
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

module.exports = router;
