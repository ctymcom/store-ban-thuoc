import { configs } from "../configs";
import Axios from "axios";
import { CacheHelper } from "./cache.helper";

export class AritoHelper {
  static host: string = configs.arito.host;
  static get imageToken() {
    return CacheHelper.get("arito-image-token");
  }
  static setImageToken() {
    Axios.post(`${this.host}/GetToken`, { ClientID: "KHOTHUOCSI" }).then((res) => {
      CacheHelper.set("arito-image-token", res.data.value);
    });
  }

  static getImageLink(imageId: string) {
    return `${this.host}/GetImageFile350/${imageId}/${this.imageToken}`;
  }
}
