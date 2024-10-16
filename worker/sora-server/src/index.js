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
import { selectAccountByMail, signUp, signIn } from "./account.js"
import { selectCharacterByAccount, /*selectCharacterById,*/ selectCharacterByName, createCharacter/*, deleteCharacter*/ } from "./character.js"

export default {
  async fetch(request, env) {
    const db = env.DB;
    const url = new URL(request.url);

    // Sign up
    if (url.pathname === "/api/signup") {
      // Get mail and pass param
      const mail = url.searchParams.get("mail");
      const pass = url.searchParams.get("pass");

      // Check param
      if (!mail || !pass) {
        return new Response(null, {
          status: 406,
        });
      };

      // Check conflict
      const conflict = await selectAccountByMail(mail, db);
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

      // Create account and get ID
      const guid = await signUp(mail, pass, db);
      console.log("guid:", guid.results);
      if (guid.error === "Invaild MAIL format") {
        return new Response(guid.error, {
          status: 406,
        });
      }
      else if (guid.error === "Invaild PASS format") {
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
    };

    // Sign in
    if (url.pathname === "/api/signin") {
      // Get mail and pass param
      const mail = url.searchParams.get("mail");
      const pass = url.searchParams.get("pass");

      // Check param
      if (!mail || !pass) {
        return new Response(null, {
          status: 406,
        });
      };

      // Get ID
      const guid = await signIn(mail, pass, db);
      if (guid.error === "Incorrect PASS") {
        return new Response(guid.error, {
          status: 401,
        });
      }
      else if (guid.error === "Incorrect MAIL") {
        return new Response(guid.error, {
          status: 401,
        });
      }
      else if (guid.error) {
        return new Response(guid.error, {
          status: 500,
        });
      };
      return new Response(guid.results, {
        status: 200,
        // headers: { 'Content-Type': 'application/json' }
      });
    }

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
      const characters = await selectCharacterByAccount(account, db);
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
      const conflict = await selectCharacterByName(name, db);
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
      const list = await selectCharacterByAccount(account, db);
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
      const guid = await createCharacter(name, account, db);
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

    // default response
    return new Response(
      hello()
    );
  },
};
