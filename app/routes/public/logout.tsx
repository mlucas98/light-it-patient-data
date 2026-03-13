import { redirect } from "react-router";

export async function action() {
  return redirect("/login", {
    headers: {
      "Set-Cookie":
        "lightItCookie=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;",
    },
  });
}
