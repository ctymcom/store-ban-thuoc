import axios from "axios";

export class Imgur {
  static async uploadImage(image): Promise<{ link: string }> {
    const data = new FormData();
    data.append("image", image);

    try {
      let res = await axios.post("https://api.imgur.com/3/image", data, {
        headers: {
          Authorization: "Client-ID dd32dd3c6aaa9a0",
        },
      });
      return res.data.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
