const initialState = {
  listOrder: [],
  errorMsg: "",
  seatOrder: [],
  transaction: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_ORDER": {
      return {
        ...state,
        listOrder: action.payload,
      };
    }
    case "GET_ORDER": {
      return {
        ...state,
        listGetOrder: action.payload,
      };
    }
    case "GET_SEAT": {
      return {
        ...state,
        seatOrder: action.payload,
      };
    }
    case "GET_ALL_TRANSACTION": {
      return {
        ...state,
        transaction: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default orderReducer;
