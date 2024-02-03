FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 5173

CMD ["npm","run","dev"]
