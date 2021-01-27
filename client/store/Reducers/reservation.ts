import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  reservation: {},
  reservations: [],
  updated: [],
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

    case ActionTypes.GET_RESERVATIONS_REQUST: {
      return {
        ...state,
        reservations: action.reservations,
        loading: true
      };
    }

    case ActionTypes.GET_RESERVATIONS: {
      return {
        ...state,
        reservations: action.reservations,
        loading: false
      };
    }

    case ActionTypes.UPDATE_RESERVATION_REQUST: {
      return {
        ...state,
        updated: action.updated,
        loading: true
      };
    }

    case ActionTypes.UDPATE_RESERVATION: {
      return {
        ...state,
        updated: action.updated,
        loading: false
      };
    }

    default:
      return state;
  }
};

export default reservation;
