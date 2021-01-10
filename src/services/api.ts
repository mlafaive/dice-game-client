import { DieColor, DieStatus, GameStatus, ApiBasePath, USMapNodeId } from '../constants';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: ApiBasePath,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  ({ data }) => data,
  (error) => Promise.reject(error),
);

export interface PlayerMapNode {
  id: USMapNodeId;
  value: number;
  isGuarded: boolean;
  isXed: boolean;
}

export interface Die extends Document {
  _id: string;
  color: DieColor;
  status: DieStatus;
  value: number;
}

export interface Player {
  _id: string;
  name: string;
  dupesRemaining: number;
  colorChangesRemaining: number;
  guardsRemaining: number;
  playerMapNodes: PlayerMapNode[];
  hasCompletedMove: boolean;
}

export interface Game {
  _id: string;
  name: string;
  dice: Die[];
  status: GameStatus;
  round: number;
  rollsRemainingInRound: number;
  currentRoller: number;
  players: Player[];
}

export interface PlayerMove {
  mapNodeId: USMapNodeId;
  dieId: string;
  isXed?: boolean;
  isGuarded?: boolean;
  isColorChanged?: boolean;
  isDuped?: boolean;
  dupeMoveNodeId?: USMapNodeId;
}

export async function getGame(gameId: string): Promise<Game> {
  return axiosInstance.get<any, Game>(`/games/${gameId}`);
}

export async function createGame(gameName: string, playerName: string): Promise<Game> {
  return axiosInstance.post<any, Game>(`/games`, { gameName, playerName });
}

export async function createPlayer(gameId: string, playerName: string): Promise<Game> {
  return axiosInstance.post<any, Game>(`/games/${gameId}/players`, { playerName });
}

export async function makePlayerMove(
  gameId: string, playerMoves: PlayerMove[]
): Promise<Game> {
  return axiosInstance.patch<any, Game>(
    `/games/${gameId}/move`,
    { playerMoves },
  );
}

export async function startGame(gameId: string): Promise<Game> {
  return axiosInstance.post<any, Game>(`/games/${gameId}/start`);
}

export async function rollDice(gameId: string): Promise<Game> {
  return axiosInstance.post<any, Game>(`/games/${gameId}/roll`);
}