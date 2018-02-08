import React, { Component } from 'react';
import ChannelSearch from './ChannelSearch';
import Subscription from './Subscription';
import Channel from './Channel';
import { getChannels, clearChannels } from '../actions/channels';
import { connect } from 'react-redux'
import { Container, Dimmer, Header, Icon, Loader } from 'semantic-ui-react';
import moment from 'moment'

class Home extends Component {

  state = { time: moment().format('DDD HH mm'), loaded: false }

  componentDidMount(){
    const { dispatch, user } = this.props
    this.interval = setInterval( () => {
      this.updateTime();
    }, 60000)
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

  sortChannels = (channels) => {
    const channelArray = []
    channels.forEach( (channel, i) => {
      const video = channel.video || {}
      channelArray.push( { channel, time: moment( video.time || '0000-01-01' ).format('YYYY0MM0DD0HH0mm') } ) 
    })
    return ( channelArray.sort( (a, b) => { return b.time - a.time })
      .map( (channel, i) => <Subscription key={i} time={this.state.time} channel={channel.channel} /> )
    )
  }

  render() {
    const { channels, dispatch } = this.props
    if( channels ) {
      return (
        <Container style={{paddingTop: 15}}>
          <Header as='h1' textAlign='center'>
            Channel Activity
            <Header.Subheader>
              { channels.length > 0 && <Icon link name='refresh' onClick={() => window.location.reload()} /> }
            </Header.Subheader>
          </Header>
          { channels.map( channel => <Channel key={channel.id} channel={channel} dispatch={dispatch} /> ) }
          { channels.length ? this.sortChannels(channels) : <Header content='No channels added, yet'/> }
          <br/><ChannelSearch />
        </Container>
      );
    } else {
      return (
        <Dimmer active inverted style={{height: '100&'}}>
          <Loader>Loading channels...</Loader>
        </Dimmer> 
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    user: state.user
  }
}

export default connect(mapStateToProps)(Home);
