export type MoveCellProps = {
  id: string;
  direction: 'up' | 'down';
};

export type InsertCellProps = {
  id: string | null;
  type: 'code' | 'text';
};

export type UpdateCellProps = {
  id: string;
  content: string;
};

export interface Cell {
  id: string;
  type: 'code' | 'text';
  content: string;
}

export interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}
