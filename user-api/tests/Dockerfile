FROM node:10.16.0-stretch as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
