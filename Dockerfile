# Build the frontend
FROM node:lts

# Back-end
WORKDIR /app
COPY . .
RUN npm install

# Front-end
WORKDIR /app/frontend
RUN npm install
RUN npm run build

WORKDIR /app
RUN chmod +x /app/backup.sh
RUN chmod +x /app/entrypoint.sh

VOLUME /data

EXPOSE 3000

CMD ["/app/entrypoint.sh"]

# FROM node:lts AS frontend-builder
# WORKDIR /app/frontend
# COPY . .
# # COPY frontend/src/package*.json ./
# RUN npm install
# # COPY frontend/src .
# RUN npm run build

# # Build the backend
# FROM node:lts AS backend-builder
# WORKDIR /app
# COPY . .
# # COPY package*.json ./
# RUN npm install
# COPY --from=frontend-builder /app/frontend/dist ./public
# # RUN npm run build

# # Create the final image

# WORKDIR /app
# COPY --from=backend-builder /app .
# COPY backup.sh /app/backup.sh
# COPY entrypoint.sh /app/entrypoint.sh
# RUN chmod +x /app/backup.sh
# RUN chmod +x /app/entrypoint.sh

# VOLUME /data

# EXPOSE 3000

# CMD ["/app/entrypoint.sh"]
