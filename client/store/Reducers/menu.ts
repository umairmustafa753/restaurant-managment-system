import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  menu: []
};

const menuList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_MENU: {
      return {
        ...state,
        menu: action.payload
      };
    }

    default:
      return state;
  }
};

export default menuList;
