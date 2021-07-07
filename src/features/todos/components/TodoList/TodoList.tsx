import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from '../../../../redux/storeHooks';
import { selectNumberOfItems, selectTodos } from '../../selectors';
import { selectStatus, fetchTodosThunk, selectHasMore, getMoreItems } from '../../todosSlice';
import LoadingView from '../../../../views/LoadingView';
import EmptyListView from '../../../../views/EmptyListView';
import Todos from '../Todos';
import { selectSearchingContent } from '../../searchingSlice';
import ErrorFallback from '../../../../components/ErrorFallback';

const TodoList: React.FC = () => {
  const todos = useAppSelector(selectTodos);
  const status = useAppSelector(selectStatus);
  const numberOfItems = useAppSelector(selectNumberOfItems);
  const hasMore = useAppSelector(selectHasMore);
  const searchingContent = useAppSelector(selectSearchingContent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, []);

  if (status === 'loading') return <LoadingView />;

  if (status === 'failed') throw new Error('Fetching operation failed');

  const getMoreTodos = () => {
    dispatch(getMoreItems());
  };

  const title = searchingContent
    ? 'No result for the given search parameters'
    : 'There are no items';

  return (
    <>
      {status === 'idle' && todos.length > 0 ? (
        <InfiniteScroll
          dataLength={numberOfItems}
          next={getMoreTodos}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <Todos todos={todos} />
        </InfiniteScroll>
      ) : (
        <EmptyListView title={title} />
      )}
    </>
  );
};

const BoundedTodoList = () => {
  const dispatch = useAppDispatch();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => dispatch(fetchTodosThunk())}>
      <TodoList />
    </ErrorBoundary>
  );
};

export default BoundedTodoList;
