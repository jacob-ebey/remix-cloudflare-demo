import { useRef } from "react";
import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { json, Form, useLoaderData, useSubmit } from "remix";

import { unencryptedSession } from "../sessions.server";

let VALID_THEMES = [
  "dark",
  "light",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
];

export let meta: MetaFunction = () => {
  return {
    title: "Themes | Remix Cloudflare Demo",
    description: "Demo utilizing cookies to change the theme.",
  };
};

export let action: ActionFunction = async ({ request }) => {
  let session = await unencryptedSession.getSession(
    request.headers.get("Cookie")
  );

  let formData = new URLSearchParams(await request.text());

  let theme = formData.get("theme") || "dark";
  session.set("theme", theme);

  return json(null, {
    headers: {
      "Set-Cookie": await unencryptedSession.commitSession(session),
    },
  });
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await unencryptedSession.getSession(
    request.headers.get("Cookie")
  );
  let theme = session.get("theme") || "dark";

  return json(theme);
};

export default function Themes() {
  let selectedTheme = useLoaderData();

  let formRef = useRef<HTMLFormElement>(null);
  let submit = useSubmit();

  let onRadioChanged = () => {
    submit(formRef.current);
  };

  return (
    <main className="container mx-auto prose px-4 py-8">
      <h1>Themes</h1>

      <p>
        By storing the user selected theme in a cookie we can provide a zero
        flicker experience even on initial page load.
      </p>

      <Form ref={formRef} method="post">
        {VALID_THEMES.map((theme) => (
          <div key={theme} className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">{theme}</span>
              <input
                data-testid={`theme-${theme}`}
                type="radio"
                name="theme"
                defaultChecked={selectedTheme === theme}
                className="radio"
                value={theme}
                onChange={onRadioChanged}
              />
            </label>
          </div>
        ))}
        <noscript>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </noscript>
      </Form>
    </main>
  );
}
