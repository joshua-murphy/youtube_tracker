import axios from 'axios';
import { setFlash } from '../actions/flash';

export const changeTheme = (userId) => {
  return(dispatch) => {
    axios.get(`/api/user/${userId}` )
      .then( res => dispatch({ type: 'CHANGE_THEME', theme: res.data.theme, headers: res.headers }) )
      .catch( err => {
        dispatch({ type: 'SET_HEADERS', headers: err.headers });
        dispatch(setFlash('Failed to Update Theme', 'red'));
      });
  }
}