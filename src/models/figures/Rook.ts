import { EFigureNames, Figure } from './Figure';
import { EColors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '../../assets/png/black-rook.png';
import whiteLogo from '../../assets/png/white-rook.png';

export class Rook extends Figure {
  constructor(color: EColors, cell: Cell) {
    super(color, cell);
    this.logo = color === EColors.BLACK ? blackLogo : whiteLogo;
    this.name = EFigureNames.ROOK;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.isEmptyHorizontal(target)) return true;
    if (this.cell.isEmptyVertical(target)) return true;
    return false;
  }
}
