import { Link } from "remix";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  let { pathname } = useLocation();

  return (
    <div className="navbar shadow-lg bg-neutral text-neutral-content">
      {pathname !== "/" ? (
        <div className="flex-none">
          <Link
            prefetch="intent"
            to="/"
            className="btn btn-square btn-ghost"
            title="Go home"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current text-success"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </Link>
        </div>
      ) : null}
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">Remix + Cloudflare = ❤️</span>
      </div>
    </div>
  );
}
