import React, { Component } from 'react';
import ChannelSearch from './ChannelSearch';
import Subscription from './Subscription';
import Channel from './Channel';
import { getChannels, clearChannels , deleteChannel} from '../actions/channels';
import { connect } from 'react-redux'
import { Container, Header, Icon } from 'semantic-ui-react';
import moment from 'moment'

class Home extends Component {

  state = { time: moment().format('DDD HH mm'), loaded: false }

  componentDidMount() {
    const { dispatch, user } = this.props
    this.interval = setInterval( () => {
      this.updateTime();
    }, 60000 )
    dispatch(getChannels(user.id))
  }

  componentWillUnmount() {
    clearInterval(this.interval)    
    this.props.dispatch(clearChannels())
  }

  componentDidUpdate() {
    this.updateTime()
  }

  updateTime = () => {
    let { time } = this.state
    let now = moment().format('DDD HH mm')
    if( now !== time ) {
      this.setState({ time: now })
    }
  } 

  deleteSubscription = (channel) => {
    const { dispatch } = this.props
    if( window.confirm("Delete this subscription?"))
      dispatch(deleteChannel(channel))
  }

  cmp = (x, y) => {
    return x > y ? 1 : x < y ? -1 : 0; 
  };

  sortChannels = (channels) => {
    const { cmp } = this;
    const channelArray = []
    channels.forEach( (channel, i) => {
      const video = channel.video || {}
      channelArray.push( { channel, time: moment( video.published || '0000-01-01' ).format('YYYY0MM0DD0HH0mm') } ) 
    })
    return ( channelArray
      .sort( (a, b) => b.time - a.time )
      .map( (channel, i) => <Subscription key={i} user={this.props.user} time={this.state.time} channel={channel.channel} deleteSub={this.deleteSubscription} /> )
    )
  }

  styles = (type) => {
    const { user: { dark_theme } } = this.props    
    switch(type) {
      case 'bg':
        return dark_theme ? { backgroundColor: 'rgb(30, 30, 30)' } : { backgroundColor: '#f0f0f0' };
      case 'text':
        return dark_theme ? { color: '#f0f0f0' } : { color: 'rgb(33, 33, 33)' };
      default: break;
    }
  }

  render() {
    const { channels, dispatch, user: { dark_theme } } = this.props
    const { sortChannels, styles } = this;
    return (
      <div style={styles('bg')}>
        <Container style={{ paddingTop: 15 }}>
          <Header as='h1' textAlign='center' style={styles('text')}>
            Channel Activity
            <Header.Subheader>
              { channels.length > 0 && <Icon link name='refresh' style={styles('text')} onClick={() => window.location.reload()} /> }
            </Header.Subheader>
          </Header>
          { channels.map( channel => <Channel key={channel.id} channel={channel} dispatch={dispatch} /> ) }
          { channels.length ? sortChannels(channels) : <Header content='No channels added, yet'/> }
          <br/><ChannelSearch />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    user: state.user
  }
}

export default connect(mapStateToProps)(Home);
