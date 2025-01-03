FROM node:latest
RUN npm install -g nodemon
WORKDIR /api

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
