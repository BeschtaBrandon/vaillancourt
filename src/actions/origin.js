import { createCallApi } from '../shared/actions/util';

export const API_REQUEST = 'API_REQUEST';
export const API_FAILURE = 'API_FAILURE';

/**
 * Call the API
 *
 * @param successAction
 * @param apiParams
 */
const callApi = (successAction, apiParams) =>
  createCallApi(API_REQUEST, successAction, API_FAILURE, apiParams);

export const GET_RESULTS = 'GET_RESULTS';

export function getResults() {
  return async (dispatch, getState) => {
    dispatch(callApi(GET_RESULTS, {
      endpoint: `https://api.openaq.org/v1/countries?limit=10`,
    }));
  };
}
