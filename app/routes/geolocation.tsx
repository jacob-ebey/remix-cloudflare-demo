import type { LoaderFunction, MetaFunction } from "remix";
import { json, useLoaderData } from "remix";

import countries from "../lib/countries.json";

export let meta: MetaFunction = () => {
  return {
    title: "Geolocation | Remix Cloudflare Demo",
    description: "Demo utilizing geolocation data on Cloudflare.",
  };
};

export let loader: LoaderFunction = ({ request }) => {
  let cf = (request as any).cf as IncomingRequestCfProperties;

  let country = countries.find((c) => c.cca2 === cf.country);

  let formattedLocation = "";
  if (cf.city) formattedLocation += cf.city + ", ";
  if (cf.region) formattedLocation += cf.region + ", ";
  formattedLocation += cf.country;

  return json({
    formattedLocation,
    country,
  });
};

export default function Geolocation() {
  let { formattedLocation, country } = useLoaderData();

  return (
    <main className="container mx-auto prose px-4 py-8">
      <h1>Geolocation</h1>

      <p>
        Show localized content based on information avaliable in the{" "}
        <code>Request.cf</code> object.
      </p>

      <p>
        Location: {formattedLocation} {country.flag}
      </p>

      <p>Currencies</p>
      <ul>
        {Object.entries(country.currencies).map(([abbr, currency]: any) => (
          <li key={abbr} data-testid="currency">
            {abbr}: {currency.name} ({currency.symbol})
          </li>
        ))}
      </ul>
      <p>Languages</p>
      <ul>
        {Object.values(country.languages).map((name: any) => (
          <li key={name} data-testid="language">
            {name}
          </li>
        ))}
      </ul>
    </main>
  );
}
