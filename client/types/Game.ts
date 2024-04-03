import { Player } from "./Player";

export enum GameStatus {
  WAITING = "WAITING",
  PLAYING = "PLAYING",
  FINISHED = "FINISHED",
  CLOSED = "CLOSED",
}

export interface Game {
  id: string;
  status: GameStatus;
  ownerId: string;
  owner: Player;
  guestId?: string | null;
  guest?: Player;
}
