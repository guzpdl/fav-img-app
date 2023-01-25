const User = require("../models/User.model");

const seeProfile = (req, res) => {
  const userDBid = req.params;
  if (res.locals.currentUser._id === userDBid.id) {
    User.findById(res.locals.currentUser._id).then((userDetails) => {
      console.log(userDetails);
      res.render("profile", { userDetails });
    });
  } else {
    res.redirect("/");
  }
};

const editProfileForm = (req, res) => {
  const userDBid = req.params;
  if (res.locals.currentUser._id === userDBid.id) {
    User.findById(res.locals.currentUser._id).then((userDetails) => {
      console.log(userDetails);
      res.render("editProfile", { userDetails });
    });
  } else {
    res.redirect("/");
  }
};

const submitUpdateProfile = (req, res) => {
  let { username, email } = req.body;
  const userDBid = req.params;

  if (res.locals.currentUser._id === userDBid.id) {
    User.findByIdAndUpdate(res.locals.currentUser._id, {
      username,
      email,
    }).then((userDetails) => {
      req.session.currentUser.username = userDetails.username;
      req.session.currentUser.email = userDetails.email;
      res.locals.currentUser = req.session.currentUser;
      req.session.save(() => {
        req.session.reload(() => {
          res.render("profile", { userDetails });
        });
      });
    });
  } else {
    res.redirect("/");
  }
};

const submitImageUpload = (req, res) => {
  const { title, img } = req.body;

  User.findById(res.locals.currentUser._id).then((userData) => {
    console.log(userData);
    if (res.locals.currentUser._id === userData.id) {
      console.log("Y ACA SE LLEGA????????????????");
      User.findByIdAndUpdate(userData.id, {
        $push: { images: { title, img } },
      }).then((userDetails) => {
        res.render("index", { userDetails });
      });
    }
  });
};

module.exports = {
  seeProfile,
  editProfileForm,
  submitUpdateProfile,
  submitImageUpload,
};
