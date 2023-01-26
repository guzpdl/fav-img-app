const router = require("express").Router();
const {
  seeProfile,
  editProfileForm,
  submitUpdateProfile,
  submitImageUpload,
  seeImages,
  deleteImage,
  editImageForm,
  submitEditImage,
} = require("../controller/profile.controller");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/:id", isLoggedIn, seeProfile);

router.get("/edit/:id", isLoggedIn, editProfileForm);

router.get("/images/:id", isLoggedIn, seeImages);

router.get("/images/edit/:id", isLoggedIn, editImageForm);

router.post("/images/edit/:id", isLoggedIn, submitEditImage);

router.post("/images/delete/:id", isLoggedIn, deleteImage);

router.post("/edit/:id", isLoggedIn, submitUpdateProfile);

router.post("/upload-image", isLoggedIn, submitImageUpload);

module.exports = router;
