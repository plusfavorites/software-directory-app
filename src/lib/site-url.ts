const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  "https://software-directory-app.vercel.app";

const hasProtocol = /^https?:\/\//i.test(rawSiteUrl);

export const siteUrl = hasProtocol ? rawSiteUrl : `https://${rawSiteUrl}`;

export function buildAbsoluteUrl(path = "") {
  return new URL(path, siteUrl).toString();
}
