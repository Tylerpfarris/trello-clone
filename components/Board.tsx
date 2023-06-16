'use client';

import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import { todo } from 'node:test';

const columnOrder: TypedColumn[] = ['todo', 'in_progress', 'done'];

const checkSameOrder = (arr1: TypedColumn[], arr2: string[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (type === 'column') {
      let rearrangedColumns;

      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);

      entries.splice(destination.index, 0, removed);

      const newEntriesOrder = entries.map(([id]) => id);
      //console.log(`newEntriesOrder==========`, newEntriesOrder);
      if (!checkSameOrder(columnOrder, newEntriesOrder)) {
        const newEntries: [TypedColumn, Column][] = entries.map(
          ([id, todo], i) => {
            console.log(`id, todos==========`, id, todo);
            return [columnOrder[i], { id: columnOrder[i], todos: todo.todos }];
          }
        );

        rearrangedColumns = new Map(newEntries);
      } else {
        rearrangedColumns = new Map(entries);
      }

      setBoardState({ ...board, columns: rearrangedColumns });
    }

    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];
    if (!startColIndex || !finishColIndex) return;

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };
    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };
    if (!startCol || !finishCol) return;
    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);
    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({ ...board, columns: newColumns });
    } else {
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      newColumns.set(finishCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      updateTodoInDB(todoMoved, finishCol.id);
      setBoardState({ ...board, columns: newColumns });
    }
  };

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
