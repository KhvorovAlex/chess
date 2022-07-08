import { EFigureNames, Figure } from './Figure';
import { EColors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '../../assets/png/black-queen.png';
import whiteLogo from '../../assets/png/white-queen.png';

export class Queen extends Figure {
  constructor(color: EColors, cell: Cell) {
    super(color, cell);
    this.logo = color === EColors.BLACK ? blackLogo : whiteLogo;
    this.name = EFigureNames.QUEEN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.isEmptyVertical(target)) return true;
    if (this.cell.isEmptyHorizontal(target)) return true;
    if (this.cell.isEmptyDiagonal(target)) return true;

    return false;
  }
}
