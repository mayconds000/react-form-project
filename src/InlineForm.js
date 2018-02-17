import React from 'react'
import TextField from 'material-ui/TextField';
import { TableRowColumn } from 'material-ui/Table';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';

export default class InlineForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.x);
    this.state = {
      values: {
        ...props.x,
      },
      errors: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
      }
    }
  }

  style = {
    buttonPrimary: {
      margin: '12px'
    }
  }

  change = e => {
    const {name, value} = e.target;
    this.setState(state => ({
      values: { 
        ...state.values, 
        [name]: value 
      } 
    }));
  }

  validate = () => {
    let isError = false
    const errors = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
    }

    const { username, email } = this.state.values;

    if ( username.length < 5 ) {
      isError = true;
      errors.username = "Username needs to be at least 5 characters long";
    }

    if ( email.indexOf("@") === -1 ) {
      isError = true;
      errors.email = "Required a valid email";
    }

    this.setState( { errors } );

    return isError;
  }

  onSubmit = (e) => {
    e.preventDefault()
    const err = this.validate();
    if ( !err ) {
      this.props.handleSave(this.props.i, this.state.values);
    }
  }

  render() {
    const { i } = this.props;
    return [
      <TableRowColumn key={`inline-form-trc-${i}.firstName`}>
        <TextField name="firstName" onChange={e => this.change(e)}  value={this.state.values.firstName} errorText={this.state.errors.firstName}/>
      </TableRowColumn>,
      <TableRowColumn key={`inline-form-trc-${i}.lastName`}>
        <TextField name="lastName" onChange={e => this.change(e)}  value={this.state.values.lastName} errorText={this.state.errors.lastName}/>
      </TableRowColumn>,
      <TableRowColumn key={`inline-form-trc-${i}.username`}>
        <TextField name="username" onChange={e => this.change(e)}  value={this.state.values.username} errorText={this.state.errors.username}/>
      </TableRowColumn>,
      <TableRowColumn key={`inline-form-trc-${i}.email`}>
        <TextField name="email" onChange={e => this.change(e)}  value={this.state.values.email} errorText={this.state.errors.email}/>
      </TableRowColumn>,
      <TableRowColumn key={`inline-form-trc-${i}.actions`}>
        <CheckIcon onClick={this.onSubmit} />
        <CancelIcon onClick={this.props.stopEditing} />
      </TableRowColumn>
    ]
  }
}
