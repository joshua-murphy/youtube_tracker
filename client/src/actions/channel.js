import { APIKey } from '../components/APIKey';
import axios from 'axios';
import { setFlash } from './flash';

const findVideo = (id, channelId, videos, pageToken, dispatch) => {
  let n = 0
  while (n < 5) {
    let video = videos[n]
    if( video.contentDetails ) {
      return setVideo(id, video.contentDetails.upload.videoId, dispatch)
    } else {
      if( n === videos.length - 1 )
        dispatch(getVideo(id, channelId, pageToken))
      n++
    }
  }
}

const setVideo = (id, videoId, dispatch) => {
  axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${APIKey}&fields=items(snippet(publishedAt,title,thumbnails/medium/url),statistics)`)
    .then( res => { 
      const params = res.data.items[0]
      const video = {
        id: videoId,
        time: params.snippet.publishedAt,
        title: params.snippet.title,
        thumbnail: params.snippet.thumbnails.medium.url,
        stats: params.statistics
      }
      dispatch({ type: 'GET_VIDEO', id, video, headers: res.headers })
    })
    .catch( err => {
      dispatch({ type: 'SET_HEADERS', headers: err.headers });
      dispatch(setFlash('Failed to Retrieve Video Stats', 'red'));
    });
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

export const getVideo = (id, channelId, pageToken = null) => {
  const key = APIKey
  const pageString = pageToken ? `&pageToken=${pageToken}` : "" 
  return(dispatch) => {
    axios.get(`https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${channelId}&key=${key}${pageString}&fields=items(contentDetails/upload/videoId,snippet/title),nextPageToken`)
      .then( res => findVideo(id, channelId, res.data.items, res.data.nextPageToken, dispatch) )
      .catch( err => {
        dispatch({ type: 'SET_HEADERS', headers: err.headers });
      });
  }
}