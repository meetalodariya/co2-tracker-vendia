FROM node:18-alpine

WORKDIR /usr

COPY package.json ./

COPY tsconfig.json ./

COPY src ./src

RUN ls -a

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm","run","dev"]
