FROM node:16-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:16-alpine as serve
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build /app
EXPOSE 3000
CMD ["serve", "-s", "app"]
