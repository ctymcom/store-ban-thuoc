import Excel from "exceljs";
import { get } from "lodash";
import moment from "moment-timezone";

import { BaseRoute, Request, Response } from "../../base/baseRoute";
import { ErrorHelper } from "../../base/error";
import { ROLES } from "../../constants/role.const";
import { Context } from "../../graphql/context";
import { FormHelper } from "../../graphql/modules/form/form.helper";
import { FormModel } from "../../graphql/modules/form/form.model";
import { FormDataModel } from "../../graphql/modules/formData/formData.model";
import { UtilsHelper } from "../../helpers";
import { JimpHelper } from "../../helpers/jimp.helper";
import { AuthMiddleware } from "../auth.midd";

class FormRoute extends BaseRoute {
  constructor() {
    super();
  }

  customRouting() {
    this.router.get("/:id/qrcode", this.route(this.getFormQRCode));
    this.router.get("/:id/export", [AuthMiddleware], this.route(this.getFormData));
  }
  async getFormData(req: Request, res: Response) {
    const context = get(req as any, "context") as Context;
    context.auth(ROLES.ADMIN_EDITOR);
    const { id } = req.params;
    const form = await FormModel.findById(id);
    if (!form) throw ErrorHelper.mgRecoredNotFound("Biểu mẫu");
    const formData = await FormDataModel.find({ formId: id });
    if (formData.length == 0) throw ErrorHelper.requestDataInvalid("Chưa có dữ liệu");
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet("Lịch sử ví kết nối");
    sheet.addRow(["Thời gian", "IP", ...form.fields.map((f) => f.label)]);
    formData.forEach((item) => {
      sheet.addRow([
        moment(item.createdAt).format("YYYY/MM/DD HH:mm:ss"),
        item.ip,
        ...form.fields.map((f) => item.data && item.data[f.key]),
      ]);
    });

    return UtilsHelper.responseExcel(res, workbook, `data ${moment().format("YYYY-MM-DD")}`);
  }
  async getFormQRCode(req: Request, res: Response) {
    const { id } = req.params;
    const form = await FormModel.findById(id);
    if (!form) throw ErrorHelper.mgRecoredNotFound("Biểu mẫu");

    const submitLink = new FormHelper(form).getSubmitLink();
    Promise.all([JimpHelper.getQRImage(submitLink)]).then((result) => {
      const [qrImage] = result;
      qrImage.getBuffer("image/png", (err: any, buffer: any) => {
        res.writeHead(200, {
          "Content-Type": "image/png",
          "Content-Length": buffer.length,
        });
        res.end(buffer);
      });
    });
  }
}

export default new FormRoute().router;
