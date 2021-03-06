import AsyncStorage from "@react-native-async-storage/async-storage";

import { cloudinaryUpload } from "../../utils";
import ActionTypes from "./ActionTypes";
import config from "../../config";

const UserAction = {
  Signup: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.USER_REQUST, payload: {} });
      let url = config.SERVER_ENDPOINT + "/auth/signup";
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
      const url = config.SERVER_ENDPOINT + "/auth/signin";
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
      const url = config.SERVER_ENDPOINT + "/auth/signin/" + obj._id;
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
      let url = config.SERVER_ENDPOINT + "/api/emailVerification";
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
      let url = config.SERVER_ENDPOINT + "/api/otpVerification";
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
      let url = config.SERVER_ENDPOINT + "/api/resetPassword";
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

  UpdateUser: function (obj) {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.UPDATE_USER_REQUST, requsted: {} });
      let url = config.SERVER_ENDPOINT + "/api/updateUser";
      if (obj.base64Image) {
        const res = await cloudinaryUpload(obj.base64Image);
        obj.picture = res;
      }
      obj.base64Image = null;
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
          dispatch({ type: ActionTypes.UPDATE_USER, requsted: data });
          dispatch({ type: ActionTypes.USER, payload: data });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.UPDATE_USER, requsted: obj });
            });
          }
        });
    };
  },

  UpdateEmployee: function (obj) {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.UPDATE_USER_REQUST, requsted: {} });
      let url = config.SERVER_ENDPOINT + "/api/updateUser";
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
          dispatch({ type: ActionTypes.UPDATE_USER, requsted: data });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.UPDATE_USER, requsted: obj });
            });
          }
        });
    };
  },

  resetUpdateEmployee: function () {
    return (dispatch) => {
      dispatch({ type: ActionTypes.UPDATE_USER, requsted: {} });
    };
  },

  GetUser: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.UPDATE_USER_REQUST, requsted: {} });
      const url = config.SERVER_ENDPOINT + "/api/user/" + obj._id;
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
              dispatch({ type: ActionTypes.UPDATE_USER, requsted: obj });
            });
          }
        });
    };
  },

  AddUser: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.ADD_USER_REQUST, addUser: {} });
      let url = config.SERVER_ENDPOINT + "/auth/signup";
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
          dispatch({ type: ActionTypes.ADD_USER, addUser: data });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.ADD_USER, addUser: obj });
            });
          }
        });
    };
  },

  GetUsers: function (obj) {
    return (dispatch) => {
      dispatch({ type: ActionTypes.GET_USERS_REQUST, users: {} });
      const url = config.SERVER_ENDPOINT + "/api/users/" + obj.role;
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
            type: ActionTypes.GET_USERS,
            users: res
          });
        })
        .catch((error) => {
          if (typeof error.text === "function") {
            error.text().then((errorMessage) => {
              const obj = JSON.parse(errorMessage);
              dispatch({ type: ActionTypes.GET_USERS, users: obj });
            });
          }
        });
    };
  }
};

export default UserAction;
