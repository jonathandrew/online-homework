const { check } = require("express-validator");
const userValidation = [
  check("name", "name is required").isEmpty(),
  check("email", "please use a valid email").isEmpty(),
  check("password", "password must be atleast 3 characters").isLength({
    min: 3
  })
];

module.exports = userValidation;
