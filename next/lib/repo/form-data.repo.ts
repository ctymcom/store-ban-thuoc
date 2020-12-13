import { GraphRepository } from "../graphql/graph-repository";
import { IFormData } from "../../../src/graphql/modules/formData/formData.model";

export class FormDataRepository extends GraphRepository<IFormData> {
  shortFragment: string = "id";
  fullFragment: string = "id";
  apiName: string = "FormData";
}
