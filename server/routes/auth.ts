import * as express from "express";

import { check } from "express-validator";
import expressPostValidator from "../validator/index";
import Auth from "../controller/user";
import Authorization from "../middleware/Authorization";

const api = express.Router();

api.post(
  "/signup",
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Enter a valid email"),
  check("dob").notEmpty().withMessage("dob is required"),
  check("password").notEmpty().withMessage("password is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be of 8 character or more"),
  expressPostValidator,
  Auth.Signup
);

api.post(
  "/signin",
  check("email").notEmpty().withMessage("Write a email"),
  check("password").notEmpty().withMessage("Write a password"),
  expressPostValidator,
  Auth.Login
);

api.get("/signin/:id", Authorization, Auth.autoLogin);

export default api;
