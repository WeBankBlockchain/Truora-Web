#### run command:
####    docker run --name truora-web -d -p 5020:5020 fiscoorg/truora-web:latest


FROM nginx:stable-alpine as prod

# copy server config file for nginx
COPY truora-web.conf /etc/nginx/conf.d/default.conf

# copy files of dist into html directory
COPY index.html /usr/share/nginx/html
COPY static /usr/share/nginx/html/static

# expose port
EXPOSE 5020

# set evn for nodejs
ENV NODE_ENV "production"

