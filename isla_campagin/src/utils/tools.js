/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
export const setCookie = (cookieName, cookieValue, expirationTime) => {
  const d = new Date();
  d.setTime(d.getTime() + expirationTime * 1000);
  const expires = `expires=${d.toUTCString()}`;
  // eslint-disable-next-line no-undef
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

export const getCookie = (cookieName) => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
