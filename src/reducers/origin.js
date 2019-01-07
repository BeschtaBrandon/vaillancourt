import { fromJS } from 'immutable';
import * as ActionTypes from '../actions';




const initialState = {
  error: null,
  isLoaded: false,
  results: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_RESULTS:
      return {
        ...state,
        isLoaded: true,
        results: fromJS(action.response)
      }

    default:
      return state
  }
}

