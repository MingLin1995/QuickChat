FROM node:20.8.1 AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# 建立靜態文件
RUN npm run build

# 生產階段，使用 nginx 映像
FROM nginx:stable-alpine as production-stage

# 從構建階段複製構建好的文件到 nginx 服務目錄
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
