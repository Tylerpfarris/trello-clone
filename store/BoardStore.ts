import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface BoardState {
  board: Board;
  getBoard: () => void;
}

const useBoardStore = create<BoardState>()((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
}));

export { useBoardStore };
