import * as mongoose from "mongoose";

import { FoodItem } from "./constant";

const featureItems = new mongoose.Schema({
  newArrival: FoodItem,
  specialities: FoodItem,
  topDeals: FoodItem,
  birthdaySpecial: FoodItem
});

export default mongoose.model("FeatureItems", featureItems);
