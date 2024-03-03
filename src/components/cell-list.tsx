import { FC } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';

const CellList: FC = () => {
  useTypedSelector((state) => state);
  return <div>cell-list</div>;
};

export default CellList;
