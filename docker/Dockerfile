#### run command:
####    docker run --name trustoracle-web -d -p 5000:5000 fiscoorg/trustoracle-web:latest


FROM nginx:stable-alpine as prod

# copy server config file for nginx
COPY trustoracle-web.conf /etc/nginx/conf.d/default.conf

# copy files of dist into html directory
COPY index.html /usr/share/nginx/html
COPY static /usr/share/nginx/html/static

# expose port
EXPOSE 5000

# set evn for nodejs
ENV NODE_ENV "production"

