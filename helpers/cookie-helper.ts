import cookie from "js-cookie";

class CookieHelper {

  setCookie = (key: any, value: any) => {
    // console.log("cookie");
    if (process.browser) {
      cookie.set(key, value, {
        expires: 1,
        path: "/",
      });
    }
  };

  removeCookie = (key: any) => {
    if (process.browser) {
      cookie.remove(key, {
        expires: 1,
      });
    }
  };

  getCookie = (key: any, req: any) => {
    return process.browser
      ? this.getCookieFromBrowser(key)
      : this.getCookieFromServer(key, req);
  };

  getCookieFromBrowser = (key: any) => {
    return cookie.get(key);
  };

  getCookieFromServer = (key: any, req: any) => {
    if (!req.headers.cookie) {
      return undefined;
    }
    const rawCookie = req.headers.cookie
      .split(";")
      .find((c: any) => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
      return undefined;
    }
    return rawCookie.split("=")[1];
  };
}

const cookieHelperInstance = new CookieHelper();

export default cookieHelperInstance;