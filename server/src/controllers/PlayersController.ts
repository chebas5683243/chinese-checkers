import { Player } from "../domain/Player";
import { PlayersService } from "../services/PlayersService";
import { BaseController, BaseControllerProps } from "./BaseController";
import express from 'express';

export interface PlayersControllerProps extends BaseControllerProps {
  service: PlayersService
}

export class PlayersController extends BaseController {
  constructor(protected props: PlayersControllerProps) {
    super(props);
  }

  async create(req: express.Request, res: express.Response) {
    try {
      const player = Player.instanceFor("create", req.body);
      const response = await this.props.service.create(player);
      res.status(201).json(response);
    } catch (error) {
      throw error;
    }
  }

  async findById(req: express.Request, res: express.Response) {
    try {
      const player = Player.instanceFor("findById", {
        id: req.params.playerId
      });
      const response = await this.props.service.findById(player);
      res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  async update(req: express.Request, res: express.Response) {
    try {
      const player = Player.instanceFor("update", {
        id: req.params.playerId,
        name: req.body.name
      });
      const response = await this.props.service.update(player);
      res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }
}