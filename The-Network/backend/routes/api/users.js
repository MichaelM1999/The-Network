const router = require("express").Router();


// matches /api/user/hello
router.route('/hello').post((req, res) => {
    res.json("hellofrom backend");
    console.log("helllooo");
})
router.route('/login').post((req, res) => {
    if (req.body.password === "MakingMillions2020" && req.body.username === "NetworkAdmin"){
        res.json('Approved');
        console.log("welcome " + req.body.username + '!');
    } else {
        res.json('Denied');
        console.log("Inncorect admin password!");
    }
})
module.exports = router;