// Screen-time reward Worker (Cloudflare Workers).
//
// On POST, runs `INCRBY screentime_balance 5` on your Upstash Redis and returns
// the new balance as { "balance": <n>, "added": 5 }.
//
// The Upstash token lives ONLY here, as a Worker secret. It never reaches the
// browser or the public PWA repo. Do NOT hardcode the URL/token in this file.
//
// Deploy:
//   npm i -g wrangler                              # if you don't have it
//   cd cloudflare-worker
//   wrangler secret put UPSTASH_REDIS_REST_URL     # paste your Upstash REST URL
//   wrangler secret put UPSTASH_REDIS_REST_TOKEN   # paste your Upstash REST token
//   wrangler deploy
// Then copy the printed https://<name>.<you>.workers.dev URL into
// REWARD_ENDPOINT in ../index.html.

const ALLOWED_ORIGIN = "https://xiayan0118.github.io"; // lock to your PWA origin
const KEY = "screentime_balance";
const AMOUNT = 5;

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: "method not allowed" }, 405, cors);

    // Relative INCRBY: can only add to the running total — never overwrites it.
    const r = await fetch(`${env.UPSTASH_REDIS_REST_URL}/incrby/${KEY}/${AMOUNT}`, {
      headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}` },
    });
    if (!r.ok) return json({ error: "upstash error", status: r.status }, 502, cors);

    const data = await r.json(); // { result: <new balance> }
    return json({ balance: data.result, added: AMOUNT }, 200, cors);
  },
};

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
