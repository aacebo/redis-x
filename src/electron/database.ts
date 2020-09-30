import { ModelCtor, Sequelize, Model } from 'sequelize';

import Logger from './logger';

import { IClient, defineClientModel } from './models/clients.model';

export default class Database {
  static get instance() {
    if (!this._instance) {
      this._instance = new Database();
    }

    return this._instance;
  }
  private static _instance: Database;

  private _sequalize: Sequelize;

  get clients() { return this._clients; }
  private _clients: ModelCtor<Model<IClient>>;

  private constructor() { }

  async start() {
    try {
      this._sequalize = new Sequelize({
        dialect: 'sqlite',
        storage: './redis-x.sqlite',
        logging: false,
      });

      this._sequalize.authenticate();

      this._clients = defineClientModel(this._sequalize);

      this._sequalize.sync();

      Logger.info('Database', 'connected');
    } catch (e) {
      Logger.error('Database', 'failed to connect');
    }
  }
}
