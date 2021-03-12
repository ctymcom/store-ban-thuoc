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
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
    // return new Promise<string>((resolve, reject) => {
    //   var data = new FormData();
    //   data.append("image", image);
    //   var xhr = new XMLHttpRequest();
    //   xhr.open("POST", "https://api.imgur.com/3/image", true);
    //   xhr.setRequestHeader("Authorization", "Client-ID " + "dd32dd3c6aaa9a0");
    //   xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4) {
    //       var response = JSON.parse(xhr.responseText);
    //       if (response.status === 200 && response.success) {
    //         resolve(response.data.link);
    //       } else {
    //         if (response.success) {
    //           var reader = new FileReader();
    //           reader.onload = function (e) {
    //             resolve(e.target.result as string);
    //           };
    //           reader.readAsDataURL(image);
    //         } else {
    //           reject(response.error);
    //         }
    //       }
    //     }
    //   };
    //   xhr.send(data);
    // });
  }
}
