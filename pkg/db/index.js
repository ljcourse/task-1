const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD,
);
exports.init = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('success database');
    } catch (err) {
        console.log(err);
    }
};