import { EFigureNames, Figure } from './Figure';
import { EColors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '../../assets/png/black-bishop.png';
import whiteLogo from '../../assets/png/white-bishop.png';

export class Bishop extends Figure {
  constructor(color: EColors, cell: Cell) {
    super(color, cell);
    this.logo = color === EColors.BLACK ? blackLogo : whiteLogo;
    this.name = EFigureNames.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.isEmptyDiagonal(target)) return true;
    return false;
  }
}
