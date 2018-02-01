import React, { Component } from 'react';
import ChannelSearch from './ChannelSearch';
import Subscription from './Subscription';
import Channel from './Channel';
import { getChannels, clearChannels } from '../actions/channels';
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react';
import moment from 'moment'

class Home extends Component {

  componentDidMount(){
    const { dispatch, user } = this.props
    dispatch(getChannels(user.id))
  }

  componentWillUnmount() {
    this.props.dispatch(clearChannels())
  }

  sortChannels = (channels) => {
    const channelArray = []
    channels.forEach( (channel, i) => {
      const video = channel.video || {}
      channelArray.push( { channel, time: moment( video.time || new Date() ).format("DDD.HHMM") } ) 
    })
    channelArray.sort( (a, b) => { return b.time - a.time })
    return channelArray.map( (channel, i) => <Subscription key={i} channel={channel.channel} /> )
  }

  render() {
    const { channels, dispatch } = this.props
    return (
      <Container>
        <br/>
        <Header as='h1' textAlign='center'>Channel Activity</Header>
        { channels.map( channel => <Channel key={channel.id} channel={channel} dispatch={dispatch} /> ) }
        { channels.length > 0 && this.sortChannels(channels) }
        <br/><ChannelSearch />
      </Container>
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
