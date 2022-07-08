import { EFigureNames, Figure } from './Figure';
import { EColors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '../../assets/png/black-horse.png';
import whiteLogo from '../../assets/png/white-horse.png';

export class Horse extends Figure {
  constructor(color: EColors, cell: Cell) {
    super(color, cell);
    this.logo = color === EColors.BLACK ? blackLogo : whiteLogo;
    this.name = EFigureNames.HORSE;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const absX = Math.abs(this.cell.x - target.x);
    const absY = Math.abs(this.cell.y - target.y);

    return (absX === 1 && absY === 2) || (absX === 2 && absY === 1);
  }
}
