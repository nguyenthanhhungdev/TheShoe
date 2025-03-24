FROM node:lts-alpine
WORKDIR /app
ENV NODE_ENV=development

# Copy package files and install dependencies leveraging Docker cache
COPY package.json package-lock.json* ./
RUN npm install --silent

# Copy app source
COPY . .

EXPOSE 9030

# Run as non-root user for better security
RUN chown -R node /app
USER node

# Run development server with hot-reloading
CMD ["npm", "run", "dev"]