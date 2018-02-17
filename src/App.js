import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
  handleSave = (i, x) => {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === i ? x : row))
    }))
    this.stopEditing();
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
            handleSave={this.handleSave}
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
