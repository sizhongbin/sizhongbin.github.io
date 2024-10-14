/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { hello } from "./hello.js"
import { selectByMail, signUp } from "./account.js"

export default {
  async fetch(request, env) {
    const db = env.DB;
    const url = new URL(request.url);

    // Sign up
    if (url.pathname === "/api/signup") {
      // Get mail and pass param
      const mail = url.searchParams.get("mail");
      const pass = url.searchParams.get("pass");

      // Check conflict
      const conflict = await selectByMail(mail, db);
      console.log("conflict:", conflict);
      if (conflict.error) {
        return new Response(conflict.error, {
          status: 500,
        });
      };
      if (conflict.results.length != 0) {
        return new Response(null, {
          status: 409,
        });
      };

      // Sign up
      const guid = await signUp(mail, pass, db);
      console.log("guid:", guid.results);
      if (guid.error) {
        return new Response(guid.error, {
          status: 500,
        });
      };
      return new Response(guid.results, {
        status: 201,
        // headers: { 'Content-Type': 'application/json' }
      });
    };

    // Sign in
    if (url.pathname === "/api/signup") {

    }

    // default response
    return new Response(
      hello()
    );
  },
};
