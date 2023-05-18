const User = require('../pkg/user/userSchema')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const util = require('util');

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
            expiresIn: process.env.JWT_EXP
        });

        res.cookie('jwt', token, {
            expiress: new Date(Date.now() + process.env.JWT_COOKIE * 24 * 60 * 60 * 1000),
            secure: true,
            httpOnly: true,
        });
        res.status(200).redirect('/test');
    } catch (err) {

        return res.status(500).send(err)
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('error user');
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('error email pass');
        }
        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('error email pass');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: process.env.JWT_EXP
        });
        res.cookie("jwt", token, {
            expiress: new Date(
                Date.now() + process.env.JWT_EXP * 24 * 60 * 60 * 1000
            ),
            secure: true,
            httpOnly: true,
        });
        res.status(200).redirect('/welcome');
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(' ').toString();
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return res.status(500).send("You are not logged in");
    }
    const decoded = await util.promisify(jwt.verify)(token, process.env.JWT);
    const userTrue = await User.findById(decoded.id);
    if (!userTrue) {
        return res.status(401).send("User doenst exist!");
    }
    req.user = userTrue;
    next();
};

exports.logout = async (req, res) => {
    try {
        res.cookie("jwt", "signed out", {
            expires: new Date(Date.now() + 5 * 50),
            httpOnly: true,
        });
        res.status(200).redirect('/test')
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
};