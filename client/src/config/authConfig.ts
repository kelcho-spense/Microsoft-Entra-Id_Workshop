import { Configuration, LogLevel } from "@azure/msal-browser";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const TENANT_ID = import.meta.env.VITE_TENANT_ID
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
const EXPRESS_API_CLIENT_ID = import.meta.env.VITE_EXPRESS_API_CLIENT_ID


export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID, 
    authority: `https://login.microsoftonline.com/${TENANT_ID}`, 
    redirectUri: REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "User.Read",`api://${EXPRESS_API_CLIENT_ID}/access_as_user`], 
};


