import { DataTypes, Sequelize, Model } from 'sequelize';

import Logger from '../logger';

import { ILog } from '../models/log.model';
import { LogLevel } from '../enums/log-level.enum';

export function defineLogsEntity(sequelize: Sequelize, logger: Logger) {
  logger.info('initializing...', 'Logs');

  return sequelize.define<Model<ILog>>('Logs', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    level: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [
        LogLevel.Info,
        LogLevel.Warn,
        LogLevel.Error,
      ],
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}
