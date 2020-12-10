import { BaseRoute, Request, Response, NextFunction } from "../../base/baseRoute";
import { ErrorHelper } from "../../base/error";
import { FormHelper } from "../../graphql/modules/form/form.helper";
import { FormModel } from "../../graphql/modules/form/form.model";
import { JimpHelper } from "../../helpers/jimp.helper";
class FormRoute extends BaseRoute {
  constructor() {
    super();
  }

  customRouting() {
    this.router.get("/:id/qrcode", this.route(this.getFormQRCode));
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
