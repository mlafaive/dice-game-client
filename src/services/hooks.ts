import { useState, useEffect } from 'react';
import { Game, Player, getGame } from '../services/api';
import { GamePollingInterval } from '../constants';
import useCookie, { updateItem } from 'react-use-cookie';

export function useGame(id: string): [Game | undefined, (newGame?: Game) => void] {
  const [game, setGame] = useState<Game | undefined>();

  useEffect(() => {
    let mounted = true;

    async function pollForGame(): Promise<void> {
      if (!mounted) {
        return;
      }
      
      setGame(await getGame(id));
      setTimeout(pollForGame, GamePollingInterval);
    }

    setGame(undefined);
    pollForGame();

    return () => {
      mounted = false;
    };
  }, [id]);

  return [game, setGame];
}

export function usePlayerId(gameId: string): [string, (newPlayerId: string) => void] {
  const [playerId, setPlayerIdCookie] = useCookie('playerId', '');

  const setPlayerId = (newPlayerId: string) => setPlayerIdCookie(newPlayerId, {
    path: `/games/${gameId}`
  });

  return [playerId, setPlayerId];
}