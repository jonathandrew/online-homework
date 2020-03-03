const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const faker = require("faker");

module.exports = {
  register: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return req.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.send("User already exists");
      } else {
        const newUser = new User();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        newUser.profile.name = req.body.name;
        newUser.profile.picture = faker.image.avatar();
        newUser.email = req.body.email;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            req.login(user, err => {
              if (err) {
                return res
                  .status(400)
                  .json({ confirmation: false, message: err });
              } else {
                res.redirect("/");
                next();
              }
            });
          })
          .catch(err => {
            return next(err);
          });
      }
    });
  }
};
