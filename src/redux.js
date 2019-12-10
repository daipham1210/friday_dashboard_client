import { ON_FETCH_DATA } from './actionType';

const INITIAL_STATE = {
  data: {},
  isLoaded: false
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ON_FETCH_DATA:
      return {...state, data: action.payload, isLoaded: true }
    default:
      return state
  }
}