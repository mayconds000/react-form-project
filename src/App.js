import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logo from './logo.svg';
import './App.css';
import Form from './Form';
import Table from './Table';

class App extends Component {
  state = {
    data: []
  }

  onChange = updatedValue => {
    const fields = {
      ...this.state.fields,
      ...updatedValue
    }
    this.setState({ fields })
  }

  handleRemove = (i) => {
    this.setState(state => ({
      data: state.data.filter((x, j) => j !== i)
    }))
  }
  startEditing = (i) => {
    this.setState({editIdx: i});
  }
  stopEditing = () => {
    this.setState({editIdx: -1})
  }
  handleChange = (e, name, i) => {
    const { value } = e.target
    this.setState(state => ({
      data: state.data.map((row, j) => j === i 
        ? ({...row, [name]: value }) 
        : (row))
    }))
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Form onSubmit={submission => this.setState({ data: [...this.state.data, submission]})}/>
          <p>
            {JSON.stringify(this.state.fields, null, 2)}
          </p>
          <Table 
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            handleChange={this.handleChange}
            stopEditing={this.stopEditing}
            data={this.state.data}
            header={[
              {
                name: "First Name",
                prop: 'firstName'
              },
              {
                name: "Last Name",
                prop: "lastName"
              },
              {
                name: "Username",
                props: "username"
              },
              {
                name: "Email",
                props: "email"
              }
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
