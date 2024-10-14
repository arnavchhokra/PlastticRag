# Use the official Node.js 18 image as the base image
FROM node:18-alpine AS base

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Production image
FROM node:18-alpine AS production

WORKDIR /app

# Copy the built application from the base stage
COPY --from=base /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]
