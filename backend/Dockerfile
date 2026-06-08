# Use a slim Node.js image
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
# Use ci for reproducible builds, only installing production dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose the port the app runs on (matching typical Express setup)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]