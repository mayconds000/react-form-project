import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Form extends React.Component {
  state = {
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  }

  style = {
    buttonPrimary: {
      margin: '12px'
    }
  }



  change = e => {
    // this.props.onChange({
    //   [e.target.name]: e.target.value
    // })
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validate = () => {
    let isError = false
    const errors = {
    firstNameError: '',
    lastNameError: '',
    usernameError: '',
    emailError: '',
    passwordError: ''
    }
    if ( this.state.username.length < 5 ) {
      isError = true;
      errors.usernameError = "Username needs to be at least 5 characters long";
    }

    if ( this.state.email.indexOf("@") === -1 ) {
      isError = true;
      errors.emailError = "Required a valid email";
    }

    this.setState( errors );

    return isError;
  }

  onSubmit = (e) => {
    e.preventDefault()
    const err = this.validate();
    if ( !err ) {
      this.props.onSubmit(this.state)
      this.setState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
      })
    }
  }
 

  render() {
    return (
      <form>
        <TextField
          name="firstName"
          floatingLabelText="First Name"
          value={this.state.firstName} 
          onChange={this.change}
          errorText={this.state.firstNameError}
        />
        <br />
        
      <TextField 
        floatingLabelText="Last Name" 
        name="lastName"
        value={this.state.lastName} 
        onChange={this.change} 
        errorText={this.state.lastNameError}
      />
        <br />

      <TextField 
        floatingLabelText="Username" 
        name="username"
        value={this.state.username} 
        onChange={this.change} 
        errorText={this.state.usernameError}
      />
        <br />

      <TextField 
        floatingLabelText="E-mail" 
        name="email"
        value={this.state.email} 
        onChange={this.change} 
        errorText={this.state.emailError}
      />
        <br />

      <TextField 
        floatingLabelText="Password" type="password" 
        name="password"
        value={this.state.password} 
        onChange={this.change} 
        errorText={this.state.passwordError}
      />
        <br />

        <RaisedButton label="Submit" primary={true} style={this.style.buttonPrimary} onClick={this.onSubmit} />

      </form>
    )
  }
}
