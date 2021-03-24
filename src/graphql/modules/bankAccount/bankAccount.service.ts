import { CrudService } from "../../../base/crudService";
import { BankAccountModel } from "./bankAccount.model";
class BankAccountService extends CrudService<typeof BankAccountModel> {
  constructor() {
    super(BankAccountModel);
  }
}

const bankAccountService = new BankAccountService();

export { bankAccountService };
