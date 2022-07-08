import { Cell } from '../Cell';
import { EColors } from '../Colors';
import logo from '../../assets/png/black-king.png';

export enum EFigureNames {
  'FIGURE' = 'Фигура',
  'KING' = 'Король',
  'HORSE' = 'Конь',
  'PAWN' = 'Пешка',
  'QUEEN' = 'Ферзь',
  'ROOK' = 'Ладья',
  'BISHOP' = 'Слон',
}

export class Figure {
  color: EColors;
  logo: typeof logo | null;
  cell: Cell;
  name: EFigureNames;
  id: number;

  constructor(color: EColors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = EFigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) return false;
    if (target.figure?.name === EFigureNames.KING) return false;
    return true;
  }

  moveFigure(target: Cell): boolean {
    return true;
  }
}
