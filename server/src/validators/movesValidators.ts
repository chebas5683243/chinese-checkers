import { z } from "zod";

export class MovesValidator {
  static create = z.object({
    from: z.number(),
    to: z.number(),
    gameId: z.string(),
  });
}
