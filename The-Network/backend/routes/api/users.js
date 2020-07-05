const router = require("express").Router();


// matches /api/user/hello
router.route('/hello').post((req, res) => {
    res.json("hellofrom backend");
    console.log("helllooo");
})
module.exports = router;