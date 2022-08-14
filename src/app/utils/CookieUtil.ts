export default class CookieUtils {
  static getCookie(cookieName: string) {
    return (
      document.cookie
        .match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)')
        ?.pop() || ''
    );
  }

  static setCookie(
    cookieName: string,
    cookieValue: string,
    path: string,
    expiresInDays: number
  ) {
    var date = new Date();
    date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
    let expires = '; expires=' + date.toUTCString();
    document.cookie =
      cookieName + '=' + cookieValue + expires + '; path=' + path;
  }
  static removeCookie(cookieName: string) {
    document.cookie =
      cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
