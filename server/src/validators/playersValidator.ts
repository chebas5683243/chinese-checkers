import {z} from "zod";

export class PlayersValidator {
  static create = z.object({
    name: z.string()
  });

  static findById = z.object({
    id: z.string()
  });

  static update = z.object({
    id: z.string(),
    name: z.string()
  });
}