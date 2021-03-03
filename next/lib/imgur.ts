export class Imgur {
  static uploadImage(image) {
    return new Promise<string>((resolve, reject) => {
      // var xhttp = new XMLHttpRequest(),
      //   fd = new FormData();

      // fd.append("image", image);
      // xhttp.open("POST", "https://api.imgbb.com/1/upload?key=b798bb562f3ff9cf86a373f4fbb90f84");
      // xhttp.setRequestHeader("Authorization", "Client-ID dd32dd3c6aaa9a0"); //Get yout Client ID here: http://api.imgur.com/
      // xhttp.onreadystatechange = function () {
      //   if (xhttp.status === 200 && xhttp.readyState === 4) {
      //     var res = JSON.parse(xhttp.responseText);
      //     resolve(res.data.url);
      //   }
      // };
      // xhttp.send(fd);
      var data = new FormData();
      data.append("image", image);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image", true);
      xhr.setRequestHeader("Authorization", "Client-ID " + "dd32dd3c6aaa9a0");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var response = JSON.parse(xhr.responseText);
          if (response.status === 200 && response.success) {
            resolve(response.data.link);
          } else {
            if (response.success) {
              var reader = new FileReader();
              reader.onload = function (e) {
                resolve(e.target.result as string);
              };
              reader.readAsDataURL(image);
            } else {
              reject(response.error)
            }
          }
        }
      };
      xhr.send(data);
    });
  }
}
