const Academy = require('../pkg/academy/academySchema');

exports.getAll = async (req, res) => {
    try {
        const academy = await Academy.find();
        res.status(200).json({
            status: "succcess",
            data: {
                academy: academy
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
        const academy = await Academy.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                academy: academy,
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
        const academy = await Academy.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            data: {
                academy
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'err',
            message: err,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        await Academy.findByIdAndDelete(req.params.id);
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
        const academy = await Academy.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                academy: academy,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'err',
            message: err,
        });
    }
};