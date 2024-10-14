# Base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Port on which the backend server runs
EXPOSE 8000

# Serve the application
CMD ["npm", "start"]


