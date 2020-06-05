import { BaseErrorHelper, BaseError } from "../base/error";

export class ErrorHelper extends BaseErrorHelper {
  static userNotExist() {
    return new BaseError(403, "-103", "Người dùng không tồn tại");
  }
  static userExisted() {
    return new BaseError(403, "-104", "Người dùng đã tồn tại");
  }
  static userRoleNotSupported() {
    return new BaseError(401, "-105", "Người dùng không được cấp quyền");
  }
  static userError(message: string) {
    return new BaseError(403, "-106", "Lỗi người dùng: " + message);
  }
  static duplicateError(key: string) {
    return new BaseError(403, "-107", `${key} đã bị trùng.`);
  }
  static readOnlyError(key: string) {
    return new BaseError(403, "-108", `${key} chỉ được phép xem.`);
  }
  static createUserError(message: string) {
    return new BaseError(401, "-109", `Lỗi tạo người dùng: ${message}`);
  }
  static updateUserError(message: string) {
    return new BaseError(401, "-110", `Lỗi cập nhật người dùng: ${message}`);
  }
  static userPasswordNotCorrect() {
    return new BaseError(403, "-111", `Mật khẩu không đúng.`);
  }
  static farmerPinNotCorrect() {
    return new BaseError(403, "-112", `Mã pin không đúng`);
  }
  static deliveryStatusWrong() {
    return new BaseError(403, "-113", `Trạng thái đơn hàng không đúng`);
  }
  static notEnoughtPoint() {
    return new BaseError(403, "-114", "Tài khoản không đủ điểm");
  }
  static spinError(message: string) {
    return new BaseError(403, "-115", message);
  }
  static invalidPin() {
    return new BaseError(403, "-116", "Mã pin phải là 6 số");
  }
}
