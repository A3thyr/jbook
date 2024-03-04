import { useState, useEffect, FC } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundler from '../bundler';
import Resizable from './resizable';
import { Cell } from '../state/types';
import { useDispatch } from 'react-redux';
import { updateCell } from '../state/slice';

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => dispatch(updateCell({ id: cell.id, content: value }))}
            initialValue={cell.content}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
