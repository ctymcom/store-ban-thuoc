import Axios from "axios";
import { compact, get, groupBy, keyBy } from "lodash";
import moment from "moment-timezone";
import FormData from "form-data";

import { configs } from "../../configs";
import { INotification } from "../../graphql/modules/notification/notification.model";
import { IProduct } from "../../graphql/modules/product/product.model";
import { IProductTab } from "../../graphql/modules/productTab/productTab.model";
import { IProductTag } from "../../graphql/modules/productTag/productTag.model";
import { IUserAddress } from "../../graphql/modules/userAddress/userAddress.model";
import { CacheHelper } from "../cache.helper";
import { AritoUser } from "./types/aritoUser.type";
import { IPromotion } from "../../graphql/modules/promotion/promotion.model";
import { IAritoOption } from "../../graphql/modules/aritoOption/aritoOption.model";
import { IOrderStatus } from "../../graphql/modules/orderStatus/orderStatus.model";

export class AritoHelper {
  static host: string = configs.arito.host;
  static clientId: string = configs.arito.clientId;
  static get imageToken() {
    return CacheHelper.get("arito-image-token");
  }
  static handleError(res) {
    if (get(res, "data.code") && get(res, "data.code") != 200) {
      throw Error(get(res, "data.msg"));
    }
  }
  static async setImageToken() {
    return Axios.post(`${this.host}/GetToken`, { ClientID: "KHOTHUOCSI" }).then((res) => {
      this.handleError(res);
      CacheHelper.set("arito-image-token", res.data.value);
    });
  }
  static getImageLink(imageId: string) {
    return `${this.host}/GetImageFile350/${imageId}/${this.imageToken}`;
  }
  static getAvatarLink(imageId: string) {
    return `${this.host}/DownloadFile0/${imageId}/${this.imageToken}`;
  }
  static getThumbnailLink(imageId: string) {
    return `${this.host}/DownloadFile1/${imageId}/${this.imageToken}`;
  }
  static getAllCategory(type: string, page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/Item/GetItemGroup`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["ma_loai_nh", "C", type], // Mã loại nhóm của sản phẩm, gồm VT1, VT2, VT3
        ["ma_nh", "C", ""], // Nhóm sản phẩm, có thể để trắng
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          type: d["ma_loai_nh"],
          code: d["ma_nh"],
          name: d["ten_nh"],
        })) as { type: string; code: string; name: string }[],
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      };
    });
  }
  static getAllIngredient(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/List/GetIngredient`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["ma_hc", "C", ""],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          code: d["ma_hc"],
          name: d["ten_hc"],
        })) as { code: string; name: string }[],
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      };
    });
  }
  static getAllProduct(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/Item/GetList`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      const imageData = keyBy(get(res.data, "data.images", []), "ma_vt");
      const priceGroupData = groupBy(
        get(res.data, "data.groupprice", []).map((g) => ({
          productCode: g["ma_vt"],
          customerGroup: g["nh_khg"],
          expiredAt: g["ngay_hl"] ? moment(g["ngay_hl"]).toDate() : null,
          basePrice: g["gia_truoc_ck"],
          salePrice: g["gia_ban"],
          saleRate: g["tl_ck"],
        })),
        "productCode"
      );
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          code: d["ma_vt"],
          name: d["ten_vt"],
          categoryIds: compact([d["nh_vt3"], d["nh_vt2"], d["nh_vt1"]]),
          barcode: d["ma_barcode"],
          origin: d["nuoc_sx"],
          ingredientIds: compact(d["ma_hc"].split(",")),
          packing: d["quy_cach"],
          dosageForms: d["dang_bao"],
          antibiotic: d["khang_sinh"],
          uses: d["cong_dung"],
          indications: d["chi_dinh"],
          howToUse: d["cach_dung"],
          contraindicated: d["chong_cd"],
          interactions: d["tuong_tac"],
          sideEffects: d["td_phu"],
          careful: d["than_trong"],
          overdose: d["qua_lieu"],
          preservation: d["bao_quan"],
          volume: d["the_tich"] || 0,
          weight: d["khoi_luong"] || 0,
          color: d["mau_sac"],
          size: d["kich_co"],
          unitCode: d["dvt"],
          unit: d["ten_dvt"],
          description: d["mo_ta"],
          byt: d["sp_byt"],
          imageId: get(imageData, d["ma_vt"], {})["image_id"],
          basePrice: d["gia_truoc_ck"],
          salePrice: d["gia_ban"],
          saleRate: d["tl_ck"],
          saleExpiredDate: d["ngay_hl"] ? moment(d["ngay_hl"]).toDate() : null,
          tags: compact(get(d, "tags", "").split(",")).map((t: string) => t.trim()),
          priceGroups: get(priceGroupData, d["ma_vt"], []),
          outOfDate: d["ngay_can_date"] ? moment(d["ngay_can_date"]).toDate() : null,
          __data: d,
        })) as IProduct[],
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      };
    });
  }
  static login({
    language = "v",
    ...params
  }: {
    username: string;
    password: string;
    deviceId: string;
    deviceToken: string;
    deviceModel: string;
    deviceName: string;
    deviceBrand: string;
    deviceOsVersion: string;
    language?: string;
  }) {
    return Axios.post(`${this.host}/Login`, {
      ClientID: this.clientId,
      Language: language,
      UserName: params.username,
      Password: params.password,
      memvars: [
        ["deviceId", "C", params.deviceId],
        ["deviceToken", "C", params.deviceToken],
        ["model", "C", params.deviceModel],
        ["deviceName", "C", params.deviceName],
        ["brand", "C", params.deviceBrand],
        ["osVersion", "C", params.deviceOsVersion],
      ],
    }).then((res) => {
      this.handleError(res);
      const userData = get(res.data, "data.userinfo.0", {});
      return {
        token: get(res.data, "value"),
        user: {
          id: userData["user_id"],
          username: userData["username"],
          admin: userData["admin"],
          nickname: userData["nickname"],
          userRef: userData["user_ref"],
          unitId: userData["unit_id"],
          imageId: userData["image_id"],
          locationId: userData["location_id"],
          devId: userData["dev_id"],
          language: userData["language"],
          country: userData["country"],
          email: userData["e_mail"],
          phone: userData["phone"],
          birthday: userData["birthday"],
          datetime2: userData["datetime2"],
          timeout: userData["timeout"],
          permission: get(res.data, "data.permission.0.permission"),
          group: get(res.data, "data.permission.0.user_group"),
          companyName: userData["company_name"],
          companyType: userData["company_type"],
        } as AritoUser,
      };
    });
  }
  static getItemContainer() {
    return Axios.post(`${this.host}/Item/GetItemContainer`, {
      token: this.imageToken,
      memvars: [["datetime2", "DT", "2020-02-15 16:53:00"]],
    }).then((res) => {
      this.handleError(res);
      return get(res.data, "data.master", []).map((master: any) => ({
        id: master["id"],
        name: master["name"],
        name2: master["name2"],
        note: master["note"],
        products: get(res.data, "data.detail", [])
          .filter((detail: any) => detail["id"] == master["id"])
          .map((d: any) => d["ma_vt"]),
      })) as { id: string; name: string; name2: string; note: string; products: string[] }[];
    });
  }
  static getTabInfo(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/Item/GetTabInfo`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          code: d["id"],
          name: d["name"],
          name2: d["name2"],
          productField: d["cfield"],
        })) as IProductTab[],
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      };
    });
  }
  static getAllProvince(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/List/GetProvince`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          id: d["ma_tinh"],
          name: d["ten_tinh"],
        })) as { id: string; name: string }[],
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      };
    });
  }
  static getAllDistrict(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/List/GetDistrict`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          id: d["ma_quan"],
          name: d["ten_quan"],
          provinceId: d["ma_tinh"],
        })) as { id: string; name: string; provinceId: string }[],
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      };
    });
  }
  static getAllWard(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/List/GetWard`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          id: d["ma_xp"],
          name: d["ten_xp"],
          provinceId: d["ma_tinh"],
          districtId: d["ma_quan"],
        })) as { id: string; name: string; provinceId: string; districtId: string }[],
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      };
    });
  }
  static register({
    nickname,
    email,
    phone,
    language = "v",
    ...device
  }: {
    nickname: string;
    email: string;
    phone: string;
    deviceId: string;
    deviceToken: string;
    deviceModel: string;
    deviceName: string;
    deviceBrand: string;
    deviceOsVersion: string;
    language?: string;
  }) {
    return Axios.post(`${this.host}/Authorize/Register`, {
      token: this.imageToken,
      memvars: [
        ["nickname", "C", nickname],
        ["e_mail", "C", email],
        ["phone", "C", phone],
      ],
    }).then((res) => {
      this.handleError(res);

      const password = get(res.data, "data.message.0.val");
      return this.login({
        username: email,
        password: password,
        language: language,
        ...device,
      });
    });
  }
  static getAllTag(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/Item/GetTagList`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          code: d["tag_code"],
          name: d["tag_name"],
          name2: d["tag_name2"],
          color: d["tag_color"],
          icon: d["icon"],
          position: d["stt"],
          showFilter: d["show_filter"] == 1,
        })) as IProductTag[],
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      };
    });
  }
  static async getUserAddress(userId: string) {
    return Axios.post(`${this.host}/List/GetUserAddress`, {
      token: this.imageToken,
      memvars: [
        ["user_id", "I", userId], //Không được = 0, lấy từ API Login
        ["pageIndex", "I", 1],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          userId: userId,
          addressId: d["ma_dc"],
          fullAddress: d["ten_dc"],
          contactName: d["lien_he"],
          address: d["so_nha"],
          provinceId: d["ma_tinh"],
          districtId: d["ma_quan"],
          wardId: d["ma_xp"],
          phone: d["dien_thoai"],
          location: d["toa_do"],
          isDefault: d["phan_loai"] == 1,
        })) as IUserAddress[],
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      };
    });
  }
  static async createUserAddress(address: IUserAddress) {
    return Axios.post(`${this.host}/List/UpdateUserAddress`, {
      token: this.imageToken,
      data: {
        "#detail": [
          {
            ma_dc: "", //Nếu mã địa chỉ trắng, Arito sẽ nhận diện là trường hợp thêm mới địa chỉ
            ten_dc: address.fullAddress || "",
            user_id: parseInt(address.userId),
            lien_he: address.contactName || "",
            so_nha: address.address || "",
            ma_tinh: address.provinceId || "", //Lay tu API GetProvince
            ma_quan: address.districtId || "", // GetDistrict
            ma_xp: address.wardId || "", //GetWard
            dien_thoai: address.phone || "",
            toa_do: address.location || "", //Tọa độ của Google map
            phan_loai: address.isDefault ? 1 : 0, // 0: Chưa phân loại, 1: địa chỉ mặc định
          },
        ],
      },
    }).then((res) => {
      this.handleError(res);
    });
  }
  static async updateUserAddress(address: IUserAddress) {
    return Axios.post(`${this.host}/List/UpdateUserAddress`, {
      token: this.imageToken,
      data: {
        "#detail": [
          {
            ma_dc: address.addressId, //Nếu mã địa chỉ trắng, Arito sẽ nhận diện là trường hợp thêm mới địa chỉ
            ten_dc: address.fullAddress || "",
            user_id: parseInt(address.userId),
            lien_he: address.contactName || "",
            so_nha: address.address || "",
            ma_tinh: address.provinceId || "", //Lay tu API GetProvince
            ma_quan: address.districtId || "", // GetDistrict
            ma_xp: address.wardId || "", //GetWard
            dien_thoai: address.phone || "",
            toa_do: address.location || "", //Tọa độ của Google map
            phan_loai: address.isDefault ? 1 : 0, // 0: Chưa phân loại, 1: địa chỉ mặc định
          },
        ],
      },
    }).then((res) => {
      this.handleError(res);
    });
  }
  static async deleteUserAddress(addressId: string) {
    return Axios.post(`${this.host}/List/DeleteUserAddress`, {
      token: this.imageToken,
      memvars: [
        ["ma_dc", "C", addressId], //Xóa địa chỉ dựa theo mã, lấy được từ API GetUserAddress
      ],
    }).then((res) => {
      this.handleError(res);
    });
  }
  static getAllUserNotify(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/Notification/GetMessageUsers`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          userId: d["user_id"],
          code: d["id"],
          title: d["title"],
          content: d["content"],
          link: d["link"],
        })) as INotification[],
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      };
    });
  }
  static uploadUserAvatar(userId: string, stream: any, token: string) {
    var data = new FormData();
    data.append("file", stream);
    return Axios({
      url: `${this.host}/UploadFile/SysUser/${userId}/${token}`,
      method: "POST",
      data: data,
      headers: {
        ...data.getHeaders(),
      },
    }).then((res) => {
      this.handleError(res);
      return get(res.data, "value");
    });
  }
  static getAllPromotion(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/Item/GetPromotion`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          code: d["ma_ck"],
          name: d["ten_ck"],
          description: d["ghi_chu"],
        })) as IPromotion[],
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      };
    });
  }
  static getAllOptions(page: number = 1) {
    return Axios.post(`${this.host}/Item/GetOptions`, {
      token: this.imageToken,
      memvars: [["pageIndex", "I", page]],
    }).then((res) => {
      this.handleError(res);
      return get(res.data, "data.data", []).map((d: any) => ({
        code: d["name"],
        name: d["descript"],
        name2: d["descript2"],
        value: d["val"],
      })) as IAritoOption[];
    });
  }
  static getOrderStatus() {
    return Axios.post(`${this.host}/Voucher/GetOrderStatus`, {
      token: this.imageToken,
    }).then((res) => {
      this.handleError(res);
      return get(res.data, "data.data", []).map((d: any) => ({
        code: d["ma_ttct"],
        name: d["ten_ttct"],
        name2: d["ten_ttct2"],
        position: d["stt"],
      })) as IOrderStatus[];
    });
  }
  static updateUserProfile({ nickname, phone, birthday, companyType, companyName }, token: string) {
    return Axios.post(`${this.host}/Authorize/UpdateUserInfo`, {
      token: token,
      memvars: [
        ["nickname", "C", nickname], // Ten day du
        ["phone", "C", phone], // Dt
        ["birthday", "D", birthday ? moment(birthday).format("YYYYMMDD") : ""], // Ngay sinh
        ["company_type", "I", companyType], // Loai cua hang 1. Phòng khám, 2. Nhà thuốc, 3. Trình dược viên
        ["company_name", "C", companyName], // Tên cửa hàng
      ],
    }).then((res) => {
      this.handleError(res);
      return this.getUserProfile(token);
    });
  }
  static getUserProfile(token: string) {
    return Axios.post(`${this.host}/Authorize/GetUserInfo`, { token }).then((res) => {
      this.handleError(res);
      const userData = get(res.data, "data.userinfo.0", {});
      return {
        id: userData["user_id"],
        username: userData["username"],
        admin: userData["admin"],
        nickname: userData["nickname"],
        userRef: userData["user_ref"],
        unitId: userData["unit_id"],
        imageId: userData["image_id"],
        locationId: userData["location_id"],
        devId: userData["dev_id"],
        language: userData["language"],
        country: userData["country"],
        email: userData["e_mail"],
        phone: userData["phone"],
        birthday: userData["birthday"],
        datetime2: userData["datetime2"],
        timeout: userData["timeout"],
        permission: get(res.data, "data.permission.0.permission"),
        group: get(res.data, "data.permission.0.user_group"),
        companyName: userData["company_name"],
        companyType: userData["company_type"],
      } as AritoUser;
    });
  }
}

AritoHelper.setImageToken();
