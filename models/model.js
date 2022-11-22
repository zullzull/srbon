import FailEater from "../plugins/fail-eater";
import nextConfig from "../next.config";

class Model {
  static apiURL = nextConfig.env.API_URL;

  static errorHandler(e) {
    let statusText, statusCode;
    try {
      statusText = e.response.statusText;
      statusCode = e.response.status;
    } catch (error) {
      // statusText = 'unknown error'
      // statusCode = '-------'
    }

    let resp = {
      statusCode: statusCode,
      success: false,
      errors: {},
    };
    try {
      let data = e.response.data;

      // terjemahkan error general
      if (data.error) {
        resp.errors.general = data.error;
      }

      // terjemahkan errors field
      for (const key in data.errors) {
        resp.errors[key] = data.errors[key].join("\n");
      }

      if (Object.keys(resp.errors).length === 0) {
        resp.errors.general = statusText;
      }
    } catch (e) {
      FailEater.diggest(e, "api error");
      resp.errors.general = "Failed";
    }

    return resp;
  }
}

export default Model;
