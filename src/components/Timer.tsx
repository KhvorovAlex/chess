import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Players } from '../models/Players';
import { EColors } from '../models/Colors';

interface TimerProps {
  currentPlayer: Players | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTimer, setBlackTimer] = useState(300);
  const [whiteTimer, setWhiteTimer] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>();

  const startTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    if (blackTimer === 0 || whiteTimer === 0) {
      return;
    }

    const callback =
      currentPlayer?.color === EColors.BLACK
        ? decrementBlackTime
        : decrementWhiteTime;

    timer.current = setInterval(callback, 1000);
  }, [whiteTimer, blackTimer, currentPlayer]);

  function decrementBlackTime() {
    setBlackTimer((prev) => prev - 1);
  }

  function decrementWhiteTime() {
    setWhiteTimer((prev) => prev - 1);
  }

  function handleRestart() {
    restart();
    setBlackTimer(300);
    setWhiteTimer(300);
  }

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  return (
    <div className='timer'>
      <button onClick={handleRestart}>Restart</button>

      <div>Белый - {whiteTimer}</div>
      <div>Черный - {blackTimer}</div>
    </div>
  );
};

export default Timer;
