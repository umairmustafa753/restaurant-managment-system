import * as express from "express";
import { check } from "express-validator";

import expressPostValidator from "../validator/index";
import featureItems from "../controller/featureItem";
import MenuList from "../controller/menuList";
import Auth from "../controller/user";
import Authorization from "../middleware/Authorization";
import { MODAL_KEYS, MESSAGE } from "./constants";

const api = express.Router();

// featured Items api

api.get("/featuredItem", featureItems.GetFeaturedItems);
api.post(
  "/featuredItem",
  check(MODAL_KEYS.NEW_ARRIVAL).notEmpty().withMessage(MESSAGE.NEW_ARRIVAL),
  check(MODAL_KEYS.SPECIALITIES).notEmpty().withMessage(MESSAGE.SPECIALITIES),
  check(MODAL_KEYS.TOP_DEALS).notEmpty().withMessage(MESSAGE.TOP_DEALS),
  check(MODAL_KEYS.BIRTHDAY_SPECIAL)
    .notEmpty()
    .withMessage(MESSAGE.BIRTHDAY_SPECIAL),
  expressPostValidator,
  featureItems.AddFeaturedItems
);

// MenuItem List api

api.get("/menuList", MenuList.GetMenuList);
api.post(
  "/menuList",
  check(MODAL_KEYS.CATEGORY_NAME).notEmpty().withMessage(MESSAGE.CATEGORY_NAME),
  check(MODAL_KEYS.SUB_CATEGORY).isArray().withMessage(MESSAGE.SUB_CATEGORY),
  expressPostValidator,
  MenuList.AddMenuList
);

// Update user api

api.post(
  "/updateUser",
  check(MODAL_KEYS.FIRST_NAME).notEmpty().withMessage(MESSAGE.FIRST_NAME),
  check(MODAL_KEYS.LAST_NAME).notEmpty().withMessage(MESSAGE.LAST_NAME),
  check(MODAL_KEYS.EMAIL).isEmail().withMessage(MESSAGE.EMAIL),
  check(MODAL_KEYS.DOB).notEmpty().withMessage(MESSAGE.DOB),
  check(MODAL_KEYS.PASSWORD).notEmpty().withMessage(MESSAGE.PASSWORD),
  check(MODAL_KEYS.PASSWORD)
    .isLength({ min: 8 })
    .withMessage(MESSAGE.PASSWORD_LENGTH),
  expressPostValidator,
  Authorization,
  Auth.UpdateUser
);

export default api;
