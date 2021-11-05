import { SET_ARTICLES } from "../../constants/action-types";
const initialState = {
  articles: [],
  loading: true,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default articleReducer;
