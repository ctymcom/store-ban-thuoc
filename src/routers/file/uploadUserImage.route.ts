import { Request, Response } from "express";
import fs from "fs";
import moment from "moment-timezone";
import { Types } from "mongoose";
import multer from "multer";

import { ROLES } from "../../constants/role.const";
import { Context } from "../../graphql/context";
import { AritoHelper } from "../../helpers/arito/arito.helper";

export default [
  {
    method: "post",
    path: "/api/file/uploadUserImage",
    midd: [
      multer({
        storage: multer.diskStorage({
          destination: "tmp",
          filename: (req, file, cb) => {
            cb(null, moment().format("YYYY-MM-DD-HH-mm-ss") + Types.ObjectId().toHexString());
          },
        }),
      }).single("data"),
    ],
    action: async (req: Request, res: Response) => {
      const context = new Context({ req });
      context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
      const stream = fs.createReadStream(req.file.path);
      const imageId = await AritoHelper.uploadUserAvatar(
        context.user.id.toString(),
        stream,
        context.tokenData.ref
      );
      fs.unlinkSync(req.file.path);
      return res.json({
        imageLink: AritoHelper.getThumbnailLink(imageId),
      });
    },
  },
];
