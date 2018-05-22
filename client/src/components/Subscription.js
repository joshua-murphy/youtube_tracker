import React from 'react';
import StatsPopup from './StatsPopup'
import moment from 'moment';
import { Dimmer, Grid, Header, Icon, Image, Loader, Popup, Segment } from 'semantic-ui-react';

class Subscriptions extends React.Component {

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

  styles = (type) => {
    const { user: { dark_theme } } = this.props    
    switch(type) {
      case 'text':
        return dark_theme ? { color: 'rgb(199, 199, 199)' } : { color: 'rgb(33, 33, 33)' };
      case 'header':
        return dark_theme ? { color: 'rgb(240, 240, 240)' } : { color: 'rgb(33, 33, 33)' };
      case 'segment':
        return dark_theme ? { backgroundColor: '#5a5a5a' } : {}
      default: break;
    }
  }

  render() {
    const { channel, time } = this.props;
    const { styles } = this;
    if( channel.video ) {
      const { video } = channel
      return (
        <Segment style={styles('segment')}>
          <Grid style={styles('text')}>
            <Grid.Column computer={2} mobile={5}>
              <Image circular centered src={channel.profile_image} href={`https://youtube.com/channel/${channel.yt_channel_id}`} target="_blank" rel="noopener noreferrer" />
            </Grid.Column>
            <Grid.Column computer={4} mobile={9}>
              <Header content={channel.title} style={styles('header')} />
              { channel.stats &&
                <div>
                  <i>Subscribers: {this.fixNumber(channel.stats.subscriberCount) }</i><br/>
                  <i>Views: {this.fixNumber(channel.stats.viewCount) }</i>
                </div>
              }
            </Grid.Column>
            <Grid.Column only='mobile' mobile={1}>
              <Icon link name='delete' onClick={() => this.props.deleteSub(this.props.channel)} />
            </Grid.Column>
            <Grid.Column computer={2} mobile={16} verticalAlign='middle'>
              <Image bordered fluid src={video.thumbnail_url} href={`https://youtube.com/watch?v=${video.yt_video_id}`} target='_blank' rel='noopener noreferrer' />
            </Grid.Column>
            <Grid.Column computer={7} mobile={16}>
              <Header as='h4' content={ video.title } style={styles('header')} />
              <i>{video.published && time && this.timeDiff(video.published)}</i><br/>
              <i>
                Views: { this.fixNumber(video.views) } | 
                Likes: {this.fixNumber(video.likes) } | 
                Dislikes: {this.fixNumber(video.dislikes) }
              </i>
              <div style={{float: 'right'}}>
                { channel.stats && <StatsPopup channel={channel} /> }
              </div>
            </Grid.Column>
            <Grid.Column only='computer' computer={1}>
              <Popup basic content="Delete Subscription" trigger={
                <Icon 
                  link 
                  name='delete' 
                  style={{float: "right"}} 
                  onClick={() => this.props.deleteSub(this.props.channel)}/> 
                }
              />
            </Grid.Column>
          </Grid>
        </Segment>
      )
    } else { 
       return (
          <Dimmer active inverted={!this.props.user.dark_theme} style={{height: '100%'}}>
            <Loader>Loading...</Loader>
          </Dimmer> 
       )
    }
  }
}

export default Subscriptions;