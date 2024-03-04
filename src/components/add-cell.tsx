import { FC } from 'react';
import './add-cell.scss';
import { useDispatch } from 'react-redux';
import { insertCellAfter } from '../state/slice';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const dispatch = useDispatch();
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-cell-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => dispatch(insertCellAfter({ id: prevCellId, type: 'code' }))}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => dispatch(insertCellAfter({ id: prevCellId, type: 'text' }))}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="add-cell-divider"></div>
    </div>
  );
};

export default AddCell;
