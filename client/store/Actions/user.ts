import AsyncStorage from "@react-native-async-storage/async-storage";

import ActionTypes from "./ActionTypes";
import config from "../../config";

const UserAction = {
  Signup: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.USER_REQUST, payload: {} });
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
          dispatch({ type: ActionTypes.USER, payload: data });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.USER, payload: obj });
            });
          }
        });
    };
  },

  Login: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.USER_REQUST, payload: {} });
      const url = config.REACT_NATIVE_APP_ENDPOINT + "/auth/signin";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          if (data.data.token) {
            try {
              const value = {
                token: data.data.token,
                _id: data.data.user._id
              };
              const key = "user";
              AsyncStorage.setItem(key, JSON.stringify(value), (err) => {
                if (err) {
                  throw err;
                }
              }).catch((err) => {
                console.log("error is: " + err);
              });
            } catch (e) {
              console.log(e);
            }
            dispatch({ type: ActionTypes.USER, payload: data });
            return data.data;
          }
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.USER, payload: obj });
            });
          }
        });
    };
  },

  AutoLogin: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.USER_REQUST, payload: {} });
      const url = config.REACT_NATIVE_APP_ENDPOINT + "/auth/signin/" + obj._id;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`
        }
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          if (data.data.token) {
            dispatch({ type: ActionTypes.USER, payload: data });
            return data.data;
          }
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.USER, payload: obj });
            });
          }
        });
    };
  },

  EmailVerification: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.USER_REQUST, payload: {} });
      let url = config.REACT_NATIVE_APP_ENDPOINT + "/api/emailVerification";
      return fetch(url, {
        method: "PUT",
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
          dispatch({ type: ActionTypes.USER, payload: data });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.USER, payload: obj });
            });
          }
        });
    };
  },

  OTPVerification: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.USER_REQUST, payload: {} });
      let url = config.REACT_NATIVE_APP_ENDPOINT + "/api/otpVerification";
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
          dispatch({ type: ActionTypes.USER, payload: data });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.USER, payload: obj });
            });
          }
        });
    };
  },

  ResetPassword: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.USER_REQUST, payload: {} });
      let url = config.REACT_NATIVE_APP_ENDPOINT + "/api/resetPassword";
      return fetch(url, {
        method: "PUT",
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
          dispatch({ type: ActionTypes.USER, payload: data });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.USER, payload: obj });
            });
          }
        });
    };
  }
};

export default UserAction;
