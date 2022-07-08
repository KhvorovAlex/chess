import React, { useEffect, useState } from 'react';
import BoardComponent from './BoardComponent';
import { Board } from '../models/Board';
import { Players } from '../models/Players';
import { EColors } from '../models/Colors';
import LostFiguresComponent from './LostFiguresComponent';
import Timer from './Timer';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer] = useState(new Players(EColors.WHITE));
  const [blackPlayer] = useState(new Players(EColors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Players | null>(null);

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigure();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === EColors.WHITE ? blackPlayer : whitePlayer,
    );
  }

  return (
    <div className='app'>
      <div className='wrapper'>
        <Timer currentPlayer={currentPlayer} restart={restart} />

        <LostFiguresComponent color='black' figures={board.lostBlackFigures} />

        <BoardComponent
          board={board}
          setBoard={setBoard}
          swapPlayer={swapPlayer}
          currentPlayer={currentPlayer}
        />

        <LostFiguresComponent color='white' figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
}

export default App;
