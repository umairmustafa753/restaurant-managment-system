import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  featuredItems: []
};

const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_FEATURED_ITEMS: {
      return {
        ...state,
        featuredItems: action.payload
      };
    }

    default:
      return state;
  }
};

export default users;
