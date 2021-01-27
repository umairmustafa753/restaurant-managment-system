import * as mongoose from "mongoose";

import { CardInfo, ReservationEnum } from "./constant";

const Reservation = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    menuItems: { type: Array, required: true },
    fiftyPerAmount: { type: Number, required: true },
    CardInfo: CardInfo,
    status: ReservationEnum,
    picture: { type: String, required: false },
    userId: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", Reservation);
