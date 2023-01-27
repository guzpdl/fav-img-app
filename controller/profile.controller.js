const User = require("../models/User.model");

const seeProfile = (req, res) => {
  const userDBid = req.params;
  if (res.locals.currentUser._id === userDBid.id) {
    return User.findById(res.locals.currentUser._id).then((userDetails) => {
      console.log(userDetails);
      return res.render("profile", { userDetails });
    });
  } else {
    return res.redirect("/");
  }
};

const seeImages = (req, res) => {
  const userDBid = req.params;
  if (res.locals.currentUser._id === userDBid.id) {
    return User.findById(res.locals.currentUser._id).then((userDetails) => {
      return res.render("images", { userDetails });
    });
  } else {
    return res.redirect("/");
  }
};

const editImageForm = async (req, res) => {
  const { id: pictureId } = req.params;
  return await User.findOne({
    images: { $elemMatch: { _id: pictureId } },
  }).then((userInfo) => {
    return res.render("editImage", { userInfo, pictureId });
  });
};

const submitEditImage = async (req, res) => {
  const imgId = req.params.id;
  const { title, img } = req.body;
  const userId = req.session.currentUser._id;

  return await User.updateOne(
    { "images._id": imgId },
    {
      $set: {
        "images.$[xxx].title": title,
        "images.$[xxx].img": img,
      },
    },
    { arrayFilters: [{ "xxx._id": imgId }] }
  ).then((updatedUser) => {
    return res.redirect(`/profile/images/${userId}`);
  });
};

const deleteImage = async (req, res) => {
  let thisImgId = req.params.id;

  return await User.findByIdAndUpdate(res.locals.currentUser._id, {
    $pull: { images: { _id: thisImgId } },
  }).then((userDetails) => {
    return res.redirect(`/profile/images/${res.locals.currentUser._id}`);
  });

  // if(res.locals.currentUser._id === )
};

const editProfileForm = (req, res) => {
  const userDBid = req.params;
  if (res.locals.currentUser._id === userDBid.id) {
    return User.findById(res.locals.currentUser._id).then((userDetails) => {
      return res.render("editProfile", { userDetails });
    });
  } else {
    return res.redirect("/");
  }
};

const submitUpdateProfile = (req, res) => {
  let { username, email } = req.body;
  const userDBid = req.params;

  if (res.locals.currentUser._id === userDBid.id) {
    return User.findByIdAndUpdate(res.locals.currentUser._id, {
      username,
      email,
    }).then((userDetails) => {
      req.session.currentUser.username = userDetails.username;
      req.session.currentUser.email = userDetails.email;
      res.locals.currentUser = req.session.currentUser;
      return req.session.save(() => {
        return req.session.reload(() => {
          return res.render(`profile`, { userDetails });
        });
      });
    });
  } else {
    return res.redirect("/");
  }
};

const submitImageUpload = async (req, res) => {
  const { title, img } = req.body;

  return await User.findById(res.locals.currentUser._id).then((userData) => {
    if (res.locals.currentUser._id === userData.id) {
      return User.findByIdAndUpdate(userData.id, {
        $push: { images: { title, img } },
      }).then((userDetails) => {
        req.session.currentUser.images = userDetails.images;
        res.locals.currentUser = req.session.currentUser;
        return req.session.save(() => {
          return req.session.reload(() => {
            return res.redirect(`/profile/images/${userData.id}`);
          });
        });
      });
    } else {
      return res.redirect("/");
    }
  });
};

module.exports = {
  seeProfile,
  editProfileForm,
  submitUpdateProfile,
  submitImageUpload,
  seeImages,
  deleteImage,
  editImageForm,
  submitEditImage,
};
