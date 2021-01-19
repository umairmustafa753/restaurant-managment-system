import Reservation from "../models/reservation";

const Users = {
  //   getById: async (id: object) => {
  //     const query = Reservation.findById(id).select(
  //       "_id firstName lastName username email role createdAt updatedAt"
  //     );
  //     try {
  //       return await query.exec();
  //     } catch (error) {
  //       console.log("error", error);
  //       throw error;
  //     }
  //   },

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
