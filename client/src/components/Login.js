import React, { Component } from 'react';
import { Container, Grid, Header, Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { handleLogin } from '../actions/auth';

class Login extends Component {
  state = { email: '', password: '' };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email, password } = this.state;
    dispatch(handleLogin(email, password, history));
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container as={Grid} centered style={{marginTop: 15}}>
        <Form as={Grid.Column} computer={8} mobile={16} onSubmit={this.handleSubmit}>
          <Segment raised>
            <Header as='h1' textAlign='center' content='Login'/>
            <Form.Field>
              <label htmlFor='email'>Email</label>
              <Form.Input
                fluid
                required
                id='email'
                value={email}
                placeholder='Email'
                onChange={this.handleChange}
              />
              </Form.Field>
              <Form.Field>
                <label htmlFor='password'>Password</label>
                <Form.Input
                  fluid
                  required
                  id='password'
                  value={password}
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Segment textAlign='center' basic>
                <Button primary type='submit'>Submit</Button>
              </Segment>
            </Segment>
          </Form>
        {/* </Grid> */}
      </Container>
    );
  }
}

export default connect()(Login);
