import { DataTypes, Sequelize, Model } from 'sequelize';

import Logger from '../logger';

export interface IClient {
  readonly id: string;
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly password?: string;
}

export function defineClientModel(sequelize: Sequelize) {
  Logger.info('ClientModel', 'initializing...');

  return sequelize.define<Model<IClient>>('Clients', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    host: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    port: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
  });
}
