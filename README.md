# mfghomenumbercounter
helping a friend bring her county into the 21st century


How to run in docker

`docker build -t my-nodejs-app .`

then

`docker run -p 3000:3000 -v /path/to/your/numbersJsonFileYouAreUsing:/usr/src/app/data -d my-nodejs-app` (you can change my-nodejs-app to whatever you want)

If you are too cool for docker, you can run it this way

node server.js

And it will be available on the port listed in server.js

