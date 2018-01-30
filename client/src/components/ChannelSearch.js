import React from 'react';
import { APIKey } from './APIKey';
import axios from 'axios';
import { Card, Dimmer, Form, Grid, Image, Label, Loader } from 'semantic-ui-react';

class ChannelSearch extends React.Component {

  state = { channel: {}, search: '', searchType: 'forUsername', loaded: true }

  handleSearch = () => {
    this.setState({ channel: {}, loaded: false })
    const { searchType } = this.state
    axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&${searchType}=${this.state.search}&key=${APIKey}&fields=items(id,snippet(title,description,thumbnails/default))`)
      .then( res => {
        this.adaptResponse(res.data.items[0])
      })
  }

  adaptResponse = (data) => {
    if( data ) {
      const yt_channel_id = data.id
      const { title, description } = data.snippet
      const profile_image = data.snippet.thumbnails.default.url
      const channel = { yt_channel_id, title, description, profile_image }
      this.setState({ channel, loaded: true })
    } else {
      this.setState({ error: true, loaded: true })
    }
  }

  handleChange = (e, { id, value }) => {
    this.setState({ [id]: value })
  }

  render() {
    const { channel, loaded } = this.state
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form onSubmit={this.handleSearch}>
              <Label basic color='grey' 
                content='Search for Channel ID by username ( youtube.com/user/<username> )' 
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
                style={{marginBottom: 0}}
                width={2}
              />
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column width={8}>
            { loaded ? 
              <Card fluid>
                <Card.Content>
                  <Image floated='left' size='tiny' src={channel.profile_image} />
                  <Card.Header style={{fontSize: 30}} textAlign='right'>
                    { channel.title }
                  </Card.Header>
                  <Card.Description textAlign='left'>
                    { channel.description }
                  </Card.Description>
                </Card.Content>
              </Card>
            : 
              <Dimmer active inverted><Loader>Loading channel...</Loader></Dimmer> 
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

export default ChannelSearch