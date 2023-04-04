# Build the frontend
FROM --platform=linux/amd64 node:lts

# Install required utilities
RUN apt-get update && \
    apt-get install -y tar rsync cron sqlite3 nano bc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

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