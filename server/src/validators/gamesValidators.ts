import { z } from "zod";

export class GamesValidator {
  static create = z.object({
    ownerId: z.string(),
  });

  static findById = z.object({
    id: z.string(),
  });
}
