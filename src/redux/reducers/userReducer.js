import { SET_USER_DETAILS } from "../../constants/action-types";

const initialState = {
  userInfo: {},
  loading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
