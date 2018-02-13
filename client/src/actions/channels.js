import axios from 'axios';
import { APIKey } from '../components/APIKey';
import { getVideo } from './video';
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

export const getStats = (id, channelId) => {
  return(dispatch) => {
    axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${APIKey}&fields=items/statistics(viewCount,subscriberCount)`)
      .then( res => dispatch({ type: 'GET_STATS', id, stats: res.data.items[0].statistics, headers: res.headers }))
      .catch( err => {
        dispatch({ type: 'SET_HEADERS', headers: err.headers });
        dispatch(setFlash('Failed to Retrieve Channel Stats', 'red'));
      });
  }
}

export const clearChannels = () => {
  return ({ type: "CLEAR_CHANNELS", channels: [] })
}

export const addChannel = (channel) => {
  return(dispatch) => {
    axios.post(`/api/channels`, channel )
      .then( res => {
          dispatch(getVideo(res.data.id, res.data.yt_channel_id))
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