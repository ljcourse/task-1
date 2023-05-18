const mongoose = require('mongoose');

const academySchema = new mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String,
    },
});

const Academy = mongoose.model('academy', academySchema);
module.exports = Academy;