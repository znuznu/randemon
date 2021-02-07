FROM node:14.15.4-slim
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY ./ ./
CMD ["npm", "start"]