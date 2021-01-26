import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  reservation: {},
  loading: false
};

const reservation = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_RESERVATION_REQUST: {
      return {
        ...state,
        reservation: action.payload,
        loading: true
      };
    }

    case ActionTypes.ADD_RESERVATION: {
      return {
        ...state,
        reservation: action.payload,
        loading: false
      };
    }

    default:
      return state;
  }
};

export default reservation;
