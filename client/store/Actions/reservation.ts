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
  }
};

export default Reservation;
