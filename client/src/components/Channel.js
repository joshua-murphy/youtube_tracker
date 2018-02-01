import React from 'react';
import { getStats, getVideo } from '../actions/channel';

class Channel extends React.Component {

  componentDidMount() {
    const { channel, dispatch } = this.props
    dispatch(getStats(channel.id, channel.yt_channel_id))
    dispatch(getVideo(channel.id, channel.yt_channel_id))
  }

  render() {
    return null
  }
}

export default (Channel);