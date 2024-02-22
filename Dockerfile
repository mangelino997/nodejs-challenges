FROM node:18-alpine3.16 as builder
WORKDIR /app

FROM builder AS build
COPY package*.json yarn.lock /app/
RUN npm install
COPY tsconfig*.json /app/
COPY src /app/src
RUN npm run prebuild
RUN npm run build

# Modo de producción
# FROM builder  as production
# ENV NODE_ENV=container
# WORKDIR /app
# COPY --from=build /app/node_modules /app/node_modules
# COPY --from=build /app/dist /app
# COPY package.json yarn.lock /app/
# EXPOSE $PORT 
# CMD ["node", "main.js"]

# Modo de desarrollo
FROM builder as dev
ENV NODE_ENV=container
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app
COPY package.json yarn.lock /app/
EXPOSE $PORT
CMD ["npm", "run", "start"]