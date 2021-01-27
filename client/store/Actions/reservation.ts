import ActionTypes from "./ActionTypes";
import config from "../../config";

const Reservation = {
  CreateReservation: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.ADD_RESERVATION_REQUST, payload: {} });
      let url = config.SERVER_ENDPOINT + "/api/reservation";
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`
        },
        body: JSON.stringify(obj)
      })
        .then((resposne) => {
          if (resposne.status === 200) {
            return resposne.json();
          }
          throw resposne;
        })
        .then((data) => {
          dispatch({ type: ActionTypes.ADD_RESERVATION, payload: data });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.ADD_RESERVATION, payload: obj });
            });
          }
        });
    };
  },

  GetAllReservations: (obj) => {
    return (dispatch) => {
      dispatch({ type: ActionTypes.GET_RESERVATIONS_REQUST, reservations: {} });
      const url =
        config.SERVER_ENDPOINT +
        "/api/reservations/" +
        obj.status +
        "/" +
        obj.date;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`
        }
      })
        .then((data) => {
          if (data.status === 200) {
            return data.json();
          }
          throw data;
        })
        .then((res) => {
          dispatch({
            type: ActionTypes.GET_RESERVATIONS,
            reservations: res
          });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({
                type: ActionTypes.GET_RESERVATIONS,
                reservations: obj
              });
            });
          }
        });
    };
  },

  UpdateReservation: function (obj) {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.UPDATE_RESERVATION_REQUST, updated: {} });
      let url = config.SERVER_ENDPOINT + "/api/updateReservation";
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`
        },
        body: JSON.stringify(obj)
      })
        .then((resposne) => {
          if (resposne.status === 200) {
            return resposne.json();
          }
          throw resposne;
        })
        .then((data) => {
          dispatch({ type: ActionTypes.UDPATE_RESERVATION, updated: data });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.UDPATE_RESERVATION, updated: obj });
            });
          }
        });
    };
  },

  resetUpdateReservation: () => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.RESET_RESERVATION, updated: {} });
    };
  }
};

export default Reservation;
