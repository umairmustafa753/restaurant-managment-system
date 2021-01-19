import * as mongoose from "mongoose";

import { FoodItem } from "./constant";

const featuredItems = new mongoose.Schema({
  newArrival: FoodItem,
  specialities: FoodItem,
  topDeals: FoodItem
});

export default mongoose.model("featuredItems", featuredItems);
