import { z } from "zod";

export class GamesValidator {
  static create = z.object({
    ownerId: z.string(),
  });

  static findById = z.object({
    id: z.string(),
  });

  static update = z
    .object({
      id: z.string(),
      guestId: z.string().nullish(),
      status: z.string().optional(),
    })
    .transform((data) => ({
      ...data,
      guestId: data.guestId,
    }));

  static getMoves = z.object({
    id: z.string(),
  });
}
