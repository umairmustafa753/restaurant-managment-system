import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  obj: {},
  loading: false
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.USER_REQUST: {
      return {
        ...state,
        obj: action.payload,
        loading: true
      };
    }

    case ActionTypes.USER: {
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
