import { bundleStart, bundleComplete } from './bundlesSlice';
import bundler from '../bundler';
import { AppDispatch } from './store';

export type BundlePropsThunk = {
  cellId: string;
  input: string;
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(bundleStart({ cellId }));

    const result = await bundler(input);

    dispatch(bundleComplete({ cellId, bundle: { code: result.code, err: result.err } }));
  };
};
