# Development stage
FROM node:slim AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# Production build stage
FROM node:slim AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:slim AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]