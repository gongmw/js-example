const jsonStringify = (obj) => {
    let type = typeof obj;
    console.log(type)
    if (type !== "object" || type === null) {
      if (['string', 'undefined', 'function'].includes(type)) {
        obj = `"${obj}"`
      }
      return String(obj);
    } else {
      let json = []
      let arr = (obj && obj.constructor === Array);
      for (let k in obj) {
        let v = obj[k];
        let type = typeof v;
        if (['string', 'undefined', 'function'].includes(type)) {
          v = `"${v}"`
        } else if (type === "object") {
          v = jsonStringify(v);
        }
        json.push((arr ? "" : '"' + k + '":') + String(v));
      }
      return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
    }
  }