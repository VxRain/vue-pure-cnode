import axios from "axios";

export function get(url) {
  return function(params) {
    return axios
      .get(url, {
        params,
      })
      .then((res) => {
        let { success, data } = res.data;
        if (success) {
          return data;
        } else {
          throw new Error("success状态码：" + success);
        }
      })
      .catch(() => {});
  };
}
