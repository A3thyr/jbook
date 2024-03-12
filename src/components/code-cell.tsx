import { useEffect, FC } from 'react';
import './code-cell.scss';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state/types';
import { updateCell } from '../state/slice';
import { createBundle } from '../state/asyncAction';
import { useAppDispatch } from '../state/store';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const bundle = useTypedSelector((state) => state.bundlesSlice[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  console.log(cumulativeCode);

  useEffect(() => {
    if (!bundle) {
      dispatch(createBundle(cell.id, cumulativeCode));
      return;
    }

    const timer = setTimeout(async () => {
      dispatch(createBundle(cell.id, cumulativeCode));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, dispatch]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => dispatch(updateCell({ id: cell.id, content: value }))}
            initialValue={cell.content}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
