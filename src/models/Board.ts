import { Cell } from './Cell';
import { EColors } from './Colors';
import { Pawn } from './figures/Pawn';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Queen } from './figures/Queen';
import { Horse } from './figures/Horse';
import { Rook } from './figures/Rook';
import { Figure } from './figures/Figure';

const ROWS = 8;
const COLUMNS = 8;

export class Board {
  cells: Cell[][] = [];
  lostWhiteFigures: Figure[] = [];
  lostBlackFigures: Figure[] = [];

  public initCells() {
    for (let i = 0; i < ROWS; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < COLUMNS; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, EColors.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, EColors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  public getCell(x: number, y: number): Cell {
    return this.cells[y][x];
  }

  private addPawn() {
    for (let i = 0; i < ROWS; i++) {
      new Pawn(EColors.BLACK, this.getCell(i, 1));
      new Pawn(EColors.WHITE, this.getCell(i, 6));
    }
  }

  private addBishop() {
    new Bishop(EColors.BLACK, this.getCell(2, 0));
    new Bishop(EColors.BLACK, this.getCell(5, 0));
    new Bishop(EColors.WHITE, this.getCell(2, 7));
    new Bishop(EColors.WHITE, this.getCell(5, 7));
  }

  private addKing() {
    new King(EColors.BLACK, this.getCell(4, 0));
    new King(EColors.WHITE, this.getCell(4, 7));
  }

  private addQueen() {
    new Queen(EColors.BLACK, this.getCell(3, 0));
    new Queen(EColors.WHITE, this.getCell(3, 7));
  }

  private addHorse() {
    new Horse(EColors.BLACK, this.getCell(1, 0));
    new Horse(EColors.BLACK, this.getCell(6, 0));
    new Horse(EColors.WHITE, this.getCell(1, 7));
    new Horse(EColors.WHITE, this.getCell(6, 7));
  }

  private addRook() {
    new Rook(EColors.BLACK, this.getCell(0, 0));
    new Rook(EColors.BLACK, this.getCell(7, 0));
    new Rook(EColors.WHITE, this.getCell(0, 7));
    new Rook(EColors.WHITE, this.getCell(7, 7));
  }

  public addFigure() {
    this.addPawn();
    this.addBishop();
    this.addKing();
    this.addQueen();
    this.addHorse();
    this.addRook();
  }
}
