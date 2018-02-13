import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import EditIcon from 'material-ui/svg-icons/image/edit';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import CheckIcon from 'material-ui/svg-icons/navigation/check';

const row = (x, i, header, handleRemove, startEditing, editIdx, handleChange, stopEditing) => {
  const currentlyEditing = editIdx === i;
  return (
    <TableRow key={`tr-${i}`} selectable={false}>
      <TableRowColumn>{currentlyEditing 
        ? <TextField name="firstName" onChange={e => handleChange(e, 'firstName', i)}  value={x.firstName}/>
        : x.firstName}
      </TableRowColumn>
      <TableRowColumn >{currentlyEditing 
        ? <TextField name="lastName" onChange={e => handleChange(e, 'lastName', i)}  value={x.lastName}/>
        : x.lastName}
      </TableRowColumn>
      <TableRowColumn >{currentlyEditing 
        ? <TextField name="username" onChange={e => handleChange(e, 'username', i)}  value={x.username}/>
        : x.username}
      </TableRowColumn>
      <TableRowColumn >{currentlyEditing 
        ? <TextField name="email" onChange={e => handleChange(e, 'email', i)}  value={x.email}/>
        : x.email}
      </TableRowColumn>
      <TableRowColumn>
        {currentlyEditing 
          ? <CheckIcon onClick={() => stopEditing(i)} />
          : <EditIcon onClick={() => startEditing(i)} />}
      </TableRowColumn>
      <TableRowColumn><TrashIcon onClick={() => handleRemove(i)} /></TableRowColumn>
    </TableRow>
  );
}

export default ({
  data, 
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing
}) => 
  <Table>
    <TableHeader>
      <TableRow>
        {header.map( (x, i) => 
          <TableHeaderColumn key={i}>
            {x.name}
          </TableHeaderColumn>
        )}
        <TableHeaderColumn />
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody>
        {data.map((x,i) => row(
          x,
          i,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleChange,
          stopEditing
        ))}
    </TableBody>
  </Table>;

