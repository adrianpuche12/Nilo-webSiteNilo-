FROM nginx:alpine

# Crear directorio para archivos web
RUN mkdir -p /usr/share/nginx/html

# Crear una página HTML simple para verificar que todo funciona
RUN echo '<html><head><title>WebSiteNilo</title></head><body><h1>WebSiteNilo</h1><p>Esta es una página de prueba para el proyecto Expo.</p></body></html>' > /usr/share/nginx/html/index.html

# Configurar Nginx para SPA
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]