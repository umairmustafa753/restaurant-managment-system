import ActionTypes from "./ActionTypes";
import config from "../../config";

const UserAction = {
  Signup: function (obj) {
    return (dispatch) => {
      let url = config.REACT_NATIVE_APP_ENDPOINT + "/auth/signup";
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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
          dispatch({ type: ActionTypes.SIGNUP_USER, payload: data });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.SIGNUP_USER, payload: obj });
            });
          }
        });
    };
  }
};

export default UserAction;
