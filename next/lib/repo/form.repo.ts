import { GraphRepository } from "../graphql/graph-repository";
import { IForm } from "../../../src/graphql/modules/form/form.model";

export class FormRepository extends GraphRepository<IForm> {
  shortFragment: string = `id name code title redirectLink fields {
    key
    label
    placeholder
    type
    required
    default
    options
    districtKey
    wardKey
    requiredDistrict
    requiredWard
    districtLabel
    wardLabel
  }`;
  fullFragment: string = "id name code title fields redirectLink";
  apiName: string = "Form";
}
