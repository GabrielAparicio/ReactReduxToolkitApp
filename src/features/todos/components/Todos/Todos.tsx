import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Todo } from '../../todosSlice';
import TodoItem from '../TodoItem';

const useStyles = makeStyles({
  table: {
    maxWidth: '100%',
  },
});

interface TodosProps {
  todos: Todo[];
}

const Todos: React.FC<TodosProps> = ({ todos }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="todos-table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Completed</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {todos.map((todo, index) => (
            <TodoItem key={todo.id} todo={todo} index={index + 1} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Todos;
