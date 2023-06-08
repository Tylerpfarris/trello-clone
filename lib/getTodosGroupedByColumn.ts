import { database } from '@/appwrite';

export const getTodosGroupedByColumn = async () => {
  const data = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.createdAt,
      $collectionId: todo.collectionId,
      $databaseId: todo.$databaseId,
      $permissions: todo.$permissions,
      $updatedAt: todo.$updatedAt,
      status: todo.status,
      title: todo.title,
      ...(todo.image && { image: todo.image }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  const columnTypes: TypedColumn[] = ['todo', 'in_progress', 'done'];

  columnTypes.forEach((type) => {
    if (!columns.get(type)) {
      columns.set(type, {
        id: type,
        todos: [],
      });
    }
  });

  const sortedColumns = new Map<TypedColumn, Column>(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
