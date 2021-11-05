import { SET_USER_DETAILS, SET_ARTICLES } from "../../constants/action-types";
export function setUserDetails(user) {
  return {
    type: SET_USER_DETAILS,
    payload: user,
  };
}
export function setArticles(user) {
  return {
    type: SET_ARTICLES,
    payload: user,
  };
}
