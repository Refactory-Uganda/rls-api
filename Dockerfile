# Stage 1: Build the application
FROM node:20.14.0 

WORKDIR /rls-api

# Set environment variable for port
ENV PORT=3000

# Copy package files
COPY package*.json ./

# Copy the rest of the application code, including the src/mail/templates directory
COPY . .

# Copy Prisma schema and config files
COPY prisma ./prisma/
COPY tsconfig*.json ./

# Install dependencies with legacy peer deps to handle conflicts
RUN npm install -g npm@10.8.3 && \
    npm install --legacy-peer-deps

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the port from environment variable
EXPOSE ${PORT}

RUN npm -v && which npm

# Start the application
CMD ["npm", "run", "start:prod"]