export function queryParser(
  data,
  { hasBraces, fileParam }: { hasBraces: boolean; fileParam?: string } = { hasBraces: false }
) {
  if (typeof data == "string") {
    if (data.match(/\n/g)) return `"""${data}"""`;
    else return `"${data}"`;
  } else if (typeof data == "object") {
    if (Array.isArray(data)) {
      let arr = [];
      for (let item of data) {
        if (item == undefined) continue;
        arr.push(this.stringifyDataToParams(item, { hasBraces: true }));
      }
      return `[${arr.join(", ")}]`;
    } else if (data instanceof Date) {
      return `"${data.toISOString()}"`;
    } else if (data instanceof File) {
      return `$${fileParam}`;
    } else {
      let props = [];
      for (let key in data) {
        if (data[key] == undefined) continue;
        props.push(`${key}: ${this.stringifyDataToParams(data[key], { hasBraces: true, key })}`);
      }
      return hasBraces ? `{ ${props.join(", ")} }` : `${props.join(", ")}`;
    }
  } else {
    return data;
  }
}
