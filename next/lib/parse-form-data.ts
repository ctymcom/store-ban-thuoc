export function parseFormData(form: FormData) {
  var object = {};
  form.forEach(function (value, key) {
    object[key] = value == "true" ? true : value;
  });
  return object;
}
