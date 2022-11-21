import axios from '../plugins/axios'
import Model from './model'

class Menu {
  /**
   *
   * @param {"name": "", "html_class": "", "type": "ic_page", "url": "", "options": { "uuid": "a191577f-d28d-4467-823f-18b5e282f959", "slug": null }, "children": []} menu_json
   */
  constructor(menu_json) {
    this.name = menu_json.name
    this.type = menu_json.type
    this.html_class = menu_json.html_class
    this.type = menu_json.type
    let url = menu_json.url
    if (this.type == 'category' && menu_json.options != null) {
      try {
        url = `/products/${menu_json.options.slug}`
      } catch (error) {
        console.log(error, 'error bos')
      }
    }
    this.url = url

    // console.warn(this.url);

    this.options = menu_json.options
    if (menu_json.children && menu_json.children.length > 0) {
      this.children = menu_json.children.map((child) => new Menu(child))
    } else {
      this.children = []
    }
  }

  static async fetch() {
    return await axios({
      method: 'get',
      url: encodeURI(`${Model.apiURL}/menu`),
      data: {},
    })
      .then((response) => {
        try {
          for (const menuGroup in response.data.menus) {
            response.data.menus[menuGroup] = response.data.menus[menuGroup].map(
              (menu) => new Menu(menu)
            )
          }
        } catch (e) {
          console.warn('error ubah menu')
          response.data.menus = []
        }
        return response.data
      })
      .catch((e) => {
        console.warn(e)
        return {
          success: false,
          error_message: e,
          menus: {},
        }
      })
  }
}

export { Menu }
