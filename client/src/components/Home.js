import React, { Component } from 'react';
import AddSub from './AddSub';
import ChannelSearch from './ChannelSearch';
import Subscription from './Subscription';
import { getSubs, clearSubs } from '../actions/subscriptions';
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react';

class Home extends Component {

  componentDidMount(){
    const { dispatch, user } = this.props
    dispatch(getSubs(user.id))
  }

  componentWillUnmount() {
    this.props.dispatch(clearSubs())
  }

  render() {
    const { subs } = this.props
    return (
      <Container>
        <Header as='h1' textAlign='center'>Subscriptions</Header>
        <hr/><AddSub /><hr/>
        { subs.map( sub => <Subscription key={sub.id} sub={sub} /> ) }
        <br/><ChannelSearch />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subs: state.subscriptions,
    user: state.user
  }
}

export default connect(mapStateToProps)(Home);
