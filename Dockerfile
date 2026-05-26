# ===============================
# 1️⃣ Build Stage
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ===============================
# 2️⃣ Production Stage (Nginx)
# ===============================
FROM nginx:stable-alpine

# Borrar config default
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copiar config personalizada
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copiar build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar template env
COPY env.template.js /usr/share/nginx/html/env.template.js

# Copiar entrypoint y limpiar saltos de línea Windows
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh && \
    sed -i 's/\r$//' /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]
