# Use a slim Node.js image
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Pass build arguments (e.g., API URL) to Vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the app for production
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start Vite preview server
CMD ["npm", "run", "preview"]