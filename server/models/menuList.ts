import * as mongoose from "mongoose";

import { MenuSubItem } from "./constant";

const MenuList = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  subCategory: MenuSubItem
});

export default mongoose.model("MenuList", MenuList);
