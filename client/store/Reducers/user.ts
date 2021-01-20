import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  obj: {},
  loading: false
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SIGNUP_USER_REQUST: {
      return {
        ...state,
        obj: action.payload,
        loading: true
      };
    }
    case ActionTypes.SIGNUP_USER: {
      return {
        ...state,
        obj: action.payload,
        loading: false
      };
    }
    case ActionTypes.LOGIN_USER_REQUST: {
      return {
        ...state,
        obj: action.payload,
        loading: true
      };
    }
    case ActionTypes.LOGIN_USER: {
      return {
        ...state,
        obj: action.payload,
        loading: false
      };
    }
    case ActionTypes.EMAIL_VERIFICATOIN_REQUST: {
      return {
        ...state,
        obj: action.payload,
        loading: true
      };
    }
    case ActionTypes.EMAIL_VERIFICATOIN: {
      return {
        ...state,
        obj: action.payload,
        loading: false
      };
    }

    case ActionTypes.OTP_VERIFICATOIN_REQUST: {
      return {
        ...state,
        obj: action.payload,
        loading: true
      };
    }
    case ActionTypes.OTP_VERIFICATOIN: {
      return {
        ...state,
        obj: action.payload,
        loading: false
      };
    }

    default:
      return state;
  }
}

export default userReducer;
