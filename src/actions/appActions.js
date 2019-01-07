import { createAction } from "redux-actions";

export const appActionTypes = {
  isLoading: "SET_IS_LOADING",
  errorMessage: "SET_ERROR_MESSAGE",
  setRouter: "SET_ROUTER"
};

export default {
  isLoading: createAction(appActionTypes.isLoading),
  errorMessage: createAction(appActionTypes.errorMessage),
  setRouter: createAction(appActionTypes.setRouter)
};
