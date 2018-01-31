import React from 'react';
import { APIKey } from './APIKey';
import { deleteSub } from '../actions/subscriptions';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid, Header, Icon, Image, Segment } from 'semantic-ui-react';

class Subscriptions extends React.Component {

  state = { subscription: {}, stats: {}, video: {}, videos: [], loading: true }

  componentDidMount() {
    axios.get(`api/channels/${this.props.sub.channel_id}`)
      .then( res => this.setState({ subscription: res.data, loading: false }, () => axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${this.state.subscription.yt_channel_id}&key=${APIKey}&fields=items/statistics(viewCount,subscriberCount)`)
        .then( res => this.setState({ stats: res.data.items[0].statistics }) )
        .then( axios.get(`https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${this.state.subscription.yt_channel_id}&key=${APIKey}&fields=items(snippet(title,thumbnails/default/url),contentDetails(upload/videoId))`)
          .then( res => this.setState({ videos: res.data.items }, () => this.findVideo() ))
      )
      ) )
      .catch( err => this.setState({ loading: false }))
  }

  findVideo = () => {
    const { videos } = this.state
    let n = 0
    while (n <= 5) {
      let video = videos[n]
      if( video.contentDetails ) {
        return this.getVideo(video.contentDetails.upload.videoId)
      } else {
        n++
      }
    }
  }

  getVideo = (videoId) => {
    axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${APIKey}&fields=items(snippet(title,thumbnails/default/url),statistics)`)
      .then( res => { 
        const params = res.data.items[0]
        const video = {
          title: params.snippet.title,
          thumbnail: params.snippet.thumbnails.default.url,
          stats: params.statistics
        }
        this.setState({ video }) 
      })
  }

  deleteSub = () => {
    const { dispatch, sub } = this.props
    if( window.confirm("Delete this subscription?"))
      dispatch(deleteSub(sub))
  }

  fixNumbers = (num = 0) => {
    return parseInt(num, 10).toLocaleString()
  }

  render() {
    const { subscription, stats, video } = this.state
    return (
      <Segment style={{width: "100%"}}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
                <Image circular centered src={subscription.profile_image} />
            </Grid.Column>
            <Grid.Column width={4}>
              <Header content={subscription.title} />
              <p>Subscribers: {this.fixNumbers(stats.subscriberCount) || "0"}</p>
              <p>Total Views: {this.fixNumbers(stats.viewCount) || "0"}</p>
            </Grid.Column>
            <Grid.Column width={2}>
              <Image style={{ height: -10 }} src={video.thumbnail} />
            </Grid.Column>
            <Grid.Column width={7}>
              <Header content="Latest Video" />
              <p>{ video.title || "No Video Found" }</p>
            </Grid.Column>
            <Grid.Column width={1}>
              <Icon link name="delete" style={{float: 'right'}} onClick={this.deleteSub} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default connect()(Subscriptions);