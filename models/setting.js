import axios from "../plugins/axios";
import Model from "./model";

class Setting {
  // Will use this one only
  static async fetchDataAPI(key) {
    return await axios({
      method: "get",
      url: encodeURI(`${Model.apiURL}/${key}`),
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);
  }

  static async fetchDataSetting(key) {
    return await axios({
      method: "get",
      url: encodeURI(`${Model.apiURL}/setting/get/${key}`),
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);
  }

  static async fetchHomeAboutCaption(token) {
    return await axios({
      method: "get",
      url: encodeURI(`${Model.apiURL}/setting/get/home_about_caption`),
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);
  }

  static async fetchTopBar() {
    return await axios({
      method: "get",
      url: encodeURI(`${Model.apiURL}/setting/get/topbar`),
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);
  }

  static async fetchMenuBanner(token) {
    return await axios({
      method: "get",
      url: encodeURI(`${Model.apiURL}/setting/get/menu_shopping_image`),
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);
  }

  static async fetchProductPromo(keyword) {
    return await axios({
      method: "get",
      url: encodeURI(`${Model.apiURL}/setting/get?keyword=${keyword}`),
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);
  }
}

export default Setting;
