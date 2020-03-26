FROM node:10.16.3
WORKDIR /app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent

COPY . .

EXPOSE 4001

RUN npm install -g nodemon

RUN npm run build

CMD npm run production:server