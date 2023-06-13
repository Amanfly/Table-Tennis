FROM node:11 as base

RUN npm install -g serve

WORKDIR /src

#by default, serve command runs the react application at port 5000
# EXPOSE 5000:5000
#
# CMD serve -s build;

# add `/app/node_modules/.bin` to $PATH
ENV PATH /src/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
# COPY package-lock.json ./
# RUN npm cache clean --force
RUN npm install
RUN npm install react-scripts -g
# RUN npm install node-sass

# add app
COPY . ./

# start app
CMD ["npm", "start"]