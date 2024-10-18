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
import account from "./account.js"
import * as character from "./character.js"
import * as admin from "./admin.js"
import test from "./test.js"

export default {
  async fetch(request, env) {
    /***************/
    /* Maintenance */
    /***************/
    // return new Response(
    //   "Maintenance"
    // );
    
    
    const db = env.DB;
    const url = new URL(request.url);
    let response;

    console.log("api: ", url.pathname.split(('/'))[1]);

    /*******************/
    /* Account feature */
    /*******************/
    if (url.pathname.split(('/'))[1] === "account")
      response = await account(request, env);

    /*********************/
    /* Character feature */
    /*********************/
    // List characters in account
    if (url.pathname === "/api/listCharacter") {
      // Get account id param
      const account = url.searchParams.get("account");

      // Check param
      if (!account) {
        return new Response(null, {
          status: 406,
        });
      };

      // Get characters
      const characters = await character.selectByAccount(account, db);
      if (characters.error) {
        return new Response(characters.error, {
          status: 500,
        });
      };
      return new Response(JSON.stringify(characters.results), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create character
    if (url.pathname === "/api/createCharacter") {
      // Get account id param
      const name = url.searchParams.get("name");
      const account = url.searchParams.get("account");

      // Check param
      if (!account || !name) {
        return new Response(null, {
          status: 406,
        });
      };

      // Check conflict
      const conflict = await character.selectByName(name, db);
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
      const list = await character.selectByAccount(account, db);
      console.log("list:", list);
      if (list.error) {
        return new Response(list.error, {
          status: 500,
        });
      };
      if (list.results.length != 0) {
        return new Response(null, {
          status: 409,
        });
      };

      // Create characters
      const guid = await character.create(name, account, db);
      console.log("guid:", guid.results);
      if (guid.error === "Invaild NAME format") {
        return new Response(guid.error, {
          status: 406,
        });
      }
      else if (guid.error) {
        return new Response(guid.error, {
          status: 500,
        });
      };
      return new Response(guid.results, {
        status: 201,
        // headers: { 'Content-Type': 'application/json' }
      });
    }

    /*****************/
    /* Admin feature */
    /*****************/
    // Create enemy (admin)
    if (url.pathname === "/admin/createEnemy") {
      const enemy = await admin.createEnemy(db);
      console.log("enemy:", enemy.results);
      if (enemy.error) {
        return new Response(enemy.error, {
          status: 500,
        });
      };
      return new Response(JSON.stringify(enemy.results), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update enemy (admin)
    if (url.pathname === "/admin/updateEnemy") {
      const enemy = await admin.updateEnemy(db);
      console.log("enemy:", enemy.results);
      if (enemy.error) {
        return new Response(enemy.error, {
          status: 500,
        });
      };
      return new Response(JSON.stringify(enemy.results), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    /************/
    /* Response */
    /************/
    return response;
  }
};
