const {
  getAllUsers,
  sign_up,
  getUser,
  deleteUser,
  updateUser,
  sign_in,
  verifyUser,
} = require("../controller/user.controller");
const validateRequest = require("../../../common/middelware/validateRequest");
const isAuthoraized = require("../../../common/middelware/isAuthoraized");
const { addUserSchema, singInSchema } = require("../joi/userValidation");
const { GET_ALL_USERS } = require("../endPoints");

const router = require("express").Router();

router.get("/users", isAuthoraized(GET_ALL_USERS), getAllUsers); 
router.get("/verifyUser/:token", verifyUser); 
router.get("/user/:id", getUser);
router.post("/addUser", validateRequest(addUserSchema), sign_up);
router.post("/signIn", validateRequest(singInSchema), sign_in);
router.delete("/deleteUser/:id", deleteUser);
router.patch("/updateUser/:id", updateUser);

module.exports = router;
