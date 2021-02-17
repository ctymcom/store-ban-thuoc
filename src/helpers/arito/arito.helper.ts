import { configs } from "../../configs";
import Axios from "axios";
import { CacheHelper } from "../cache.helper";
import moment from "moment-timezone";
import { get } from "lodash";

export class AritoHelper {
  static host: string = configs.arito.host;
  static get imageToken() {
    return CacheHelper.get("arito-image-token");
  }
  static async setImageToken() {
    return Axios.post(`${this.host}/GetToken`, { ClientID: "KHOTHUOCSI" }).then((res) => {
      CacheHelper.set("arito-image-token", res.data.value);
    });
  }
  static getImageLink(imageId: string) {
    return `${this.host}/GetImageFile350/${imageId}/${this.imageToken}`;
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
}
