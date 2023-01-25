const router = require("express").Router();
const {
  seeProfile,
  editProfileForm,
  submitUpdateProfile,
  submitImageUpload,
} = require("../controller/profile.controller");
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/upload-image", submitImageUpload);

router.get("/:id", isLoggedIn, seeProfile);

router.get("/edit/:id", isLoggedIn, editProfileForm);

router.post("/edit/:id", isLoggedIn, submitUpdateProfile);

module.exports = router;
