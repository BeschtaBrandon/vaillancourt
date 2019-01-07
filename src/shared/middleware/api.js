import fetch from 'isomorphic-fetch';

/**
 * Call the api with the given endpoint, Promise returned with the response json
 *
 * @param endpoint
 * @param method
 * @param body
 * @param apiRoot
 */
const callApi = async (endpoint, method = 'get', body = null, apiRoot) => {
  const options = {
    credentials: 'same-origin',
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': window.currentCsrfToken(),
    },
  };

  if (body) options.body = JSON.stringify(body);

  const response = await fetch(apiRoot + endpoint, options);
  return await response.json().then(json => response.ok ? json : Promise.reject(json));
};

/**
 * CALL_API action symbol
 *
 * @type {Symbol}
 */
export const CALL_API = Symbol('Call API');

/**
 * Create the API
 *
 * @param apiRoot
 */
export default function createApi(apiRoot) {
  return store => next => async action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
      return next(action);
    }

    let { endpoint } = callAPI;
    const { method, body, types, actionData } = callAPI;

    if (typeof endpoint === 'function') {
      endpoint = endpoint(store.getState());
    }

    function actionWith(data) {
      const finalAction = {
        ...action,
        ...data
      };
      delete finalAction[CALL_API];
      return finalAction;
    }

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    try {
      const response = await callApi(endpoint, method, body, apiRoot);

      // Handle special "redirect" key
      if (response.redirect) {
        window.location = response.redirect;
        return;
      }

      return next(actionWith({
        response,
        type: successType,
        ...actionData,
      }));
    }
    catch (error) {
      if (error.status == 401) {
        window.location = error.redirect;
        return;
      } else  {
        return next(actionWith({
          type: failureType,
          error: error || { message: 'Error in API' },
          ...actionData,
        }));
      }
    }
  };
}
