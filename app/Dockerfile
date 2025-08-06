# Setup the multistage process in the dockerfile for building and production, where production uses a smaller image size.

# Build Stage for Node.js
FROM node:20-alpine AS builder
# -- set the working directory then copy over dependencies.
WORKDIR /app
COPY package*.json tsconfig.json ./
# -- Install the dependencies using "clean install"
RUN npm ci
# -- Copy src from host machine to current working directory inside of Docker image set by WORKDIR
COPY . .
# -- Build the dang thing in
RUN npx tsc --build --clean
RUN npx tsc


# Production Stage
FROM node:20-alpine AS prod
WORKDIR /app
# -- copy over dependencies AND built dist/ from Build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist/ ./dist/
# -- Clean install dependencies using Docker images intended for production environments
RUN npm ci --omit=dev
# -- Setup environment and submit job (execute server.js as user node)
CMD ["node", "dist/server.js"]