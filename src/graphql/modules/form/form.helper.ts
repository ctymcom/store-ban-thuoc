import { configs } from "../../../configs";
import { IForm } from "./form.model";

export class FormHelper {
  constructor(public form: IForm) {}

  getSubmitLink() {
    return `${configs.domainName}/form/${this.form.code}`;
  }
}
