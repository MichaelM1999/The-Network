const router = require("express").Router();


// matches /api/user/hello
router.route('/hello').post((req, res) => {
    res.json("hellofrom backend");
    console.log("helllooo");
})
router.route('/login').post((req, res) => {
    if (req.body.password === "Mm64088031!"){
        res.json('Approved');
    } else {
        res.json('Denied');
    }
})
module.exports = router;