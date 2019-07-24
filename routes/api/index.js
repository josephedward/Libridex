const router = require("express").Router();
const userRoutes = require("./users");
const lbvxRoutes= require("./libridexer")
const account=require("./signin");


router.use("/audiobook",lbvxRoutes);
// Book routes
router.use("/users", userRoutes);

router.use("/account",account);

module.exports = router;
