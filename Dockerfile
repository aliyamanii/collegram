FROM hub.hamdocker.ir/library/node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
COPY tsconfig.json .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]