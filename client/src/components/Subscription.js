import React from 'react';
import { deleteChannel } from '../actions/channels'
import { connect } from 'react-redux';
import moment from 'moment';
import { Dimmer, Grid, Header, Icon, Image, Loader, Segment } from 'semantic-ui-react';

class Subscriptions extends React.Component {

  deleteSub = () => {
    const { dispatch, channel } = this.props
    if( window.confirm("Delete this subscription?"))
      dispatch(deleteChannel(channel))
  }

  fixNumber = (num = 0) => {
    return parseInt(num, 10).toLocaleString()
  }

  timeObject = (time = "00 00 00") => {
    const timeArr = time.split(" ")
    const day = parseInt(timeArr[0], 10)
    const hour = parseInt(timeArr[1], 10)
    const minute = parseInt(timeArr[2], 10)
    return { day, hour, minute }
  }

  timeDiff = (time = (new Date())) => {
    const video = this.timeObject(moment(time).format("DDD HH mm"))
    const now = this.timeObject(this.props.time)
    return this.formatTime({ 
      days: now.day - video.day, 
      minutes: ( (now.hour * 60) + now.minute ) - ( (video.hour * 60) + video.minute )
    })
  }

  formatTime = (time) => {
    const days = time.days
    const hours = Math.floor(time.minutes/60)
    const minutes = time.minutes % 60
    return `${ 
      days > 0 ? days === 1 ? `${days} day` : `${days} days` :
      hours > 0 ? hours === 1 ? `${hours} hour` : `${hours} hours` :
      minutes > 0 ? minutes === 1 ? `${minutes} minute` : `${minutes} minutes` : "Just now" 
    }`
  }

  render() {
    const { channel, time } = this.props
    if( channel.video ) {
      const { stats, video } = channel
      return (
        <Segment style={{width: "100%"}}>
          <Grid>
              <Grid.Column computer={2} mobile={5}>
                <Image circular centered src={channel.profile_image} />
              </Grid.Column>
              <Grid.Column computer={4} mobile={9}>
                <Header content={channel.title} />
                <i>Subscribers: {this.fixNumber(stats.subscriberCount) || "0"}</i><br/>
                <i>Views: {this.fixNumber(stats.viewCount) || "0"}</i>
              </Grid.Column>
              <Grid.Column only='mobile' mobile={1}>
                <Icon link name="delete" onClick={this.deleteSub} />
              </Grid.Column>
              <Grid.Column computer={2} mobile={16} className='thumbCol'>
                <Image bordered fluid src={video.thumbnail} href={`https://youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" />
              </Grid.Column>
              <Grid.Column computer={7} mobile={16}>
                <Header as="h4" content={ video.title || "No Video Found" } />
                <i>{video.time && time && this.timeDiff(video.time)} ago</i><br/>
                <i>
                  Views: { this.fixNumber(video.stats.viewCount) || 0 } | 
                  Likes: {this.fixNumber(video.stats.likeCount) || 0} | 
                  Dislikes: {this.fixNumber(video.stats.dislikeCount) || 0}
                </i>
              </Grid.Column>
              <Grid.Column only='computer' computer={1}>
                <Icon link name="delete" style={{float: 'right'}} onClick={this.deleteSub} />
              </Grid.Column>
          </Grid>
        </Segment>
      )
    } else { 
       return (
          <Dimmer active inverted style={{height: '100vh'}}>
            <Loader>Loading channels...</Loader>
          </Dimmer> 
       )
    }
  }
}

export default connect()(Subscriptions);