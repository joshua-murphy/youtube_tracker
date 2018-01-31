import React from 'react';
import { APIKey } from './APIKey';
import { deleteSub } from '../actions/subscriptions';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid, Header, Icon, Image, Segment } from 'semantic-ui-react';

class Subscriptions extends React.Component {

  state = { subscription: {}, stats: {}, loading: true }

  componentDidMount() {
    console.log(this.props.sub)
    axios.get(`api/channels/${this.props.sub.channel_id}`)
      .then( res => this.setState({ subscription: res.data, loading: false }, () => axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${this.state.subscription.yt_channel_id}&key=${APIKey}&fields=items/statistics(viewCount,subscriberCount)`)
        .then( res => this.setState({ stats: res.data.items[0].statistics }) )
      ) )
      .catch( err => this.setState({ loading: false }))
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
    const { subscription, stats } = this.state
    return (
      <Segment style={{width: "100%"}}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image circular src={subscription.profile_image} />
            </Grid.Column>
            <Grid.Column width={13}>
              <Header content={subscription.title} />
              <p>{this.fixNumbers(stats.subscriberCount) || "0"}</p>
              <p>{this.fixNumbers(stats.viewCount) || "0"}</p>
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