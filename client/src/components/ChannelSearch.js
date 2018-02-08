import React from 'react';
import { APIKey } from './APIKey';
import { connect } from 'react-redux'
import { addChannel } from '../actions/channels';
import axios from 'axios';
import { Button, Card, Dimmer, Form, Grid, Image, Loader, Segment } from 'semantic-ui-react';

class ChannelSearch extends React.Component {

  state = { channel: {}, description: '', search: '', searchType: 'forUsername', loaded: true, showForm: false }

  handleSearch = () => {
    this.setState({ description: '', search: '', loaded: false })
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
      const user_id = this.props.user.id
      const channel = { yt_channel_id, title, profile_image, user_id }
      this.setState({ channel, description, loaded: true })
    } else {
      this.setState({ error: true, loaded: true })
    }
  }

  handleChange = (e, { id, value }) => {
    this.setState({ [id]: value })
  }

  render() {
    const { channel, description, search, searchType, loaded, showForm } = this.state
    if( showForm ) {
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16}>
              <Form as={Segment} onSubmit={this.handleSearch}>
                <Form.Group inline>
                  {/* <Button style={{marginRight: '1em'}} basic icon="cancel" onClick={() => this.setState({ showForm: false })} /> */}
                  <Form.Radio 
                    label='Search by username' 
                    checked={searchType === 'forUsername'} 
                    onClick={() => this.setState({searchType: 'forUsername'})} 
                  />
                  <Form.Radio 
                    label='Search by channel id' 
                    checked={searchType === 'id'} 
                    onClick={() => this.setState({searchType: 'id'})} 
                  />
                </Form.Group> 
                <Form.Input
                  fluid
                  placeholder='Search'
                  value={search}
                  onChange={this.handleChange}
                  id='search'
                />
                <Form.Button
                  basic
                  floated='right'
                  icon='search'
                  onClick={this.handleSearch}
                />
                <br/><br/>
              </Form>
            </Grid.Column>
            <Grid.Column computer={8} mobile={16}>
              { loaded ?
                channel.title &&
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
                      <Button floated='right' primary content='Add to List' onClick={() => this.props.dispatch(addChannel(this.state.channel))} />
                    </Card.Content>
                  </Card>
              : 
                <Dimmer active inverted style={{height: '100%'}}>
                  <Loader>Loading channel...</Loader>
                </Dimmer> 
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    } else {
      return (
        <Button basic content='Add Channel' onClick={() => this.setState({ showForm: true })} />
      )
    }
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ChannelSearch)