import React from 'react';
import StatsPopup from './StatsPopup'
import { deleteChannel } from '../actions/channels'
import { connect } from 'react-redux';
import moment from 'moment';
import { Dimmer, Grid, Header, Icon, Image, Loader, Popup, Segment } from 'semantic-ui-react';

class Subscriptions extends React.Component {

  deleteSub = () => {
    const { dispatch, channel } = this.props
    if( window.confirm("Delete this subscription?"))
      dispatch(deleteChannel(channel))
  }

  fixNumber = (num = 0) => {
    return parseInt(num, 10).toLocaleString()
  }

  timeObject = (time = '00 00 00') => {
    const timeArr = time.split(' ')
    const day = parseInt(timeArr[0], 10)
    const hour = parseInt(timeArr[1], 10)
    const minute = parseInt(timeArr[2], 10)
    return { day, hour, minute }
  }

  timeDiff = (time = (new Date())) => {
    const video = this.timeObject(moment(time).format('DDD HH mm'))
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
      days < 0 ? 'Long ago' : days > 0 ? days === 1 ? `1 day ago` : `${days} days ago` :
      hours > 0 ? hours === 1 ? `1 hour ago` : `${hours} hours ago` :
      minutes > 0 ? minutes === 1 ? `1 minute ago` : `${minutes} minutes ago` : 'Just now' 
    }`
  }

  render() {
    const { channel, time } = this.props
    if( channel.stats && channel.video ) {
      const { stats, video } = channel
      return (
        <Segment style={{width: '100%'}}>
          <Grid>
            <Grid.Column computer={2} mobile={5}>
              <Image circular centered src={channel.profile_image} href={`https://youtube.com/channel/${channel.yt_channel_id}`} target="_blank" rel="noopener noreferrer" />
            </Grid.Column>
            <Grid.Column computer={4} mobile={9}>
              <Header content={channel.title} />
              <i>Subscribers: {this.fixNumber(stats.subscriberCount) }</i><br/>
              <i>Views: {this.fixNumber(stats.viewCount) }</i>
            </Grid.Column>
            <Grid.Column only='mobile' mobile={1}>
              <Icon link name='delete' onClick={this.deleteSub} />
            </Grid.Column>
            <Grid.Column computer={2} mobile={16} verticalAlign='middle'>
              <Image bordered fluid src={video.thumbnail} href={`https://youtube.com/watch?v=${video.id}`} target='_blank' rel='noopener noreferrer' />
            </Grid.Column>
            <Grid.Column computer={7} mobile={16}>
              <Header as='h4' content={ video.title } />
              <i>{video.time && time && this.timeDiff(video.time)}</i><br/>
              <i>
                Views: { this.fixNumber(video.stats.viewCount) } | 
                Likes: {this.fixNumber(video.stats.likeCount) } | 
                Dislikes: {this.fixNumber(video.stats.dislikeCount) }
              </i>
              <div style={{float: 'right'}}>
                <StatsPopup channel={channel} /> 
              </div>
            </Grid.Column>
            <Grid.Column only='computer' computer={1}>
              <Popup basic content="Delete Subscription" trigger={
                <Icon 
                  link 
                  name='delete' 
                  style={{float: "right"}} 
                  onClick={this.deleteSub}/> 
                }
              />
            </Grid.Column>
          </Grid>
        </Segment>
      )
    } else if( channel.stats ) { 
      const stats = channel.stats ? channel.stats : {}
      return (
        <Segment style={{width: '100%'}}>
          <Grid>
            <Grid.Column computer={2} mobile={5}>
              <Image circular centered src={channel.profile_image} href={`https://youtube.com/channel/${channel.yt_channel_id}`} target='_blank' rel='noopener noreferrer' />
            </Grid.Column>
            <Grid.Column computer={4} mobile={9}>
              <Header content={channel.title} />
              <i>Subscribers: {this.fixNumber(stats.subscriberCount) || '0'}</i><br/>
              <i>Views: {this.fixNumber(stats.viewCount) || '0'}</i>
            </Grid.Column>
            <Grid.Column only='mobile' mobile={1}>
              <Icon link name='delete' onClick={this.deleteSub} />
            </Grid.Column>
            <Grid.Column computer={2} mobile={16} verticalAlign='middle'>
              <Image bordered fluid src='' />
            </Grid.Column>
            <Grid.Column computer={7} mobile={16}>
              <Header as='h4' content={ 'Video Not Found' } />
              <br/>
              <i>
                Views: 0 | 
                Likes: 0 | 
                Dislikes: 0
              </i>
            </Grid.Column>
            <Grid.Column only='computer' computer={1}>
              <Icon link name='delete' style={{float: 'right'}} onClick={this.deleteSub} />
            </Grid.Column>
          </Grid>
        </Segment>
      )
    } else { 
       return (
          <Dimmer active inverted style={{height: '100%'}}>
            <Loader>Loading channels...</Loader>
          </Dimmer> 
       )
    }
  }
}

export default connect()(Subscriptions);