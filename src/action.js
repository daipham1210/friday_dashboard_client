import { ON_FETCH_DATA } from './actionType';

export const onFetchData = data => {
  return {
    type: ON_FETCH_DATA,
    payload: data
  }
}