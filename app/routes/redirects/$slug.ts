import type { LoaderFunction, MetaFunction } from "remix";
import { redirect } from "remix";

declare global {
  const REDIRECTS: KVNamespace;
}

export let meta: MetaFunction = ({ params }) => {
  return {
    title: `Post ${params.slug} | Remix Cloudflare Demo`,
    description: "Demo Cloudflare KV store to do redirects at the edge.",
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  let start = Date.now();
  let url = new URL(request.url);

  let redirectPath = await REDIRECTS.get(url.pathname);
  redirectPath = redirectPath || `/redirects?err=${url.pathname} not found`;

  return redirect(`${redirectPath}?l=${Date.now() - start}`);
};
