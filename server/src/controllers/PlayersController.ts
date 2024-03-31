import { RequestHandlerArgs } from ".";
import { Player } from "../domain/Player";
import { PlayersService } from "../services/PlayersService";
import { BaseController, BaseControllerProps } from "./BaseController";
import express from "express";

export interface PlayersControllerProps extends BaseControllerProps {
  service: PlayersService;
}

export class PlayersController extends BaseController {
  constructor(protected props: PlayersControllerProps) {
    super(props);
  }

  async create(context: RequestHandlerArgs) {
    try {
      const player = Player.instanceFor("create", context.req.body);
      const response = await this.props.service.create(player);
      context.res.status(201).json(response);
    } catch (error) {
      context.next(error);
    }
  }

  async findById(context: RequestHandlerArgs) {
    try {
      const player = Player.instanceFor("findById", {
        id: context.req.params.playerId,
      });
      const response = await this.props.service.findById(player);
      context.res.status(200).json(response);
    } catch (error) {
      context.next(error);
    }
  }

  async update(context: RequestHandlerArgs) {
    try {
      const player = Player.instanceFor("update", {
        id: context.req.params.playerId,
        name: context.req.body.name,
      });
      const response = await this.props.service.update(player);
      context.res.status(200).json(response);
    } catch (error) {
      context.next(error);
    }
  }
}
