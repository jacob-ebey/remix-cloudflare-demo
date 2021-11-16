import type {
  LinksFunction,
  LoaderFunction,
  ShouldReloadFunction,
} from "remix";
import {
  json,
  Links,
  LiveReload,
  Meta,
  Scripts,
  Outlet,
  useCatch,
  useLoaderData,
} from "remix";

import Navbar from "./components/navbar";
import { useScrollRestoration } from "./utils/scroll";
import { unencryptedSession } from "./sessions.server";

import tailwindStylesUrl from "./styles/tailwind.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesUrl }];
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await unencryptedSession.getSession(
    request.headers.get("Cookie")
  );
  let theme = session.get("theme") || "dark";

  return json({ theme });
};

export let unstable_shouldReload: ShouldReloadFunction = ({ submission }) => {
  return !!submission && submission.action === "/themes";
};

function Document({
  children,
  title,
  theme,
}: {
  children: React.ReactNode;
  title?: string;
  theme?: string;
}) {
  useScrollRestoration();

  return (
    <html lang="en" data-theme={theme || "dark"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        {children}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  let { theme } = useLoaderData();

  return (
    <Document theme={theme}>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      );

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
