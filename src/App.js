import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import orderBy from "lodash/orderBy"

import './App.css';
import Form from './Form';
import Table from './Table';

const invertDirection = {
  asc: "desc",
  desc: "asc"
}

class App extends Component {
  state = {
    data: [{
      firstName: "Dorris",
      lastName: "Cotillard",
      username: "dcotillard0",
      email: "dcotillard0@blogtalkradio.com"
    }, {
      firstName: "Terese",
      lastName: "Lithcow",
      username: "tlithcow1",
      email: "tlithcow1@bloglovin.com"
    }, {
      firstName: "Neilla",
      lastName: "Ramberg",
      username: "nramberg2",
      email: "nramberg2@businesswire.com"
    }, {
      firstName: "Karolina",
      lastName: "Cossell",
      username: "kcossell3",
      email: "kcossell3@blogger.com"
    }, {
      firstName: "Oralie",
      lastName: "Ivachyov",
      username: "oivachyov4",
      email: "oivachyov4@cargocollective.com"
    }, {
      firstName: "Fredrick",
      lastName: "Lamborn",
      username: "flamborn5",
      email: "flamborn5@xinhuanet.com"
    }, {
      firstName: "Sybyl",
      lastName: "Eldredge",
      username: "seldredge6",
      email: "seldredge6@is.gd"
    }, {
      firstName: "Blaine",
      lastName: "Pagett",
      username: "bpagett7",
      email: "bpagett7@ycombinator.com"
    }, {
      firstName: "Ashien",
      lastName: "Dulake",
      username: "adulake8",
      email: "adulake8@g.co"
    }, {
      firstName: "Allys",
      lastName: "Gabbott",
      username: "agabbott9",
      email: "agabbott9@opensource.org"
    }],
    editIdx: -1,
    columnToSort: "",
    sortDirection: "desc",
    query: "",
    columnToQuery: "firstName"
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

  handleSort = (columnName) => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection: 
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : "asc"
    }))
  }

  render() {
    const lowerCaseQuery = this.state.query.toLowerCase()
    return (
      <MuiThemeProvider>
        <div className="App">
          <Form onSubmit={submission => this.setState({ data: [...this.state.data, submission]})}/>
          <div style={{display: "flex", justifyContent: "center"}}>
            <TextField
            floatingLabelText="Query"
            value={this.state.query} 
            onChange={e => this.setState({ query: e.target.value })}
          />
            <SelectField
              style={{ marginLeft: "1em" }}
              floatingLabelText="Select a column"
              value={this.state.columnToQuery}
              onChange={(event, index, value) => this.setState({ columnToQuery: value })}
            >
              <MenuItem value='firstName' primaryText="First Name" />
              <MenuItem value='lastName' primaryText="Last Name" />
              <MenuItem value='username' primaryText="Username" />
              <MenuItem value='email' primaryText="Email" />
            </SelectField>
          </div>
          <Table 
            handleSort={this.handleSort}
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            handleSave={this.handleSave}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            stopEditing={this.stopEditing}
            data={orderBy(
              this.state.query ? this.state.data.filter(
                x => x[this.state.columnToQuery].toLowerCase().includes(lowerCaseQuery)
              ) : this.state.data, 
              this.state.columnToSort,
              this.state.sortDirection
            )}
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
                prop: "username"
              },
              {
                name: "Email",
                prop: "email"
              }
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
