const router = require("express").Router();
const usersController = require("../../controllers/UsersController");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.create)
  .put(usersController.update)
// Matches with "/api/users/:id"
router
  .route("/:id")


  .get(usersController.findById) 
  .delete(usersController.remove);

module.exports = router;
