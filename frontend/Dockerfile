FROM node:14

# WORKDIR in docker container
WORKDIR /stockwatch/frontend

# Docker uses caching so install all the dependencies first
COPY package*.json .
RUN npm install

# Source code changes much more often so easier to rebuild the image when you structure like this
# copy react app to the container
COPY . .

EXPOSE 3000

CMD ["npm", "start"]