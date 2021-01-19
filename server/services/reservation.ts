import Reservation from "../models/reservation";

const Users = {
  getById: async (obj: object) => {
    const query = Reservation.find(obj).select(
      "_id firstName lastName email status date time menuItems fiftyPerAmount"
    );
    try {
      return await query.exec();
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },

  getReservations: async (obj) => {
    try {
      let query;
      query = Reservation.find(obj).select(
        "_id firstName lastName email status date time menuItems fiftyPerAmount"
      );
      return await query.exec();
    } catch (error) {
      throw error;
    }
  }
};

export default Users;
