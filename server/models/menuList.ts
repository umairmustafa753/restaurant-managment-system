import * as mongoose from "mongoose";

import { MenuItems } from "./constant";

const MenuList = new mongoose.Schema({
  menu: MenuItems
});

export default mongoose.model("MenuList", MenuList);
