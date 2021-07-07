import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Todo } from '../../todosSlice';

interface TodoItemProps {
  todo: Todo;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {index}
      </TableCell>
      <TableCell align="left">{todo.title}</TableCell>
      <TableCell align="left">{todo.completed ? 'yes' : 'no'}</TableCell>
    </TableRow>
  );
};

export default TodoItem;
