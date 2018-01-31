import React from 'react';
import { APIKey } from './APIKey';
import { connect } from 'react-redux'
import { addChannel } from '../actions/channels';
import axios from 'axios';
import { Button, Card, Dimmer, Form, Grid, Image, Label, Loader } from 'semantic-ui-react';

class ChannelSearch extends React.Component {

  state = { channel: {}, description: '', search: '', searchType: 'forUsername', loaded: true }

  handleSearch = () => {
    this.setState({ channel: {}, description: '', loaded: false })
    const { searchType } = this.state
    axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&${searchType}=${this.state.search}&key=${APIKey}&fields=items(id,snippet(title,description,thumbnails/default))`)
      .then( res => {
        this.adaptResponse(res.data.items[0])
      })
  }

  addChannel = (e) => {
    this.props.dispatch(addChannel(this.state.channel))
  }

  adaptResponse = (data) => {
    if( data ) {
      const yt_channel_id = data.id
      const { title, description } = data.snippet
      const profile_image = data.snippet.thumbnails.default.url
      const channel = { yt_channel_id, title, profile_image }
      this.setState({ channel, description, loaded: true })
    } else {
      this.setState({ error: true, loaded: true })
    }
  }

  handleChange = (e, { id, value }) => {
    this.setState({ [id]: value })
  }

  render() {
    const { channel, description, loaded } = this.state
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form onSubmit={this.handleSearch}>
              <Label basic color='grey' 
                content='Search for channel by username ( youtube.com/user/<username> )' 
              />
              <Form.Group>
              <Form.Input
                placeholder='Search'
                onChange={this.handleChange}
                id='search'
                width={14}
              />
              <Form.Button
                basic
                icon='search'
                onClick={this.handleSearch}
                width={2}
              />
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column width={8}>
            { loaded ?
              channel.title ? 
                <Card fluid>
                  <Card.Content>
                    <Grid.Column width={6}>
                      <Image rounded floated='left' size='tiny' src={channel.profile_image} />
                    </Grid.Column>
                    <Grid.Column width={12}>
                      <Card.Header style={{fontSize: 24, marginTop: 5, marginBottom: 10}} content={ channel.title } />
                      <Card.Description content={ description } />
                    </Grid.Column>
                  </Card.Content>
                  <Card.Content extra>
                    <Button floated="right" primary content="Add to List" onClick={this.addChannel} />
                  </Card.Content>
                </Card>
              :
                null
            : 
              <Dimmer active inverted><Loader>Loading channel...</Loader></Dimmer> 
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ChannelSearch)