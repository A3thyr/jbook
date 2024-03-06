import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BundleStartProps, BundleCompleteProps } from './bundle/types';

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const bundlesSlice = createSlice({
  name: 'bundle',
  initialState,
  reducers: {
    bundleStart(state, action: PayloadAction<BundleStartProps>) {
      state[action.payload.cellId] = {
        loading: true,
        code: '',
        err: '',
      };
    },
    bundleComplete(state, action: PayloadAction<BundleCompleteProps>) {
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };
    },
  },
});

export const { bundleStart, bundleComplete } = bundlesSlice.actions;

export default bundlesSlice.reducer;
