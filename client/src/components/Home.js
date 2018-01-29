import React, { Component } from 'react';
import axios from 'axios'
import { Header } from 'semantic-ui-react';

class Home extends Component {

  state = { channels: [], subs: [] }

  componentDidMount(){
    axios.get('/api/channels')
      .then( res => this.setState({ channels: res.data }))
    axios.get('/api/subscriptions')
      .then( res => this.setState({ subs: res.data }))
  }

  render() {
    return (
      <Header as='h1' textAlign='center'>Subscriptions</Header>
    );
  }
}

export default Home;
