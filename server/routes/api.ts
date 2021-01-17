import * as express from "express";
import { check } from "express-validator";

import expressPostValidator from "../validator/index";
import featureItems from "../controller/featureItem";

const api = express.Router();

// featured Items api
api.get("/featuredItem", featureItems.getFeaturedItems);
api.post(
  "/featuredItem",
  check("newArrival").notEmpty().withMessage("title is required"),
  check("specialities").notEmpty().withMessage("Specialities is required"),
  check("topDeals").notEmpty().withMessage("Top deals is required"),
  check("birthdaySpecial")
    .notEmpty()
    .withMessage("Birthday special is required"),
  expressPostValidator,
  featureItems.AddFeaturedItems
);

export default api;
