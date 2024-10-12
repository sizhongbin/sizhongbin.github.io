npm config set registry https://registry.npmmirror.com/  
npm install wrangler --save-dev 
npx wrangler login 
npx wrangler generate sora-server
npx wrangler dev src/index.js
npx wrangler publish src/index.js --name sora-server  
npx wrangler d1 execute sora-data --local --file=./schema.sql
npx wrangler d1 execute sora-data --local --command="SELECT * FROM Enemy"