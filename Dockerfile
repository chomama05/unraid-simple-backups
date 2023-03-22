# Build the frontend
FROM node:lts AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .
RUN npm run build

# Build the backend
FROM node:lts AS backend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
COPY --from=frontend-builder /app/dist ./public
RUN npm run build

# Create the final image
FROM node:lts
WORKDIR /app
COPY --from=backend-builder /app .
COPY backup.sh /data/backup.sh
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /data/backup.sh
RUN chmod +x /app/entrypoint.sh

VOLUME /data

EXPOSE 3000

CMD ["/app/entrypoint.sh"]
