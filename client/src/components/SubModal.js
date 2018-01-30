import React from 'react';
import { connect } from 'react-redux';
import { addSub } from '../actions/subscriptions';
import axios from 'axios';
import { Button, Form, Grid, Header, Segment, Select } from 'semantic-ui-react';

class SubModal extends React.Component {

  state = { channelOptions: [] };

  componentDidMount() {
    axios.get('/api/channels')
      .then( res => this.adaptResponse(res.data) )
  }

  adaptResponse = (data) => {
    let options = []
    data.forEach( data => options.push({ text: data.title, value: data.id, channel: data.yt_channel_id }) )
    this.setState({ channelOptions: options })
  }

  handleSubmit = (e) => {
    const { dispatch, toggleModal, user } = this.props;
    const { channelOptions, channel } = this.state;
    let subscription = null
    e.preventDefault();
    subscription = { user_id: user.id, channel_id: channel }
    dispatch(addSub(subscription))
    toggleModal()
  }

  handleChange = (e, { value }) => {
    this.setState({ channel: value })
  }

  render() {
    return(
      <Grid width={16}>
        <Grid.Column style={{ maxWidth: 1200, paddingTop: 15 }}>
          <Segment>
            <Header textAlign="center">New Subscription</Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field
                control={Select}
                label='Channel'
                options={this.state.channelOptions}
                placeholder='Select a Channel'
                onChange={this.handleChange}
                id='channel'
                required
              />
              <Button primary>Save</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { 
    channels: state.channels, 
    user: state.user
  }
}

export default connect(mapStateToProps)(SubModal);
