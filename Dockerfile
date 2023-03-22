# Use the official Node.js LTS image as the base image
FROM node:lts

# Set the working directory
WORKDIR /app

# Install required utilities (tar, rsync, cron, and SQLite)
RUN apt-get update && \
    apt-get install -y tar rsync cron sqlite3 nano && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the Node.js dependencies
RUN npm ci

# Copy the application source code to the working directory
COPY . .

# Create a volume for the SQLite database
VOLUME /data

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
