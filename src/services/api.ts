import { DieColor, DieStatus, GameStatus, ApiBasePath, USMapNodeId } from '../constants';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: ApiBasePath
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
  color: DieColor;
  status: DieStatus;
  value: number;
}

export interface Player {
  name: string;
  dupesRemaining: number;
  colorChangesRemaining: number;
  guardsRemaining: number;
  playerMapNodes: PlayerMapNode[];
  hasCompletedMove: boolean;
}

export interface Game {
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

export async function getGame(id: string): Promise<Game> {
  return axiosInstance.get<any, Game>(`/games/${id}`);
}

export async function createGame(gameName: string, playerName: string): Promise<Game> {
  return axiosInstance.post<any, Game>(`/games`, { gameName, playerName });
}

export async function createPlayer(gameId: string, playerName: string): Promise<Game> {
  return axiosInstance.post<any, Game>(`/players`, { gameId, playerName });
}

export async function makePlayerMove(
  gameId: string, playerId: string, playerMoves: PlayerMove[]
): Promise<Game> {
  return axiosInstance.patch<any, Game>(
    `/players/${playerId}`,
    { gameId, playerMoves },
  );
}

export async function startGame(id: string): Promise<Game> {
  return axiosInstance.post<any, Game>(`/games/${id}/start`);
}

export async function rollDice(gameId: string, playerId: string): Promise<Game> {
  return axiosInstance.post<any, Game>(`/games/${gameId}/roll`, { playerId });
}