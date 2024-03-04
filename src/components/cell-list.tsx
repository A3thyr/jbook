import { FC } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';

const CellList: FC = () => {
  const cells = useTypedSelector(({ first: { order, data } }) => order.map((id) => data[id]));

  const renderedCells = cells.map((cell) => <CellListItem key={cell.id} cell={cell} />);

  return <div>{renderedCells}</div>;
};

export default CellList;
