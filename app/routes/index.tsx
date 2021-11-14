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
          </div>
        </div>
      </section>

      <section className="container my-12 mx-auto px-4">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <Link
              to="ab-testing"
              className="card lg:card-side bordered hover:border-primary-focus"
            >
              <div className="card-body">
                <h2 className="card-title">Simple A/B Test</h2>
                <p>Run simple A/B tests based on randomly assigned cookies.</p>
              </div>
            </Link>
          </div>
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <Link
              to="redirects"
              className="card lg:card-side bordered hover:border-primary-focus"
            >
              <div className="card-body">
                <h2 className="card-title">Edge Redirects</h2>
                <p>A resource route that performs redirects at the edge.</p>
              </div>
            </Link>
          </div>
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <Link
              to="geolocation"
              className="card lg:card-side bordered hover:border-primary-focus"
            >
              <div className="card-body">
                <h2 className="card-title">Geolocation</h2>
                <p>
                  Access the users location through Cloudflare request
                  properties.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
