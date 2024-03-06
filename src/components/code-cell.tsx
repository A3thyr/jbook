import { useEffect, FC } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state/types';
import { updateCell } from '../state/slice';
import { createBundle } from '../state/asyncAction';
import { useAppDispatch } from '../state/store';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const bundle = useTypedSelector((state) => state.bundlesSlice[cell.id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      dispatch(createBundle(cell.id, cell.content));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, cell.content, dispatch]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => dispatch(updateCell({ id: cell.id, content: value }))}
            initialValue={cell.content}
          />
        </Resizable>
        {bundle && <Preview code={bundle.code} err={bundle.err} />}
      </div>
    </Resizable>
  );
};

export default CodeCell;
