import Cookies from "universal-cookie";
/**
 * cache
 * Load data from local storage when available by using unique `key`, when `maxExpired` reached will running `onNoCache` to retrieve data and save into local storage
 *
 * Copyright 2020 Yoki Suprayogi
 *
 */

/**
 * local storage helper, agar metode pengunaan sama untuk cache
 */
let localStorageManager = {
  setItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data), {
      path: "/",
    });
  },
  getItem(key) {
    if (typeof Storage !== "undefined")
      return JSON.parse(localStorage.getItem(key));
    else return {};
  },
};

/**
 * cookies helper, agar metode pengunaan sama untuk cache
 */

let cookiesManager = {
  setItem(key, data) {
    const cookies = new Cookies();
    cookies.set(key, JSON.stringify(data), {
      sameSite: "lax",
      doNotParse: true,
      path: "/",
    });
  },
  getItem(key, req) {
    let cookies;
    // ambil cookies dari server
    if (typeof window == "undefined") {
      cookies = new Cookies(req.headers.cookie);
    }
    // ambil cookies dari client
    else {
      cookies = new Cookies();
    }

    try {
      return JSON.parse(
        cookies.get(key, {
          sameSite: "lax",
          doNotParse: true,
          path: "/",
        })
      );
    } catch (error) {
      return {};
    }
  },
};

/**
 * @param {object} config
 * 	String key, as cache key must uniques for each request options
 * 	Function onNoCache, async function when no cache available
 * 	Int maxExpired, how long cache will be valid in second
 * 	Bool isForceReplace, if true will ignore cache and run onNoCache
 *  String storageType, storage type 'localStorage' or 'cookies' default using localStorage
 */
export default async function (config = {}) {
  let hasCache = false;
  const key = config.key;
  // expired time dalam detik
  const maxExpired = config.maxExpired ?? 1 * 60;
  const onNoCache =
    config.onNoCache ??
    function () {
      return null;
    };
  const isForceReplace = config.isForceReplace ?? false;
  const storageType = config.storageType ?? "localStorage";
  const req = config.req ?? {};
  let storage;

  if (storageType == "cookies") {
    storage = cookiesManager;
  } else {
    storage = localStorageManager;
  }

  // key provide, dan support local storage
  if (key) {
    // search key in local storage
    let data = storage.getItem(key, req);
    if (data) {
      // ambil dari cache kalau belum expired dan bukan forcereplace
      if (data.expiredTime > Math.floor(Date.now()) && !isForceReplace) {
        hasCache = true;
        return data.response;
      }
    } else {
      console.warn("no storage");
    }
  } else {
    console.warn("no key");
  }

  if (!hasCache || isForceReplace) {
    if (onNoCache) {
      let data = (await onNoCache()) ?? null;
      /// disimpan
      if (typeof Storage !== "undefined" && data != null) {
        // console.log('key disimpan selama', maxExpired, 'in second')
        storage.setItem(key, {
          response: data,
          expiredTime: Math.floor(Date.now() + maxExpired * 1000),
        });
      }
      return data;
    } else {
      return null;
    }
  }
}
