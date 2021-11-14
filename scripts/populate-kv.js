let { Miniflare } = require("miniflare");

async function run() {
  let miniflare = new Miniflare({
    kvNamespaces: ["REDIRECTS"],
    kvPersist: true,
  });

  let REDIRECTS = await miniflare.getKVNamespace("REDIRECTS");

  for (let i = 1; i <= 10000; i++) {
    await REDIRECTS.put(`/redirects/${i}`, `redirects/post/${i}`);
  }
}

run()
  .then(() => {
    console.log("Populated KV Store");
    process.exit(1);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
