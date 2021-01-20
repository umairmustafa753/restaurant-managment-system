import AsyncStorage from "@react-native-async-storage/async-storage";

import ActionTypes from "./ActionTypes";
import config from "../../config";

const UserAction = {
  Signup: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.SIGNUP_USER_REQUST, payload: {} });
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
  },
  Login: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.LOGIN_USER_REQUST, payload: {} });
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
            async () => {
              try {
                const value = {
                  token: data.data.token,
                  _id: data.data.user._id
                };
                const key = "user";
                await AsyncStorage.setItem(key, JSON.stringify(value));
              } catch (e) {
                console.log(e);
              }
            };
            dispatch({ type: ActionTypes.LOGIN_USER, payload: data });
            return data.data;
          }
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.LOGIN_USER, payload: obj });
            });
          }
        });
    };
  },
  EmailVerification: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.EMAIL_VERIFICATOIN_REQUST, payload: {} });
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
