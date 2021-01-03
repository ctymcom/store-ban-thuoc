import { GraphRepository } from "../graphql/graph-repository";
import { IFormData } from "../../../src/graphql/modules/formData/formData.model";
import Axios from "axios";
import FileDownload from "js-file-download";
import { GetAuthToken } from "../graphql/auth.link";

export class FormDataRepository extends GraphRepository<IFormData> {
  shortFragment: string = "id ua ip data createdAt";
  fullFragment: string = "id ua ip data createdAt";
  apiName: string = "FormData";

  async export(formId: string) {
    Axios.get(`/api/form/${formId}/export`, {
      responseType: "blob",
      headers: { "x-token": GetAuthToken() },
    }).then((res) => {
      FileDownload(res.data, formId + ".xlsx");
    });
  }
}
