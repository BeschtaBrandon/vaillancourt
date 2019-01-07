import { CALL_API } from '../middleware/api';

// Generic request/failure action types
export const API_REQUEST = 'API/REQUEST';
export const API_FAILURE = 'API/FAILURE';
export const GET_RESULTS = 'GET_RESULTS';

/**
 * Create the Call API dispatch
 *
 * @param requestAction
 * @param successAction
 * @param failureAction
 * @param apiParams
 * @returns {{}}
 */
export function createCallApi(requestAction, successAction, failureAction, apiParams) {
  return {
    [CALL_API]: {
      types: [requestAction, successAction, failureAction],
      ...apiParams,
    }
  };
}

/**
 * Call the API
 *
 * @param successAction
 * @param apiParams
 */
export function callApi(successAction, apiParams) {
  return {
    [CALL_API]: {
      types: [API_REQUEST, successAction, API_FAILURE],
      ...apiParams,
    },
    successAction // Keep the success action so we can check it on failure in a reducer
  };
}

//
//  Errors
//

export const SET_ERROR = 'SET_ERROR';

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  }
}

export const RESET_ERROR = 'RESET_ERROR';

export function resetError() {
  return {
    type: RESET_ERROR
  };
}

//
//  Cancel
//

export const CANCEL_ACTION = 'CANCEL_ACTION';

export function cancelAction() {
  return {
    type: CANCEL_ACTION
  }
}
