/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import account from "./account.js"
import character from "./character.js"
import admin from "./admin.js"

export default {
  async fetch(request, env) {
    const db = env.DB;
    const url = new URL(request.url);
    let response;

    // Admin
    if (url.pathname.split(('/'))[1] === "admin")
      response = await admin(request, env);

    // Maintenance
    // console.log("$$$$$ Response $$$$$");
    // console.log(response);
    // if (response) return response;
    // else return new Response(
    //   "Maintenance"
    // );

    // Account
    if (url.pathname.split(('/'))[1] === "account")
      response = await account(request, env);

    // Character
    if (url.pathname.split(('/'))[1] === "character")
      response = await character(request, env);

    // Response
    console.log("$$$$$ Response $$$$$");
    console.log(response);
    if (response) return response;
    else return new Response(null, { status: 404 })
  }
};
