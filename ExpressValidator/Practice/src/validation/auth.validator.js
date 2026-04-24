import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({
    errors: errors.array(),
  });
};

export const registerValidation = [
  body("username").isString().withMessage("Username should be string!!"),
  body("email").isEmail().withMessage("Email should be valid email address!!"),
  body("password")
    .isLength({ min: 6, max: 10 })
    .withMessage("Password should be minimum 6 and max 10 characters long!!!"),
  validate,
];
