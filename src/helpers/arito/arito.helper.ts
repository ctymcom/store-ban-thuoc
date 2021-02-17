import { configs } from "../../configs";
import Axios from "axios";
import { CacheHelper } from "../cache.helper";
import moment from "moment-timezone";
import { compact, get, keyBy } from "lodash";
import { IProduct } from "../../graphql/modules/product/product.model";

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
  static getAllIngredient(page: number = 1, updatedAt?: Date) {
    return Axios.post(`${this.host}/List/GetIngredient`, {
      token: this.imageToken,
      memvars: [
        ["datetime2", "DT", updatedAt ? moment(updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""],
        ["ma_hc", "C", ""],
        ["pageIndex", "I", page],
      ],
    }).then((res) => {
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
      const pageInfo = get(res.data, "data.pageInfo.0", {});
      const imageData = keyBy(get(res.data, "data.images", []), "ma_vt");
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
}
