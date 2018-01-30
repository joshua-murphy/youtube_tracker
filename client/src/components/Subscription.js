import React from 'react';
import axios from 'axios';
import { deleteSub } from '../actions/subscriptions';
import { connect } from 'react-redux';
import { Icon, Segment } from 'semantic-ui-react';

class Subscriptions extends React.Component {

  state = { subscription: {}, loading: true }

  componentDidMount() {
    axios.get(`api/channels/${this.props.sub.channel_id}`)
      .then( res => this.setState({ subscription: res.data, loading: false }))
      .catch( err => this.setState({ loading: false }))
  }

  deleteSub = () => {
    const { dispatch, sub } = this.props
    if( window.confirm("Delete this subscription?"))
      dispatch(deleteSub(sub))
  }

  render() {
    const { subscription, loading } = this.state
    return (
      <Segment loading={ loading }>
        {subscription.title}
        <Icon link name="delete" style={{float: 'right'}} onClick={this.deleteSub} />
      </Segment>
    )
  }
}

export default connect()(Subscriptions);