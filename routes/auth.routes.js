const router = require("express").Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const {
  signupForm,
  submitSignup,
  loginForm,
  submitLogin,
  logout,
} = require("../controller/auth.controller");

router.get("/signup", isLoggedOut, signupForm);

router.get("/login", isLoggedOut, loginForm);

router.post("/signup", isLoggedOut, submitSignup);

router.post("/login", isLoggedOut, submitLogin);

router.get("/logout", isLoggedIn, logout);

module.exports = router;
