import { GraphRepository } from "../graphql/graph-repository";
import { IForm } from "../../../src/graphql/modules/form/form.model";

export class FormRepository extends GraphRepository<IForm> {
  shortFragment: string = `id name code title redirectLink submitLink
  fields {
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
  }`; // getAll
  fullFragment: string = this.shortFragment;
  apiName: string = "Form";
}
