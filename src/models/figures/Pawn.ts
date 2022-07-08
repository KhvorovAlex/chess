import { EFigureNames, Figure } from './Figure';
import { EColors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '../../assets/png/black-pawn.png';
import whiteLogo from '../../assets/png/white-pawn.png';

export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(color: EColors, cell: Cell) {
    super(color, cell);
    this.logo = color === EColors.BLACK ? blackLogo : whiteLogo;
    this.name = EFigureNames.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const direction = this.cell.figure?.color === EColors.BLACK ? 1 : -1;
    const firstStepDirection =
      this.cell.figure?.color === EColors.BLACK ? 2 : -2;

    const canStep = target.y === this.cell.y + direction;
    const canFirstStep =
      this.isFirstStep &&
      target.y === this.cell.y + firstStepDirection &&
      this.cell.board.getCell(this.cell.x, this.cell.y + direction).isEmpty();

    const isOneLineTarget = this.cell.x === target.x;
    const isCellEmpty = this.cell.board.getCell(target.x, target.y).isEmpty();
    const isDiagonalEnemy =
      this.cell.x + 1 === target.x || this.cell.x - 1 === target.x;

    if ((canStep || canFirstStep) && isOneLineTarget && isCellEmpty) {
      return true;
    }

    if (canStep && isDiagonalEnemy && this.cell.isEnemy(target)) {
      return true;
    }

    return false;
  }

  moveFigure(target: Cell): boolean {
    super.moveFigure(target);
    this.isFirstStep = false;
    return true;
  }
}
