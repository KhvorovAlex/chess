import { EColors } from './Colors';
import { Board } from './Board';
import { Figure } from './figures/Figure';

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: EColors;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: EColors,
    figure: Figure | null,
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  addLostFigure(figure: Figure) {
    figure.color === EColors.WHITE
      ? this.board.lostWhiteFigures.push(figure)
      : this.board.lostBlackFigures.push(figure);
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure.moveFigure(target)) {
      this.figure.moveFigure(target);

      if (target.figure) {
        this.addLostFigure(target.figure);
      }

      target.setFigure(this.figure);
      this.figure = null;
    }
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }

    return false;
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEmptyVertical(target: Cell) {
    if (this.x !== target.x) return false;

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell) {
    if (this.y !== target.y) return false;

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiagonal(target: Cell) {
    const absX = Math.abs(this.x - target.x);
    const absY = Math.abs(this.y - target.y);

    if (absX !== absY) return false;

    const dx = this.x < target.x ? 1 : -1;
    const dy = this.y < target.y ? 1 : -1;

    for (let i = 1; i < absX; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }
}
