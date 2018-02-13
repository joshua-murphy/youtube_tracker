import axios from 'axios';
import { APIKey } from '../components/APIKey';
import { setFlash } from './flash';

const findVideo = (id, channelId, videos, pageToken, dispatch) => {
  let n = 0
  while (n < 5) {
    let video = videos[n]
    if( video.contentDetails ) {
      return setVideo(id, video.contentDetails.upload.videoId, channelId, dispatch)
    } else {
      if( n === videos.length - 1 )
        dispatch(getVideo(id, channelId, pageToken))
      n++
    }
  }
}

const setVideo = (id, videoId, channelId, dispatch) => {
  axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${APIKey}&fields=items(snippet(publishedAt,title,thumbnails/medium/url),statistics)`)
    .then( res => {
      const params = res.data.items[0]
      let video = {
        yt_video_id: videoId,
        published: params.snippet.publishedAt,
        title: params.snippet.title,
        thumbnail_url: params.snippet.thumbnails.medium.url,
        views: params.statistics.viewCount,
        likes: params.statistics.likeCount,
        dislikes: params.statistics.dislikeCount,
        channel_id: id
      }
      dispatch(addVideo(video))
    })
    .catch( err => {
      dispatch({ type: 'SET_HEADERS', headers: err.headers });
      dispatch(setFlash('Failed to Retrieve Video Stats', 'red'));
    });
}

const addVideo = (video) => {
  return(dispatch) => {
    axios.post(`/api/videos`, video )
      .then( res => dispatch({ type: 'GET_VIDEO', video, id: video.channel_id, headers: res.headers }) )
      .catch( err => {
        dispatch({ type: 'SET_HEADERS', headers: err.headers });
        dispatch(setFlash('Failed to Add Video', 'red'));
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