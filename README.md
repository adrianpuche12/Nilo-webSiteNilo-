# Dockerización del Proyecto Expo - webSiteNilo

Este documento explica cómo ejecutar el proyecto webSiteNilo utilizando Docker, tanto en modo desarrollo como en producción.

## Pre-requisitos

- [Docker](https://www.docker.com/products/docker-desktop) instalado en tu sistema
- [Docker Compose](https://docs.docker.com/compose/install/) instalado en tu sistema

## Estructura de archivos

Asegúrate de tener los siguientes archivos en la raíz de tu proyecto:

- `Dockerfile` (para producción)
- `Dockerfile.dev` (para desarrollo)
- `.dockerignore`
- `docker-compose.yml`
- `nginx/default.conf` (configuración de Nginx)

## Instrucciones para ejecutar el proyecto

### Modo Desarrollo

Este modo permite trabajar con hot-reloading y todas las herramientas de desarrollo de Expo.

#### 1. Construir la imagen de Docker para desarrollo

```bash
cd webSiteNilo
docker-compose build expo-dev
```

#### 2. Iniciar el contenedor de desarrollo

```bash
docker-compose up expo-dev
```

Para ejecutar en segundo plano:

```bash
docker-compose up -d expo-dev
```

#### 3. Acceder a la aplicación en desarrollo

- Versión Web: Abre tu navegador y ve a `http://localhost:3000`
- Metro Bundler: Abre tu navegador y ve a `http://localhost:19002`

### Modo Producción

Este modo construye la aplicación web y la sirve a través de Nginx, solucionando el problema de "not found" al refrescar las páginas.

#### 1. Construir la imagen de Docker para producción

```bash
cd webSiteNilo
docker-compose build expo-prod
```

#### 2. Iniciar el contenedor de producción

```bash
docker-compose up expo-prod
```

Para ejecutar en segundo plano:

```bash
docker-compose up -d expo-prod
```

#### 3. Acceder a la aplicación en producción

- Abre tu navegador y ve a `http://localhost`

#### 4. Detener los contenedores

```bash
docker-compose down
```

## Solución al problema de "Not Found" al refrescar páginas

La configuración de Nginx incluida en este proyecto resuelve el problema común de las aplicaciones SPA, donde refrescar una página que no sea la raíz puede devolver un error 404. Con nuestra configuración, todas las rutas son redirigidas a index.html, permitiendo que React Router (o el sistema de enrutamiento que estés usando) maneje la navegación correctamente.

## Solución de problemas comunes

### Problemas de permisos

Si encuentras problemas de permisos al ejecutar la aplicación dentro del contenedor, puedes ejecutar:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Construcción de la aplicación web falla

Si el comando `web:build` falla, verifica que tu package.json tenga el script correspondiente. Si no lo tiene, puedes añadirlo:

```json
"scripts": {
  "web:build": "expo export:web"
}
```

### Acceso a la aplicación desde dispositivos externos

Para acceder a la aplicación desde dispositivos físicos o emuladores en modo desarrollo, asegúrate de que la aplicación esté escuchando en `0.0.0.0` en lugar de `localhost`.

## Notas adicionales

- En modo desarrollo, los cambios que realices en tu código se reflejarán automáticamente gracias al volumen montado.
- La configuración de producción está optimizada para servir una aplicación estática con rutas SPA correctamente configuradas.
- Si necesitas variables de entorno diferentes para desarrollo y producción, puedes añadirlas en el archivo docker-compose.yml.