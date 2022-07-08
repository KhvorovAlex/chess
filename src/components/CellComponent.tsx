import React, { FC } from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  const isAvailableForMove = cell.available && !cell.figure;
  const isAvailableForAttack = cell.available && cell.figure;

  const styles = [
    'cell',
    cell.color,
    isAvailableForAttack && 'attacked',
    selected && 'selected',
  ].join(' ');

  return (
    <div onClick={() => click(cell)} className={styles}>
      {isAvailableForMove && <div className='available' />}
      {cell.figure?.logo && (
        <img src={cell.figure.logo} alt={cell.figure.name} />
      )}
    </div>
  );
};

export default CellComponent;
