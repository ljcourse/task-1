const Academy = require('../pkg/academy/academySchema');


exports.getBlogView = async (req, res) => {
    try {
        const academy = await Academy.find();
        res.status(200).render("academy", {
            title: "Тест за backend развој на софтвер",
            academy,
        });
    } catch (err) {
        res.status(500).send("Error with this page");
    }
};

exports.getAcademy = async (req, res) => {
    try {
        const academy = await Academy.find();
        res.status(200).render("test", {
            title: "Тест за backend развој на софтвер",
            academy,
        });
    } catch (err) {
        res.status(500).send("Error this page");

    }
};

exports.createBlog = async (req, res) => {
    try {
        await Academy.create(req.body);
        res.status(200).redirect('/welcome');
    } catch (err) {
        console.log(err);
        res.status(500).send('err')
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        await Academy.findByIdAndDelete(id);
        res.redirect('/welcome');
    } catch (err) {
        console.log(err);
        res.status(500).send('error deleting blog');
    }
};

exports.updateBlog = async (req, res) => {
    try {
        await Academy.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).redirect('/welcome');
    } catch (err) {
        console.log(err);
        res.status(500).send('err')
    }
};