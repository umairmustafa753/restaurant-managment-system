import Reservation from "../models/reservation";
import ReservationFromService from "../services/reservation";

const ReservationController = {
  AddReservation: (req, res) => {
    try {
      const reservationDB = new Reservation(req.body);
      reservationDB.save().then((result) => {
        res.status(200).json({
          Reservation: result,
          message: "Reservation requested Succesfully"
        });
      });
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, Please try again" });
    }
  },

  UpdateReservation: async (req, res) => {
    try {
      let note = await ReservationFromService.getUserReservation({
        _id: req.body._id
      });
      if (!note) {
        return res
          .status(404)
          .send({ data: {}, message: "Reservation Not found" });
      }
      const query = { _id: req.body._id };
      const options = { new: true, runValidators: true };
      const update = {
        status: req.body.status,
        updatedAt: Date.now()
      };
      const item = await Reservation.findOneAndUpdate(query, update, options);
      if (item) {
        return res
          .status(200)
          .send({ data: item, message: "User updated Successfully" });
      }
      return res
        .status(409)
        .send({ data: {}, message: "Something went wrong, Please try again" });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  },

  GetReservation: async (req, res) => {
    try {
      let reservations = await ReservationFromService.getUserReservation({
        userId: req.params.id,
        status: req.params.status,
        date: req.params.date
      });
      if (reservations.length) {
        return res.status(200).send({
          data: reservations,
          message: `${req.params.status} reservations are found`
        });
      } else {
        return res.status(404).send({
          data: reservations,
          message: `${req.params.status} reservations are not found`
        });
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  },

  GetReservations: async (req, res) => {
    try {
      let reservations = await ReservationFromService.getReservations({
        status: req.params.status,
        date: req.params.date
      });
      if (reservations.length) {
        return res.status(200).send({
          data: reservations,
          message: `${req.params.status} reservations are found`
        });
      } else {
        return res.status(404).send({
          data: reservations,
          message: `${req.params.status} reservations are not found`
        });
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  }
};

export default ReservationController;
