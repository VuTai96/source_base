npm install -g express-generator
npx express --view=pug myapp
cd myapp
npm run start
---- Để chạy với chế độ debug (log console)---
$env:DEBUG="myapp:server"; node bin/www
