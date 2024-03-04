import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoveCellProps, InsertCellProps, UpdateCellProps, CellsState, Cell } from './types';
import { randomId } from './utils/randomId';

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const firstSlice = createSlice({
  name: 'first',
  initialState,
  reducers: {
    moveCell(state, action: PayloadAction<MoveCellProps>) {
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },
    deleteCell(state, action: PayloadAction<string>) {
      delete state.data[action.payload];

      state.order = state.order.filter((id) => id !== action.payload);
    },
    insertCellAfter(state, action: PayloadAction<InsertCellProps>) {
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;
      const index = state.order.findIndex((id) => id === action.payload.id);

      if (index < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    },
    updateCell(state, action: PayloadAction<UpdateCellProps>) {
      const { id, content } = action.payload;

      state.data[id].content = content;
    },
  },
});

export const { moveCell, deleteCell, insertCellAfter, updateCell } = firstSlice.actions;

export default firstSlice.reducer;
