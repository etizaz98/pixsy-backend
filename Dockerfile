########################################################################
# Dockerfile for DECK API
########################################################################

# pull base image
FROM node:12-alpine

# maintainer details
LABEL author="etizaz"
LABEL company="prixsy"

LABEL majorVersion="1"
LABEL name='backend'




# setup application directory
RUN mkdir /app
WORKDIR /app


ADD ./package.json /app

# install pacakges and global packages
RUN npm install
RUN npm prune

# copy application run files and test for standard
ADD ./src /app/src
ADD ./tsconfig.json /app

# build solution
RUN npm run build


COPY ./src/public ./build/public

# setup environment variables

ENV PORT 80


# expose microservice on selected port. Defaults to 3008
EXPOSE ${PORT}

# run microservice
ENTRYPOINT [ "node" , "./build/bin/server.js"]
CMD ["/bin/bash"]