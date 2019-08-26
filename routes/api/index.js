const router = require("express").Router();
const userRoutes = require("./users");
const lbvxRoutes= require("./libridexer")
const account=require("./signin");
// var passport = require("passport");


router.use("/audiobook",lbvxRoutes);
// Book routes
router.use("/users", userRoutes);

router.use("/account",account);


/* GET Google Authentication API. */
// router.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );router.get(
//     "/auth/google/callback",
//     passport.authenticate("google", { failureRedirect: "/", session: false }),
//     function(req, res) {
//         var token = req.user.token;
//         res.redirect("http://localhost:3000?token=" + token);
//     }
// );



module.exports = router;
