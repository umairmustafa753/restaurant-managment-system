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

  GetReservation: async (req, res) => {
    try {
      let reservations = await ReservationFromService.getById({
        userId: req.params.id,
        status: req.params.status
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
        status: req.params.status
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
