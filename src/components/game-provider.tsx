import React, { ReactNode, createContext, useContext } from 'react';
import {
  Game,
  Player,
  PlayerMove,
  createPlayer,
  makePlayerMove,
  startGame,
  rollDice,
} from '../services/api';
import { useParams } from 'react-router-dom';
import { useGame, usePlayerId } from '../services/hooks';
import LoadingScreen from './loading-screen';

export interface GameContext {
  game: Game;
  player?: Player;
  createPlayer(playerName: string): Promise<void>;
  makePlayerMove(playerMoves: PlayerMove[]): Promise<void>;
  startGame(): Promise<void>;
  rollDice(): Promise<void>;
}

const GameContextInstance = createContext<GameContext | undefined>(undefined);

function setGameContextWrapper<T extends any[]>(
  func: (gameId: string, ...args: T) => Promise<Game>, 
  game: Game,
  setGame: (game: Game) => void,
): (...args: T) => Promise<void> {
  return async (...args: T) => setGame(await func(game._id, ...args));
}

function createPlayerContextWrapper(
  game: Game,
  setGame: (game: Game) => void,
  setPlayerId: (newPlayerId: string) => void
): (playerName: string) => Promise<void> {
  return async (playerName: string) => {
    const newGame = await createPlayer(game._id, playerName);
    const newPlayer = newGame.players[newGame.players.length - 1];

    setPlayerId(newPlayer._id);
    setGame(newGame);
  }
}

function createGameContext(
  game: Game | undefined,
  setGame: (newGame?: Game) => void,

  playerId: string,
  setPlayerId: (newPlayerId: string) => void,
): GameContext | undefined {
  if (!game) {
    return;
  }

  return {
    game,
    player: game.players.find(({ _id }) => _id === playerId),
    createPlayer: createPlayerContextWrapper(game, setGame, setPlayerId),
    makePlayerMove: setGameContextWrapper(makePlayerMove, game, setGame),
    startGame: setGameContextWrapper(startGame, game, setGame),
    rollDice: setGameContextWrapper(rollDice, game, setGame),
  }
}

export interface GameProviderProps {
  children?: ReactNode;
}

export function useGameContext(): GameContext {
  const context = useContext(GameContextInstance);

  if (!context) {
    throw new Error('must only use context inside of game provider');
  }

  return context;
}

export default function GameProvider({ children }: GameProviderProps) {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useGame(gameId);
  const [playerId, setPlayerId] = usePlayerId(gameId);
  const context = createGameContext(game, setGame, playerId, setPlayerId);

  return (
    <GameContextInstance.Provider value={context}>
      {!!context ? children : <LoadingScreen />}
    </GameContextInstance.Provider>
  );
}