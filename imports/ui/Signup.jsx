import React, { Component, PropTypes } from 'react'
import Flexbox from 'flexbox-react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { push, replace, go, goBack, goForward, RouterProvider } from 'redux-little-router';
import { Provider, connect } from 'react-redux';


import Store from '../../imports/redux/store/storewithrouting';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', email: '', submittedUsername: '', submittedPassword: '', submittedEmail: '' ,error: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(`event.target.value: ${JSON.stringify(e.target.value)}`);
    console.log(`event.target.name: ${JSON.stringify(e.target.name)}`);
    console.log(this.state);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state);
    const { username, password, email } = this.state;

    console.log(username);
    console.log(password);
    console.log(email);

    // Meteor.loginWithPassword(username, password, (err) => {
    //   if(err){
    //     this.setState({
    //       error: err.reason
    //     });
    //   } else {
    //     this.props.dispatch(push('/dashboard'));
    //     console.log("Routing");
    //   }
    // });

    Accounts.createUser({email: email, username: username, password: password}, (err) => {
      if(err){
        this.setState({
          error: err.reason
        });
      } else {
        this.props.dispatch(push('/login'));
      }
    });
  }



  render(){
    const error = this.state.error;
    return (
      <RouterProvider store={Store}>
        <Provider store={Store}>
          <Flexbox flexDirection='column' >
            <Form onSubmit={this.handleSubmit}>
              <Flexbox flexDirection='row' justifyContent='center'>
                <Form.Field width={6}>
                  <label>Username</label>
                  <input placeholder='username' name='username' type='text' onChange={this.handleChange} />
                </Form.Field>
              </Flexbox>
              <Flexbox flexDirection='row' justifyContent='center'>
                <Form.Field width={6}>
                  <label>Email</label>
                  <input placeholder='email' name='email' type='text' onChange={this.handleChange} />
                </Form.Field>
              </Flexbox>
              <Flexbox flexDirection='row' justifyContent='center'>
                <Form.Field width={6}>
                  <label>Password</label>
                  <input placeholder='password' name='password' type='password' onChange={this.handleChange} />
                </Form.Field>
              </Flexbox>
              <Flexbox flexDirection='row' justifyContent='center'>
                <Button type='submit'>Submit</Button>
              </Flexbox>
            </Form>
          </Flexbox>
        </Provider>
      </RouterProvider>
    );
  }
}

export default connect() (Signup);
