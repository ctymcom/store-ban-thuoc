import dotenv from 'dotenv';
import express from 'express';
// import Raven from 'raven';

// import { config } from '..';

dotenv.config();

// let sentry: Raven.Client;
// if (config.enableSentry) {
//   if (!process.env.SENTRY_CONNECTSTRING) throw new Error('Missing config SENTRY_CONNECTSTRING');
//   sentry = Raven.config(process.env.SENTRY_CONNECTSTRING).install();
// }

export interface IErrorInfo {
  status: number;
  code: string;
  message: string;
  data?: any;
}

export class BaseError extends Error {
  constructor(status: number, code: string, message: string, data?: any) {
    super(message);
    this.info = { status, code, message, data };
  }
  info: IErrorInfo;
}
export class BaseErrorHelper {
  static handleError(func: (req: express.Request, rep: express.Response) => Promise<any>) {
    return (req: express.Request, res: express.Response) =>
      func
        .bind(this)(req, res)
        .catch((error: any) => {
          if (!error.info) {
            const err = this.somethingWentWrong();
            res.status(err.info.status).json(err.info);
            this.logUnknowError(error);
          } else {
            res.status(error.info.status).json(error.info);
          }
        });
  }
  static logUnknowError(error: Error) {
    console.log('*** UNKNOW ERROR ***');
    console.log(error);
    console.log('********************');
    // if (sentry) {
    //   try {
    //     sentry.captureException(error);
    //   } catch (err) {
    //     console.log('*** CANNOT CAPTURE EXCEPTION TO SENTRY ***');
    //     console.log(err.message);
    //     console.log('******************************************');
    //   }
    // }
  }
  static logError(prefix: string, logOption = true) {
    return (error: any) => {
      console.log(prefix, error.message || error, logOption ? error.options : '');
    };
  }
  // Unknow
  static somethingWentWrong(message?: string) {
    return new BaseError(500, '500', message || 'Có lỗi xảy ra');
  }
  // Auth
  static unauthorized() {
    return new BaseError(401, '401', 'Chưa xác thực');
  }
  static badToken() {
    return new BaseError(401, '-1', 'Không có quyền truy cập');
  }
  static tokenExpired() {
    return new BaseError(401, '-2', 'Mã truy cập đã hết hạn');
  }
  static permissionDeny() {
    return new BaseError(405, '-3', 'Không đủ quyền để truy cập');
  }
  // Request
  static requestDataInvalid(message: string) {
    return new BaseError(403, '-4', 'Dữ liệu gửi lên không hợp lệ', message);
  }
  // External Request
  static externalRequestFailed(message: string) {
    return new BaseError(500, '-5', message);
  }
  // Mongo
  static mgRecoredNotFound(objectName: string = 'dữ liệu yêu cầu') {
    return new BaseError(404, '-7', 'Không tìm thấy ' + objectName);
  }
  static mgQueryFailed(message: string) {
    return new BaseError(403, '-8', message || 'Truy vấn không thành công');
  }
  static branchNotWorking() {
    return new BaseError(403, '-9', 'Chi nhánh không làm việc vào ngày này');
  }
  static recoredNotFound(message: string) {
    return new BaseError(404, '-10', `Không tìm thấy dữ liệu yêu cầu: ${message}`);
  }
}
