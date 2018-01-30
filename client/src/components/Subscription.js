import React from 'react';
import axios from 'axios';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

class Subscriptions extends React.Component {

  state = { subscription: {}, loaded: false }

  componentDidMount() {
    axios.get(`api/channels/${this.props.sub.channel_id}`)
      .then( res => this.setState({ subscription: res.data, loaded: true }))
      .catch( err => this.setState({ loaded: true }))
  }

  render() {
    const { subscription } = this.state
    if( subscription )
      return (
        <Segment>{subscription.title}</Segment>
      )
    else 
      return(
        <Dimmer active inverted>
          <Loader>Loading Subscription</Loader>
        </Dimmer>
      )
  }
}

export default Subscriptions;