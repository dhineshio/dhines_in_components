export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api/v1";

export const APP_CONFIG = {
  appName: "Dhines In Components",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  accessTokenCookieName: "dic_access_token",
  refreshTokenCookieName: "dic_refresh_token",
  otpPendingCookieName: "dic_otp_pending",
  adminAccessTokenCookieName: "dic_admin_access",
  adminRefreshTokenCookieName: "dic_admin_refresh",
  tokenRefreshBuffer: 60,
  otpExpirySeconds: 59,
} as const;
