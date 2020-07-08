const router = require("express").Router();
const userRoutes = require("./users");
const stockRoutes = require("./stocks");
const cryptoRoutes = require("./crypto");

router.use("/user", userRoutes);
router.use("/stocks", stockRoutes);
router.use("/crypto", cryptoRoutes);

module.exports = router;