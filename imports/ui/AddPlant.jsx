import React, { Component, PropTypes } from 'react'
import Flexbox from 'flexbox-react';
import { Button, Checkbox, Form, Header } from 'semantic-ui-react'
import { push, replace, go, goBack, goForward, RouterProvider } from 'redux-little-router';
import { Provider, connect } from 'react-redux';
import R from 'ramda';

import Store from '../../imports/redux/store/storewithrouting';

class AddPlant extends Component {
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

    Accounts.createUser({email: email, username: username, password: password}, (err) => {
      if(err){
        this.setState({
          error: err.reason
        });
      } else {
        this.props.dispatch(push('/dashboard'));
      }
    });
  }


  render(){
    const error = this.state.error;
    const options = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' , content : <Header image='http://localhost:3000/Areca_Palm.jpg' content='Desktop' subheader='The largest size' />, },
    ];
    const options2 = R.map(function(item) {
                            let path = 'http://localhost:3000/' + item.name + '.jpg';
                            return { key: item.latinname, text: item.name, content : <Header image={path} content = {item.name} subheader= {item.latinname} /> }
                          },this.props.plantinfo);
    console.log(R.map(function(item) {
      let path = 'http://localhost:3000/' + item.name + '.jpg';
      return { key: item._id, text: item.name, value : item, content : <Header image={path} content = {item.name} subheader= {item.latinname} /> }
    },this.props.plantinfo));
    return (
      <RouterProvider store={Store}>
        <Provider store={Store}>
          <Flexbox flexDirection='column' >
            <Form onSubmit={this.handleSubmit}>
              <Flexbox flexDirection='row' justifyContent='center'>
                <Form.Field width={6}>
                  <label>Plant name</label>
                  <input placeholder='Plant name' name='username' type='text' onChange={this.handleChange} />
                </Form.Field>
              </Flexbox>
              <Flexbox flexDirection='row' justifyContent='center'>
                <Form.Field width={6}>
                  <label>Email</label>
                  <input placeholder='Plant xxx' name='email' type='text' onChange={this.handleChange} />
                </Form.Field>
              </Flexbox>
              <Flexbox flexDirection='row' justifyContent='center'>
                <Form.Field width={6}>
                  <label>Password</label>
                  <input placeholder='Plant yyy' name='password' type='text' onChange={this.handleChange} />
                </Form.Field>
              </Flexbox>
              <Flexbox flexDirection='row' justifyContent='center'>
                <Form.Select width={6} label='Plant type' options={options2} placeholder='Gender' />
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


AddPlant.propTypes = {
  plantinfo : React.PropTypes.array,
};

export default connect() (AddPlant);
