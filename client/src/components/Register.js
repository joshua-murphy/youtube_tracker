import React, { Component } from 'react';
import { Container, Grid, Header, Form, Button, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/auth';
import { setFlash } from '../actions/flash';

class Register extends Component {
  state = { email: '', password: '', passwordConfirmation: '' };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, passwordConfirmation } = this.state;
    const { dispatch, history } = this.props;
    if (password === passwordConfirmation) {
      dispatch(registerUser(email, password, passwordConfirmation, history));
    } else dispatch(setFlash('Passwords do not match!, please try again', 'red'));
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  render() {
    const { email, password, passwordConfirmation } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Container as={Grid} centered style={{marginTop: 15}}>
          <Grid.Column computer={8} mobile={16}>
            <Segment raised>
              <Header as='h1' textAlign='center'>Register</Header>
              <Form.Field>
                <label htmlFor='email'>Email</label>
                <Form.Input
                  id='email'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='password'>Password</label>
                <Form.Input
                  id='password'
                  placeholder='Password'
                  type='password'
                  required
                  value={password}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='passwordConfirmation'>Confirm Password</label>
                <Form.Input
                  id='passwordConfirmation'
                  placeholder='Password Confirmation'
                  type='password'
                  required
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Segment basic textAlign='center'>
                <Button primary type='submit' content='Submit' />
              </Segment>
            </Segment>
          </Grid.Column>
        </Container>
      </Form>
    );
  }
}

export default connect()(Register);
