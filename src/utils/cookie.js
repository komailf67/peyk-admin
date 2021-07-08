import cookie from 'js-cookie';
import * as uuid from 'uuid';
import { config } from '../config';

function checkWindowDefined() {
  if (typeof window !== 'undefined') {
    return window;
  }
}

export const setCookie = (key, value, expires = 1, path = '/') => {
  if (checkWindowDefined()) {
    cookie.set(key, value, {
      expires,
      path,
    });
  }
};

export const removeCookie = (key) => {
  if (checkWindowDefined()) {
    cookie.remove(key);
  }
};

export const getCookie = (key, req) =>
  checkWindowDefined()
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);

const getCookieFromBrowser = (key) => cookie.get(key);

const getCookieFromServer = (key, req) => {
  if (!req || !req.headers || !req.headers.cookie) {
    return null;
  }

  const rawCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`));

  if (!rawCookie) {
    return null;
  }

  return rawCookie.split('=')[1];
};

const getGuestUUID = () => getCookie(config.guestUuidCookieName) || null;

const setGuestUUID = () => {
  const guestUUID = uuid.v4();
  setCookie(config.guestUuidCookieName, guestUUID, 365);
  return guestUUID;
};

export const cookieUtils = {
  getCookie,
  setCookie,
  getGuestUUID,
  setGuestUUID,
};
