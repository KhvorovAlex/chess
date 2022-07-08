import React, { FC } from 'react';
import { Figure } from '../models/figures/Figure';

interface LostFiguresComponentProps {
  figures: Figure[];
  color: 'black' | 'white';
}

const LostFiguresComponent: FC<LostFiguresComponentProps> = ({
  figures,
  color,
}) => {
  const styles = ['lost-figure', color].join(' ');

  return (
    <div className={styles}>
      {figures.map((figure) => (
        <div className='lost-figure-item' key={figure.id}>
          <span>{figure.name}</span>
          {figure.logo && <img src={figure.logo} alt={figure.name} />}
        </div>
      ))}
    </div>
  );
};

export default LostFiguresComponent;
