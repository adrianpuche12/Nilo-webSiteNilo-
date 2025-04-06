# Etapa de construcción
FROM node:18 AS build

WORKDIR /app

# Instalar dependencias globales
RUN npm install -g expo-cli

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación web
RUN npm run web:build

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración personalizada de Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /app/web-build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Nginx se inicia automáticamente