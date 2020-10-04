import { ModelCtor, Sequelize, Model } from 'sequelize';
import { homedir } from 'os';

import Logger from './logger';

import * as entities from './entities';
import * as models from './models';

export default class Database {
  static get instance() {
    if (!this._instance) {
      this._instance = new Database();
    }

    return this._instance;
  }
  private static _instance: Database;

  private _sequalize: Sequelize;
  private readonly _logger = new Logger('Database');

  get clients() { return this._clients; }
  private _clients: ModelCtor<Model<models.IClient>>;

  private constructor() { }

  async start() {
    try {
      this._sequalize = new Sequelize({
        dialect: 'sqlite',
        storage: `${homedir()}/Redis-X/redis-x.sqlite`,
        logging: false,
      });

      this._sequalize.authenticate();

      this._clients = entities.defineClientsEntity(this._sequalize, this._logger);

      this._sequalize.sync();

      this._logger.info('connected');
    } catch (e) {
      this._logger.error('failed to connect');
    }
  }
}
