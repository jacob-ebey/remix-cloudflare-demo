import { createCookieSessionStorage } from "remix";

export let unencryptedSession = createCookieSessionStorage({
  cookie: {
    path: "/",
    sameSite: "lax",
  },
});
