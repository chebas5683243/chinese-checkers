import { RequestHandlerArgs } from ".";
import { Game } from "../domain/Game";
import { GamesService } from "../services/GameService";
import { BaseController, BaseControllerProps } from "./BaseController";

export interface GamesControllerProps extends BaseControllerProps {
  service: GamesService;
}

export class GamesController extends BaseController {
  constructor(protected props: GamesControllerProps) {
    super(props);
  }

  async create(context: RequestHandlerArgs) {
    try {
      const game = Game.instanceFor("create", context.req.body);
      const response = await this.props.service.create(game);
      context.res.status(201).json(response);
    } catch (error) {
      context.next(error);
    }
  }

  async findById(context: RequestHandlerArgs) {
    try {
      const game = Game.instanceFor("findById", {
        id: context.req.params.gameId,
      });
      const response = await this.props.service.findById(game);
      context.res.status(200).json(response);
    } catch (error) {
      context.next(error);
    }
  }

  async update(context: RequestHandlerArgs) {
    try {
      const game = Game.instanceFor("update", {
        id: context.req.params.gameId,
        ...context.req.body,
      });
      const response = await this.props.service.update(game);
      context.res.status(200).json(response);
    } catch (error) {
      context.next(error);
    }
  }
}
