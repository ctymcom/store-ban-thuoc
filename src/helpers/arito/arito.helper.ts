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
import { IDeliveryMethod } from "../../graphql/modules/deliveryMethod/deliveryMethod.model";
import { IPaymentMethod } from "../../graphql/modules/paymentMethod/paymentMethod.model";
import { IUserPointLog } from "../../graphql/modules/userPointLog/userPointLog.model";
import { IBankAccount } from "../../graphql/modules/bankAccount/bankAccount.model";

export class AritoHelper {
  static getAllDeletedProducts(page:number=1,updatedAt?:Date) {
    return Axios.post(`${this.host}/Item/GetDeletedItem`,{
      token:this.imageToken,
      memvars:[
        ["datetime2","DT",updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["pageIndex","I",page]
      ]
    }).then((res)=>{
      this.handleError(res);
      const pageInfo = get(res,"data.pageInfo.0",{})
      
      
      return {
        code: get(res.data, "data.data.ma_vt", []),
        paging: {
          limit: pageInfo["pagecount"] || 0,
          page: pageInfo["page"] || 1,
          total: pageInfo["t_record"] || 0,
          pageCount: pageInfo["t_page"] || 0,
          group: pageInfo["group"],
        },
      }
    })
  }
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
  static getImageLink(imageId: string, size: 200 | 350 | 576 | 1024 = 350) {
    return `${this.host}/GetImageFile${size}/${imageId}/${this.imageToken}`;
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
        note: master["ghi_chu"],
        tagCode: master["tag_code"],
        position: master["stt"],
        products: get(res.data, "data.detail", [])
          .filter((detail: any) => detail["id"] == master["id"])
          .map((d: any) => d["ma_vt"]),
      })) as {
        id: string;
        name: string;
        name2: string;
        note: string;
        tagCode: string;
        position: number;
        products: string[];
      }[];
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
  static getAllBankAccount(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/List/GetBankAccount`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res,"data.pageInfo.0",{})
      return {
        data: get(res.data, "data.data", []).map((d: any) => ({
          unitID: d["unit_id"],
          account: d["tk"],
          bankAccount: d["tknh"],
          accountOwner: d["chu_tk"],
          bankName: d["ten_nh"],
          bankName2: d["ten_nh2"],
          province: d["tinh_thanh"],
          phone: d["phone"],
          fax: d["fax"],
          email: d["email"],
          homePage: d["home_page"],
          partner: d["doi_tac"],
          taxCode: d["ma_so_thue"],
          note: d["ghi_chu"],
          branch: d["chi_nhanh"],
        })) as IBankAccount[],
        paging:{
        limit: pageInfo["pagecount"] || 0,
        page: pageInfo["page"] || 1,
        total: pageInfo["t_record"] || 0,
        pageCount: pageInfo["t_page"] || 0,
        group: pageInfo["group"],}
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
  static getAllComment(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/Item/GetComment`, {
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
          type: d["type"],
          ref: d["code"],
          imark: d["imark"],
          content: d["content"],
          reviewer: d["reviewer"],
        })) as {
          code: string;
          type: "PRODUCT" | "ORDER";
          ref: string;
          imark: number;
          content: string;
          reviewer: string;
        }[],
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
  static postComment({ type, code, reviewer, imark, content }, token) {
    return Axios.post(`${this.host}/Item/PostComment`, {
      token: token,
      memvars: [
        //Lấy quốc gia sản xuất
        ["type", "C", type], //Mã sản phẩm
        ["code", "C", code], //Mã sản phẩm
        ["reviewer", "C", reviewer], //Người đánh giá
        ["imark", "I", imark], //Mã sản phẩm
        ["content", "C", content], //Nội dung
      ],
    }).then((res) => {
      this.handleError(res);
      return get(res.data, "msg");
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
  static getAllReasonPoint(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/Item/GetPoint`, {
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
          userId: d["user_id0"].toString(),
          code: d["id"],
          reasonCode: d["ly_do"],
          note: "",
          status: d["status"],
          value: d["diem"],
          convertedValue: d["tien"],
          createdAt: moment(d["ngay_ct"]).toDate(),
        })) as IUserPointLog[],
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
  static getAllReason() {
    return Axios.post(`${this.host}/Item/GetListReasonPoint`, {
      token: this.imageToken,
    }).then((res) => {
      this.handleError(res);
      return get(res.data, "data.data", []).map((d: any) => ({
        code: d["code"],
        name: d["name"],
        name2: d["name2"],
      })) as { code: string; name: string; name2: string }[];
    });
  }
  static getUserPoint(token: string) {
    return Axios.post(`${this.host}/Item/GetPointUser`, { token }).then((res) => {
      this.handleError(res);
      return get(res.data, "data.data.0.val", 0) as number;
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
  static getAllOrder(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/Voucher/GetOrders`, {
      token: this.imageToken,
      memvars: [
        [
          "datetime2",
          "DT",
          updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : "2020-01-01 16:53:00",
        ],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
      this.handleError(res);
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      const details = groupBy(get(res.data, "data.detail", []), "id");

      return {
        data: get(res.data, "data.master", []).map((d: any) => {
          let subtotal = 0;
          const items = get(details, d["id"], []).map((item) => {
            subtotal += item["so_luong"] * item["gia_nt2"];
            return {
              productCode: item["ma_vt"],
              unit: item["dvt"],
              storeCode: item["ma_kho"],
              qty: item["so_luong"],
              price: item["gia_nt2"],
              amount: item["tien_nt2"],
              factor: item["he_so"],
              discountRate: item["tl_ck"],
              discount: item["ck_nt"],
              vatRate: item["thue_suat"],
              vat: item["thue_nt"],
              position: item["line"],
            };
          });
          return {
            code: d["id"],
            userId: d["user_id0"].toString(),
            orderNumber: d["so_ct"],
            promotionCode: d["ma_ck"],
            addressId: d["ma_dc"],
            fullAddress: d["dia_chi_web"],
            paymentMethod: d["ma_pttt_web"],
            deliveryMethod: d["ma_ptvc_web"],
            usePoint: d["sd_diem"] == 1,
            itemCount: d["t_so_luong"],
            subtotal: subtotal,
            discount: d["t_ck_nt"],
            amount: d["t_tt_nt"],
            note: d["datetime0"],
            createdAt: d["datetime0"],
            status: d["status"],
            items: items,
          };
        }) as any[],
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
  static getOrder(orderId: number) {
    return Axios.post(`${this.host}/Voucher/GetOrderDetail`, {
      token: this.imageToken,
      memvars: [
        ["id", "I", orderId], //ID don hang
      ],
    }).then((res) => {
      this.handleError(res);
      var d = get(res.data, "data.master.0", {});

      return {
        code: d["id"],
        userId: d["user_id0"].toString(),
        orderNumber: d["so_ct"],
        promotionCode: d["ma_ck"],
        addressId: d["ma_dc"],
        fullAddress: d["dia_chi_web"],
        paymentMethod: d["ma_pttt_web"],
        deliveryMethod: d["ma_ptvc_web"],
        usePoint: d["sd_diem"] == 1,
        itemCount: d["t_so_luong"],
        subtotal: d["t_tien_nt2"],
        discount: d["t_ck_nt"],
        amount: d["t_tt_nt"],
        note: d["datetime0"],
        createdAt: d["datetime0"],
        status: d["status"],
        // items: get(res.data, 'data.detail', []).map(detail => ({
        //   productId: string; // Mã sản phẩm
        //   productCode: string; // Má sản phẩm tham chiếu
        //   productName: string; // Tên sản phẩm
        //   unit: String; // Đơn vị tính
        //   storeCode: string; // Mã kho
        //   qty: number; // Số lượng
        //   price: number; // Gía bán
        //   amount: number; // Thành tiền
        //   factor: number; // Hệ số
        //   discountRate: number; // Tỷ lệ chiết khấu
        //   discount: number; // Chiết khấu
        //   vatRate: number; // % VAT
        //   vat: number; // Tiền VAT
        //   position: number; // Thứ tự
        // }))
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
  static getDeliveryMethod() {
    return Axios.post(`${this.host}/Item/GetDeliveryMethod`, {
      token: this.imageToken,
      memvars: [
        //Lấy quốc gia sản xuất
        ["datetime2", "DT", "2020-01-01 16:53:00"], //Thời gian từ
        ["pageIndex", "I", 1],
      ],
    }).then((res) => {
      this.handleError(res);
      return get(res.data, "data.data", []).map((d: any) => ({
        code: d["code"],
        name: d["name"],
        name2: d["name2"],
        discountRate: d["tl_ck"],
        position: d["stt"],
      })) as IDeliveryMethod[];
    });
  }
  static getPaymentMethod() {
    return Axios.post(`${this.host}/Item/GetPaymentMethod`, {
      token: this.imageToken,
      memvars: [
        //Lấy quốc gia sản xuất
        ["datetime2", "DT", "2020-01-01 16:53:00"], //Thời gian từ
        ["pageIndex", "I", 1],
      ],
    }).then((res) => {
      this.handleError(res);
      return get(res.data, "data.data", []).map((d: any) => ({
        code: d["code"],
        name: d["name"],
        name2: d["name2"],
        discountRate: d["tl_ck"],
        position: d["stt"],
      })) as IPaymentMethod[];
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
  static changeUserPassword(oldPassword: string, newPassword: string, token: string) {
    return Axios.post(`${this.host}/Authorize/ChangePassword`, {
      token,
      memvars: [
        ["o", "C", oldPassword], //Password cu
        ["p", "C", newPassword], //Password moi
      ],
    }).then((res) => {
      this.handleError(res);
      return get(res.data, "msg");
    });
  }
  static recoveryPassword(email: string) {
    return Axios.post(`${this.host}/Authorize/RecoveryPassword`, {
      token: this.imageToken,
      memvars: [
        ["e_mail", "C", email], //Email của tài khoản -> Cả 2 thông tin này phải khớp với dữ liệu chương trình thì mới khôi phục thành công
      ],
    }).then((res) => {
      this.handleError(res);
      return get(res.data, "msg");
    });
  }
  static viewDraftOrder(data: {
    promotionCode?: string;
    paymentMethod: string;
    deliveryMethod: string;
    addressId: string;
    note: string;
    point: boolean;
    items: {
      productCode: string;
      qty: number;
      unit: string;
      price: number;
      amount: number;
    }[];
  }) {
    let subtotal = 0;
    return Axios.post(`${this.host}/Voucher/ViewDraftOrder`, {
      token: this.imageToken,
      memvars: [
        ["ma_ck", "C", data.promotionCode || ""], //Ma chiet khau
        ["payment", "C", data.paymentMethod], //Chuyen khoan
        ["delivery", "C", data.deliveryMethod], //Phương thức vận chuyển
        ["ma_dc", "C", data.addressId], //Địa chỉ giao hàng
        ["dien_giai", "C", data.note], //Ghi chú khác
        ["diem", "N", data.point ? "1" : "0"], //Sử dụng điểm
      ],
      data: {
        "#master": [
          {
            api_id: 1,
            ngay_ct: moment().toISOString(),
          },
        ],
        "#detail": data.items.map((i) => {
          subtotal += i.amount;
          return {
            api_id: 1, //Trường liên kết với master
            ma_vt: i.productCode, //Mã vật tư
            dvt: i.unit, //Đơn vị tính
            so_luong: i.qty, //Số lượng đơn hàng
            gia_nt2: i.price, //Giá bán
            tien_nt2: i.amount, //Thành tiền
          };
        }),
      },
    }).then((res) => {
      this.handleError(res);
      return {
        subtotal: subtotal,
        discount: get(res.data, "data.master.0.t_ck_nt", 0),
        amount: get(res.data, "data.master.0.t_tt_nt", 0),
        items: get(res.data, "data.detail", []).map((t) => ({
          productCode: t["ma_vt"],
          unit: t["dvt"],
          storeCode: t["ma_kho"],
          qty: t["so_luong"],
          factor: t["he_so"],
          price: t["gia_nt2"],
          amount: t["tien_nt2"],
          discountRate: t["tl_ck"],
          discount: t["ck_nt"],
          vatRate: t["thue_suat"],
          vat: t["thue_nt"],
          position: t["line"],
        })),
      };
    });
  }
  static createOrder(
    data: {
      promotionCode?: string;
      paymentMethod: string;
      deliveryMethod: string;
      addressId: string;
      note: string;
      point: boolean;
      items: {
        productId: string;
        productCode: string;
        productName: string;
        qty: number;
        unit: string;
        price: number;
        amount: number;
      }[];
    },
    draft = false
  ) {
    let subtotal = 0;
    let itemCount = 0;
    const orderItems = keyBy(data.items, "productCode");
    const api = draft ? "SyncDraftOrder" : "SyncOrder";
    return Axios.post(`${this.host}/Voucher/${api}`, {
      token: this.imageToken,
      memvars: [
        ["ma_ck", "C", data.promotionCode || ""], //Ma chiet khau
        ["payment", "C", data.paymentMethod], //Chuyen khoan
        ["delivery", "C", data.deliveryMethod], //Phương thức vận chuyển
        ["ma_dc", "C", data.addressId], //Địa chỉ giao hàng
        ["dien_giai", "C", data.note], //Ghi chú khác
        ["diem", "N", data.point ? "1" : "0"], //Sử dụng điểm
      ],
      data: {
        "#master": [
          {
            api_id: 1,
            ngay_ct: moment().toISOString(),
          },
        ],
        "#detail": data.items.map((i) => {
          subtotal += i.amount;
          itemCount += i.qty;
          return {
            api_id: 1, //Trường liên kết với master
            ma_vt: i.productCode, //Mã vật tư
            dvt: i.unit, //Đơn vị tính
            so_luong: i.qty, //Số lượng đơn hàng
            gia_nt2: i.price, //Giá bán
            tien_nt2: i.amount, //Thành tiền
          };
        }),
      },
    }).then((res) => {
      this.handleError(res);
      return {
        code: get(res.data, "data.master.0.id"),
        orderNumber: get(res.data, "data.master.0.so_ct"),
        subtotal: subtotal,
        discount: get(res.data, "data.master.0.t_ck_nt", 0),
        amount: get(res.data, "data.master.0.t_tt_nt", 0),
        promotionCode: get(res.data, "data.master.0.ma_ck"),
        items: get(res.data, "data.detail", []).map((t) => ({
          productCode: t["ma_vt"],
          productId: orderItems[t["ma_vt"]].productId,
          productName: orderItems[t["ma_vt"]].productName,
          unit: t["dvt"],
          storeCode: t["ma_kho"],
          qty: t["so_luong"],
          factor: t["he_so"],
          price: t["gia_nt2"],
          amount: t["tien_nt2"],
          discountRate: t["tl_ck"],
          discount: t["ck_nt"],
          vatRate: t["thue_suat"],
          vat: t["thue_nt"],
          position: t["line"],
        })),
        itemCount: itemCount,
        status: draft ? 0 : 1,
      };
    });
  }
}

AritoHelper.setImageToken();
