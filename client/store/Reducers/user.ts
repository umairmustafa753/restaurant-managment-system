import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  obj: {},
  requsted: {},
  addUser: {},
  users: {},
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

    case ActionTypes.UPDATE_USER_REQUST: {
      return {
        ...state,
        requsted: action.requsted,
        loading: true
      };
    }

    case ActionTypes.UPDATE_USER: {
      return {
        ...state,
        requsted: action.requsted,
        loading: false
      };
    }

    case ActionTypes.ADD_USER_REQUST: {
      return {
        ...state,
        addUser: action.addUser,
        loading: true
      };
    }

    case ActionTypes.ADD_USER: {
      return {
        ...state,
        addUser: action.addUser,
        loading: false
      };
    }

    case ActionTypes.GET_CUSTOMERS_REQUST: {
      return {
        ...state,
        users: action.users,
        loading: true
      };
    }

    case ActionTypes.GET_CUSTOMERS: {
      return {
        ...state,
        users: action.users,
        loading: false
      };
    }

    default:
      return state;
  }
}

export default userReducer;
