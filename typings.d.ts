interface Board {
  columns: Map<TypeColumn, Column>;
}

type TypedColumn = 'todo' | 'in_progress' | 'done';

interface Column {
  id: TypedColumn;
  todos: Todo[];
}

interface Todo {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  image?: Image;
  status: TypedColumn;
  title: string;
}

interface Image {
  bucketId: string;
  fileId: string;
}
