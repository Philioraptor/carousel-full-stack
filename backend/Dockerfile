# Use a lightweight Node.js runtime image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency definitions and install them first (optimizes Docker layer caching)
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application source files
COPY . .

# Expose the designated port
EXPOSE 3000

# Execute the application start command
CMD ["node", "server.js"]