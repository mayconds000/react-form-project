import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import EditIcon from 'material-ui/svg-icons/image/edit';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import DownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-drop-up';
import TextField from 'material-ui/TextField';


import InlineForm from './InlineForm';

const row = (x, i, header, handleRemove, startEditing, editIdx, handleSave, stopEditing) => {
  const currentlyEditing = editIdx === i;
  return currentlyEditing ? (
    <TableRow key={`tr-${i}`}>
      <InlineForm 
        key={`inline-form-${i}`}
        handleSave={handleSave} 
        header={header} 
        x={x} 
        i={i}
        stopEditing={stopEditing}
      />
    </TableRow>
  ) : (
    <TableRow key={`tr-${i}`} selectable={false}>
      <TableRowColumn>{x.firstName}</TableRowColumn>
      <TableRowColumn >{x.lastName}</TableRowColumn>
      <TableRowColumn >{x.username}</TableRowColumn>
      <TableRowColumn >{x.email}</TableRowColumn>
      <TableRowColumn>
          <EditIcon onClick={() => startEditing(i)} />
          <TrashIcon onClick={() => handleRemove(i)} />
      </TableRowColumn>
    </TableRow>
  );
}

export default ({
  data, 
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleSave,
  stopEditing,
  handleSort,
  sortDirection,
  columnToSort
}) => 
  <Table>
    <TableHeader adjustForCheckbox={true}>
      <TableRow>
        {header.map( (x, i) => 
          <TableHeaderColumn key={i}>
            <div 
              style={{
                display: "flex",
                alignItems: "center"
              }}
              onClick={() => handleSort(x.prop)} >
              <span>{x.name}</span>
              {columnToSort === x.prop ? (
                sortDirection === "asc" ? (
                  <UpArrow />
                ) : (
                  <DownArrow />
                )
              ) : null}
            </div>
          </TableHeaderColumn>
        )}
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={true}>
        {data.map(( x, i ) => row(
          x,
          i,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleSave,
          stopEditing
        ))}
    </TableBody>
  </Table>;

