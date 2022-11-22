import axios from "../plugins/axios";
import Model from "./model";

class User {
  constructor(user_json = {}) {
    this.email = user_json.email ?? "";
    this.name = user_json.name ?? "";
    this.mobile = user_json.mobile ?? "";
    this.address = user_json.address ?? "";
    this.country = user_json.country ?? "indonesia";
    this.province = user_json.province ?? "";
    this.city = user_json.city ?? "";
    this.district = user_json.district ?? "";
    this.postal_code = user_json.postal_code ?? "";
    this.dob = user_json.dob ?? "";
    this.salutation = user_json.salutation ?? "";
    this.token = user_json.token ?? "";
    this.currency = user_json.token ?? "";
    this.isLogin = user_json.isLogin ?? false;
  }

  toJSON() {
    let json = {};
    Object.keys(this).forEach((v) => {
      json[v] = this[v];
    });
    return json;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  /**
   *
   * @param String email
   * @param String password
   * @param String token
   */
  static async login(email = "", password = "", token = "") {
    let login = await axios({
      method: "post",
      url: encodeURI(`${Model.apiURL}/auth/login`),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then((r) => {
        try {
          if (r.data.country && r.data.country.length < 0) {
            r.data.country = "indonesia";
          }
        } catch (error) {}
        return r.data;
      })
      .catch(Model.errorHandler);

    try {
      if (login.success) {
        let user = {
          ...login.user,
          isLogin: true,
          token: login.token,
        };
        login.user = new User(user);
      }
    } catch (error) {
      login.success = false;
      login.errors = { general: "an error occured" };
      console.warn(errors.general);
    }

    return login;
  }

  /**
   *
   * @param String firstName
   * @param String lastName
   * @param String email
   * @param String password
   */
  static async register({
    firstName = "",
    lastName = "",
    email = "",
    password = "",
    token = "",
    mobile = "mobile",
  }) {
    const name = (firstName + " " + lastName).trim();

    let registration = await axios({
      method: "post",
      url: encodeURI(`${Model.apiURL}/auth/register`),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: name,
        email: email,
        password: password,
        mobile: mobile,
      },
    })
      .then((r) => {
        try {
          if (r.data.country && r.data.country.length < 0) {
            r.data.country = "indonesia";
          }
        } catch (error) {}
        return r.data;
      })
      .catch(Model.errorHandler);

    try {
      if (registration.success) {
        let user = {
          ...registration.user,
          token: registration.access_token,
          isLogin: true,
        };
        registration.user = new User(user);
      }
    } catch (e) {
      registration.success = false;
      registration.errors = { general: "an error occured" };
      console.warn(e);
    }
    return registration;
  }

  static async s_refreshProfile(token) {
    let profile = await axios({
      method: "get",
      url: encodeURI(`${Model.apiURL}/account/user`),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        try {
          if (r.data.country && r.data.country.length < 0) {
            r.data.country = "indonesia";
          }
        } catch (error) {}
        return r.data;
      })
      .catch(Model.errorHandler);
    return profile;
  }

  static async s_updateProfile(user_json = {}) {
    let profile = await axios({
      method: "post",
      url: encodeURI(`${Model.apiURL}/account/user`),
      headers: {
        Authorization: `Bearer ${user_json.token}`,
      },
      data: {
        email: user_json.email ?? "",
        name: user_json.name ?? "",
        mobile: user_json.mobile ?? "",
        address: user_json.address ?? "",
        country: user_json.country ?? "indonesia",
        province: user_json.province ?? "",
        city: user_json.city ?? "",
        district: user_json.district ?? "",
        postal_code: user_json.postal_code ?? "",
        dob: user_json.dob ?? "",
        salutation: user_json.salutation ?? "",
      },
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);

    return profile;
  }

  static async s_logout(user_json = {}) {
    let logout = await axios({
      method: "get",
      url: encodeURI(`${Model.apiURL}/auth/logout`),
      headers: {
        Authorization: `Bearer ${user_json.token}`,
      },
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);
    return logout;
  }

  static async changePassword(user_json) {
    let changePassword = await axios({
      method: "post",
      url: encodeURI(`${Model.apiURL}/account/change-password`),
      headers: {
        Authorization: `Bearer ${user_json.token}`,
      },
      data: {
        old_password: user_json.old_password,
        new_password: user_json.new_password,
        new_password_confirm: user_json.new_password_confirm,
      },
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);
    return changePassword;
  }

  /**
		ambil lagi user data dari server
		@return model/user
	*/
  async refreshProfile() {
    let latestData = await User.s_refreshProfile(this.token);

    if (latestData.success) {
      // update current data
      Object.keys(this).forEach((k) => {
        this[k] = latestData.user[k];
      });
    }
    return this;
  }

  async updateProfile() {
    return await User.s_updateProfile(this.toJSON());
  }

  async logout() {
    await User.s_logout(this.toJSON());
    return new User();
  }

  static async refreshToken(token) {
    let tokenVal = token ?? "";

    let refresh = await axios({
      method: "post",
      url: encodeURI(`${Model.apiURL}/oauth/token`),
      headers: {
        Authorization: `Bearer ${tokenVal}`,
      },
      data: {
        grant_type: "refresh_token",
        client_id: 2,
      },
    })
      .then((r) => {
        return r.data;
      })
      .catch((e) => {
        Model.errorHandler(e);
        return e.response.data;
      });
    return refresh;
  }

  /** Reset password by given email will trigger send email
   * @param String email
   * @param String token
   */
  static async resetPassword(email = "", token = "") {
    let response = await axios({
      method: "post",
      url: encodeURI(`${Model.apiURL}/reset-password`),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: email,
      },
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);

    try {
      if (response.success) {
        return response;
      }
    } catch (error) {
      response.success = false;
      response.errors = { general: "an error occured" };
    }

    return response;
  }

  /** Reset password by given unique key and email send to reset password
   * @param String email
   * @param String token
   */
  static async resetNewPassword(
    key = "",
    email = "",
    password = "",
    repassword = "",
    token = ""
  ) {
    let response = await axios({
      method: "post",
      url: encodeURI(`${Model.apiURL}/reset-new-password`),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        token: key,
        email: email,
        password: password,
        password_confirmation: repassword,
      },
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);

    try {
      if (response.success) {
        return response;
      }
    } catch (error) {
      response.success = false;
      response.errors = { general: "an error occured" };
    }

    return response;
  }

  static async verify(token = "", email = "") {
    return await axios({
      method: "post",
      url: `${Model.apiURL}/email/validate-verification?token=${token}&email=${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);
  }

  static async deleteAccounts(token = "", password = "") {
    return await axios({
      method: "delete",
      url: `${Model.apiURL}/account/user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        password: password ?? "",
      },
    })
      .then((r) => {
        return r.data;
      })
      .catch(Model.errorHandler);
  }

  static async getCurrency() {
    return axios({
      method: "get",
      url: "https://api.ipdata.co?api-key=71dcf59b420e2596d0d7fee23e16cd1657fd65fa5b31e7e000a333fc",
    })
      .then((r) => {
        if (r.data.currency.code != "IDR") {
          return "USD";
        } else {
          return "IDR";
        }
      })
      .catch(Model.errorHandler);
  }
}
export default User;
