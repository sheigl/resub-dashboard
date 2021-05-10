ARG ARCH=amd64
ARG NODE_VERSION=10
ARG OS=alpine

FROM ${ARCH}/node:${NODE_VERSION}-${OS} AS base

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN git config --global user.email "sheigl@gmail.com" && \
  git config --global user.name "Steven Heigl"

RUN npm install -g @angular/cli

WORKDIR /src

RUN git clone https://github.com/sheigl/resub-dashboard.git

WORKDIR /src/resub-dashboard

RUN npm install && \
    ng build --prod

FROM nginx

COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=base /src/resub-dashboard/dist/resub-dashboard /usr/share/nginx/html