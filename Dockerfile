# Base Image
FROM node:lts-alpine

# Set Working Directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy all other source code to work directory
COPY . .

# Build the application for production
RUN npm run build

# Expose port to the Docker host
EXPOSE 3000

# Run the server
CMD [ "npm", "run", "start" ]