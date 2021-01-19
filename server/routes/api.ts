import * as express from "express";
import { check } from "express-validator";

import expressPostValidator from "../validator/index";
import featureItems from "../controller/featureItem";
import MenuList from "../controller/menuList";
import Reservation from "../controller/reservation";
import User from "../controller/user";
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
  expressPostValidator,
  featureItems.AddFeaturedItems
);

// MenuItem List api

api.get("/menuList", MenuList.GetMenuList);
api.post(
  "/menuList",
  check(MODAL_KEYS.MENU).notEmpty().withMessage(MESSAGE.MENU),
  expressPostValidator,
  MenuList.AddMenuList
);

// Update user api

api.put(
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
  User.UpdateUser
);

// forget Password

api.put(
  "/emailVerification",
  check(MODAL_KEYS.EMAIL).isEmail().withMessage(MESSAGE.EMAIL),
  expressPostValidator,
  Authorization,
  User.EmailVerification
);
api.post(
  "/otpVerification",
  check(MODAL_KEYS.EMAIL).isEmail().withMessage(MESSAGE.EMAIL),
  check(MODAL_KEYS.OTP).notEmpty().withMessage(MESSAGE.OTP),
  expressPostValidator,
  Authorization,
  User.otpVerification
);

api.put(
  "/resetPassword",
  check(MODAL_KEYS.EMAIL).isEmail().withMessage(MESSAGE.EMAIL),
  check(MODAL_KEYS.PASSWORD).notEmpty().withMessage(MESSAGE.PASSWORD),
  check(MODAL_KEYS.PASSWORD)
    .isLength({ min: 8 })
    .withMessage(MESSAGE.PASSWORD_LENGTH),
  expressPostValidator,
  Authorization,
  User.ResestPassword
);

// get Users

api.get("/users/:role", Authorization, User.GetUsers);

export default api;

// Reservation
api.get("/reservation/:id/:status", Authorization, Reservation.GetReservation);
api.get("/reservations/:status", Authorization, Reservation.GetReservations);
api.post(
  "/reservation",
  check(MODAL_KEYS.FIRST_NAME).notEmpty().withMessage(MESSAGE.FIRST_NAME),
  check(MODAL_KEYS.LAST_NAME).notEmpty().withMessage(MESSAGE.LAST_NAME),
  check(MODAL_KEYS.EMAIL).isEmail().withMessage(MESSAGE.EMAIL),
  check(MODAL_KEYS.DATE).notEmpty().withMessage(MESSAGE.DATE),
  check(MODAL_KEYS.TIME).notEmpty().withMessage(MESSAGE.TIME),
  check(MODAL_KEYS.MENU_ITEMS).isArray().withMessage(MESSAGE.MENU_ITEMS),
  check(MODAL_KEYS.FIFTY_PER_AMOUNT)
    .notEmpty()
    .withMessage(MESSAGE.FIFTY_PER_AMOUNT),
  check(MODAL_KEYS.CARD_INFO).notEmpty().withMessage(MESSAGE.CARD_INFO),
  check(MODAL_KEYS.USER_ID).notEmpty().withMessage(MESSAGE.USER_ID),
  expressPostValidator,
  Authorization,
  Reservation.AddReservation
);
api.put(
  "/updateReservation",
  check(MODAL_KEYS.STATUS).notEmpty().withMessage(MESSAGE.STATUS),
  expressPostValidator,
  Authorization,
  Reservation.UpdateReservation
);
