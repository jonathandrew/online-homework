const express = require("express");
const router = express.Router();
const userController = require("./models/controllers/userController");
const userValidation = require("./utils/userValidation");
const passport = require("passport");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});
router.get("/register", (req, res) => {
  res.render("auth/register", { errors: req.flash("errors") });
});

router.post("/register", userValidation, userController.register);

router.get("/login", (req, res) => {
  return res.render("auth/login", { errors: req.flash("errors") });
});
router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/api/users/login",
    failureFlash: true
  })
);

router.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("auth/profile");
  } else {
    return res.send("no");
  }
});
module.exports = router;
