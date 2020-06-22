import { sequelize, Sequelize } from "./baseModel";

export class BaseService {
  constructor() {}

  async transaction(options?: Sequelize.TransactionOptions) {
    return await sequelize.transaction(options);
  }
}
