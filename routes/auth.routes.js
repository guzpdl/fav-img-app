const router = require("express").Router();
const {
  signupForm,
  submitSignup,
  loginForm,
  submitLogin,
  logout,
} = require("../controller/auth.controller");
const isLoggedOut = require("../middleware/isLoggedOut");

router.get("/signup", signupForm);

router.get("/login", isLoggedOut, loginForm);

router.post("/signup", submitSignup);

router.post("/login", submitLogin);

router.get("/logout", logout);

module.exports = router;
