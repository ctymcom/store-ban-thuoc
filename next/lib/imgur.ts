export class Imgur {
  static uploadImage(image) {
    return new Promise((resolve, reject) => {
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
            var reader = new FileReader();
            reader.onload = function (e) {
              resolve(e.target.result);
            };
            reader.readAsDataURL(image);
          }
        }
      };
      xhr.send(data);
    });
  }
}
