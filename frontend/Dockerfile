# Build the Vite app
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Serve the static files using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80