import type { MetaFunction } from "remix";
import { Link } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Cloudflare Demo",
    description: "A demo of Remix running on Cloudflare workers.",
  };
};

export default function Index() {
  return (
    <main>
      <section className="hero py-24 bg-base-200">
        <div className="block hero-content lg:flex-row">
          <div>
            <h1 className="mb-5 text-5xl font-bold">Remix on Cloudflare</h1>
            <p className="mb-5">
              Cloudflare + Remix gives you the ability to build fully dynamic
              sites that run on the edge without the drawbacks of static
              generation!
            </p>
            <a
              className="btn btn-primary"
              href="https://github.com/jacob-ebey/remix-cloudflare-demo"
            >
              View Source
            </a>
          </div>
        </div>
      </section>

      <section className="container my-12 mx-auto px-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Link
            prefetch="intent"
            to="themes"
            className="card lg:card-side bordered hover:border-primary-focus"
          >
            <div className="card-body">
              <h2 className="card-title">Multiple Themes</h2>
              <p>User selectable themes with zero flicker on page load.</p>
            </div>
          </Link>
          <Link
            prefetch="intent"
            to="ab-testing"
            className="card lg:card-side bordered hover:border-primary-focus"
          >
            <div className="card-body">
              <h2 className="card-title">Simple A/B Test</h2>
              <p>Run simple A/B tests based on randomly assigned cookies.</p>
            </div>
          </Link>
          <Link
            prefetch="intent"
            to="redirects"
            className="card lg:card-side bordered hover:border-primary-focus"
          >
            <div className="card-body">
              <h2 className="card-title">Edge Redirects</h2>
              <p>A resource route that performs redirects at the edge.</p>
            </div>
          </Link>
          <Link
            prefetch="intent"
            to="geolocation"
            className="card lg:card-side bordered hover:border-primary-focus"
          >
            <div className="card-body">
              <h2 className="card-title">Geolocation</h2>
              <p>
                Access the users location through Cloudflare request properties.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
