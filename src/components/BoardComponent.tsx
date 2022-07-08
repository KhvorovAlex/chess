import React, { FC, Fragment, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import CellComponent from './CellComponent';
import { Cell } from '../models/Cell';
import { Players } from '../models/Players';
import { EColors } from '../models/Colors';

interface BoardProps {
  board: Board;
  setBoard: (bord: Board) => void;
  swapPlayer: () => void;
  currentPlayer: Players | null;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  swapPlayer,
  currentPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else if (selectedCell && selectedCell === cell) {
      setSelectedCell(null);
    } else {
      if (currentPlayer?.color === cell.figure?.color) {
        setSelectedCell(cell);
      }
    }
  }

  function isSelected(cell: Cell) {
    return cell.x === selectedCell?.x && cell.y === selectedCell?.y;
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  return (
    <div>
      <h1 className='game-title'>Шахматы</h1>
      <h3 className='player-title'>
        Текущий игрок:{' '}
        {currentPlayer?.color === EColors.WHITE ? 'БЕЛЫЙ' : 'ЧЕРНЫЙ'}
      </h3>

      <div className='board'>
        {/* ROWS */}
        {board.cells.map((row, index) => (
          <Fragment key={index}>
            {/* COLUMNS */}
            {row.map((cell) => (
              <CellComponent
                cell={cell}
                key={cell.id}
                click={click}
                selected={isSelected(cell)}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
