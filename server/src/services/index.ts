import { playersRepo } from '../repositories';
import { PlayerServiceImpl } from './PlayerServiceImpl';

export const playerService = new PlayerServiceImpl({
  playersRepo,
  config: {}
});