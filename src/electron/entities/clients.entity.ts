import { DataTypes, Sequelize, Model } from 'sequelize';

import Logger from '../logger';

import { IClient } from '../models/client.model';

export function defineClientsEntity(sequelize: Sequelize, logger: Logger) {
  logger.info('initializing...', 'ClientsEntity');

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
