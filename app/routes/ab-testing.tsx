import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { json, Form, useLoaderData } from "remix";
import cn from "classnames";

import { unencryptedSession } from "../sessions.server";

let SESSION_KEY = "ab-testing-bucket";

import defaultImage from "../images/default.jpg";
import aImage from "../images/a.jpg";
import bImage from "../images/b.jpg";

export let meta: MetaFunction = () => {
  return {
    title: "A/B Testing | Remix Cloudflare Demo",
    description: "Demo utilizing cookies to run A/B tests.",
  };
};

export let action: ActionFunction = async ({ request }) => {
  let session = await unencryptedSession.getSession(
    request.headers.get("Cookie")
  );

  let formData = new URLSearchParams(await request.text());
  let bucket = formData.get("bucket");
  session.set(SESSION_KEY, bucket);

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

  let bucket = session.get(SESSION_KEY);
  if (typeof bucket !== "string") {
    bucket = Math.random() > 0.5 ? "a" : "b";
  }

  session.set(SESSION_KEY, bucket);

  return json(
    { bucket },
    {
      headers: {
        "Set-Cookie": await unencryptedSession.commitSession(session),
      },
    }
  );
};

export default function AbTesting() {
  let { bucket } = useLoaderData();

  return (
    <main className="container mx-auto prose px-4 py-8">
      <h1>AB testing with buckets</h1>
      <p>
        In this demo we use cookies to assign a bucket with the variant to show.
        When you first visited this page you were randomly assigned a bucket.
      </p>
      <p>
        Click one of the buttons below to assign the bucket you are in. Even
        after re-loading the page you will remain in the assigned bucket.
      </p>

      <p>Bucket: {bucket ? bucket : "none"}</p>

      <div>
        <Form method="post" className="inline-block" replace>
          <input type="hidden" name="bucket" value="" />
          <button type="submit" className={cn("btn", !bucket && "btn-active")}>
            Remove Bucket
          </button>
        </Form>{" "}
        <Form method="post" className="inline-block" replace>
          <input type="hidden" name="bucket" value="a" />
          <button
            type="submit"
            className={cn("btn", bucket === "a" && "btn-active")}
          >
            Bucket A
          </button>
        </Form>{" "}
        <Form method="post" className="inline-block" replace>
          <input type="hidden" name="bucket" value="b" />
          <button
            type="submit"
            className={cn("btn", bucket === "b" && "btn-active")}
          >
            Bucket B
          </button>
        </Form>
      </div>

      <img
        alt={`${bucket || "default"} bucket image`}
        height={934}
        width={700}
        src={(() => {
          switch (bucket) {
            case "a":
              return aImage;
            case "b":
              return bImage;
            default:
              return defaultImage;
          }
        })()}
      />
    </main>
  );
}
