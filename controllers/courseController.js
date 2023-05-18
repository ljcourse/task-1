const Course = require('../pkg/course/courseSchema');

exports.getAll = async (req, res) => {
    try {
        const course = await Course.find();
        res.status(200).json({
            status: "succcess",
            data: {
                course
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'err',
            message: err,
        });
    }
};

exports.getOne = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                course,
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'err',
            message: err
        });
    }
};

exports.update = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            data: {
                course
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'err',
            message: err,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: 'err',
            message: err,
        });
    }
};

exports.create = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                course,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'err',
            message: err,
        });
    }
};