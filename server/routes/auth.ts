import * as express from "express";

import { check } from "express-validator";
import expressPostValidator from "../validator/index";
import Auth from "../controller/user";
import Authorization from "../middleware/Authorization";
import { MODAL_KEYS, MESSAGE } from "./constants";

const api = express.Router();

api.post(
  "/signup",
  check(MODAL_KEYS.FIRST_NAME).notEmpty().withMessage(MESSAGE.FIRST_NAME),
  check(MODAL_KEYS.LAST_NAME).notEmpty().withMessage(MESSAGE.LAST_NAME),
  check(MODAL_KEYS.EMAIL).isEmail().withMessage(MESSAGE.EMAIL),
  check(MODAL_KEYS.DOB).notEmpty().withMessage(MESSAGE.DOB),
  check(MODAL_KEYS.PASSWORD).notEmpty().withMessage(MESSAGE.PASSWORD),
  check(MODAL_KEYS.PASSWORD)
    .isLength({ min: 8 })
    .withMessage(MESSAGE.PASSWORD_LENGTH),
  expressPostValidator,
  Auth.Signup
);

api.post(
  "/signin",
  check(MODAL_KEYS.EMAIL).isEmail().withMessage(MESSAGE.EMAIL),
  check(MODAL_KEYS.PASSWORD).notEmpty().withMessage(MESSAGE.PASSWORD),
  expressPostValidator,
  Auth.Login
);

api.get("/signin/:id", Authorization, Auth.AutoLogin);

export default api;
