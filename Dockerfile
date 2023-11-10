# Use a specific version of node to avoid any unexpected changes with 'latest'
FROM node:18.8-alpine as base

# Install pnpm
RUN npm install -g pnpm

FROM base as builder

WORKDIR /home/node/app

# Copying package files
COPY package*.json pnpm-lock.yaml ./

# Install dependencies and build the project
RUN pnpm install
COPY . .
RUN pnpm run build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /home/node/app

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install production dependencies
RUN pnpm install --prod
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 8000

CMD ["node", "dist/server.js"]
