import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  obj: {}
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SIGNUP_USER: {
      return {
        ...state,
        obj: action.payload
      };
    }

    default:
      return state;
  }
}

export default userReducer;
