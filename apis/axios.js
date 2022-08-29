import axios from "axios";

class Axios {
  // Post
  static async fetch({ method = "GET", url = "", data = {}, params = {} }) {
    var config = {
      method: method,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    if (method == "GET") {
      config["params"] = params;
    }

    const result = await axios(config)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });

    return result;
  }
}

export default Axios;
