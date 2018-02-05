import axios from 'axios';
import { setFlash } from './flash';

export const getChannels = (userId) => {
  return(dispatch) => {
    axios.get('/api/channels')
      .then( res => dispatch({ type: 'GET_CHANNELS', channels: res.data, headers: res.headers }))
      .catch( err => {
        dispatch({ type: 'SET_HEADERS', headers: err.headers });
        dispatch(setFlash('Failed to Retrieve Channels', 'red'));
      });
  }
}

export const clearChannels = () => {
  return ({ type: "CLEAR_CHANNELS", channels: [] })
}

export const addChannel = (channel) => {
  debugger
  return(dispatch) => {
    axios.post(`/api/channels`, channel )
      .then( res => {
          dispatch({ type: 'ADD_CHANNEL', channel: res.data, headers: res.headers })
      }).catch( err => {
          dispatch({ type: 'SET_HEADERS', headers: err.headers });
          dispatch(setFlash('Failed to Add Channel', 'red'));
      });
  }
}

export const deleteChannel = (channel) => {
  return(dispatch) => {
    axios.delete(`/api/channels/${channel.id}`)
      .then( res => {
        dispatch({ type: 'DELETE_CHANNEL', channel, headers: res.headers })
      }).catch( err => {
        dispatch({ type: 'SET_HEADERS', headers: err.headers });
        dispatch(setFlash('Failed to Delete Channel', 'red'));
      });
  }
}