import CryptoJS from "crypto-js";

export function getGravatarUrl(email: string, size: number = 200): string {
  const hash = CryptoJS.MD5(email.trim().toLowerCase()).toString();
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}