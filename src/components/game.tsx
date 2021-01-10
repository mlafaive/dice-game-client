import React from 'react';
import GameProvider, { useGameContext } from './game-provider';
import WaitingRoom from './waiting-room';
import JoinGame from './join-game';
import GamePlay from './game-play';
import Scoreboard from './scoreboard';
import { GameStatus } from '../constants';

function GameStateToggle() {
  const { game, player } = useGameContext();

  switch (game.status) {
    case GameStatus.New:
      return player ? <WaitingRoom /> : <JoinGame />;
    case GameStatus.Moving:
    case GameStatus.Rolling:
      return <GamePlay />;
    case GameStatus.Complete:
      return <Scoreboard />;
    default:
      throw new Error(`unknown game status "${game.status}"`);  
  }
}

export default function Game() {
  return (
    <GameProvider>
      <GameStateToggle />
    </GameProvider>
  );
}