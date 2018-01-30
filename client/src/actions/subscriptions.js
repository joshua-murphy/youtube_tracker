import axios from 'axios';
import { setFlash } from './flash';

export const getSubs = (userId) => {
  return(dispatch) => {
    axios.get('/api/subscriptions')
      .then( res => dispatch({ type: 'GET_SUBS', subs: res.data, headers: res.headers }))
      .catch( err => {
        dispatch({ type: 'SET_HEADERS', headers: err.headers });
        dispatch(setFlash('Failed to Retrieve Subscriptions', 'red'));
    });
  }
}

export const clearSubs = () => {
  return ({ type: "CLEAR_SUBS", subs: [] })
}

export const addSub = (sub) => {
  return(dispatch) => {
    axios.post(`/api/subscriptions`, sub )
      .then( res => {
          dispatch({ type: 'ADD_SUB', sub: res.data, headers: res.headers })
      }).catch( err => {
          dispatch({ type: 'SET_HEADERS', headers: err.headers });
          dispatch(setFlash('Failed to Add Subscription', 'red'));
    });
  }
}

export const deleteSub = (sub) => {
  return(dispatch) => {
    axios.delete(`/api/subscriptions/${sub.id}`)
      .then( res => {
        dispatch({ type: 'DELETE_SUB', sub, headers: res.headers })
      }).catch( err => {
        dispatch({ type: 'SET_HEADERS', headers: err.headers });
        dispatch(setFlash('Failed to Delete Subscription', 'red'));
    });
  }
}