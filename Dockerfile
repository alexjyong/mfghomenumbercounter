# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the server code into the working directory
COPY . .

# Make port 3000 available outside of the container
EXPOSE 3000

# Run the application when the container launches
CMD [ "node", "server.js" ]

