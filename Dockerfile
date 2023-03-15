# 使用官方的 Node.js 14 镜像作为基础镜像
FROM node:14

# 在容器内创建一个工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到容器内的工作目录
COPY package*.json ./

# 安装依赖，这会使用容器内的 Node.js 和 npm 版本
RUN npm install

# 将整个项目代码复制到容器内的工作目录
COPY . .

# 将端口暴露出来
EXPOSE 5000

# 容器启动时运行的命令
CMD [ "npm", "run" ]