import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCell, moveCell } from '../state/slice';
import './action-bar.scss';

interface ActionBarProps {
  id: string;
}

const ActionBar: FC<ActionBarProps> = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => dispatch(moveCell({ id, direction: 'up' }))}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => dispatch(moveCell({ id, direction: 'down' }))}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button className="button is-primary is-small" onClick={() => dispatch(deleteCell(id))}>
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
