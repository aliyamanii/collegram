FROM hub.hamdocker.ir/library/node:18-alpine
EXPOSE 3000
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
COPY tsconfig.json .
CMD ["npm", "run", "build"]

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]